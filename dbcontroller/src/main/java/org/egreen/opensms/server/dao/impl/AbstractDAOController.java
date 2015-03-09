package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.DAOController;
import org.egreen.opensms.server.entity.EntityInterface;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.io.Serializable;
import java.util.List;
import org.hibernate.collection.internal.AbstractPersistentCollection;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.type.Type;
import org.hibernate.validator.util.IdentitySet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

/**
 * Created by dewmal on 6/26/14.
 */
@Transactional
public class AbstractDAOController<T extends EntityInterface, I extends Serializable> implements DAOController<T, I> {

    protected final Class<T> entityType;
    protected final Class<I> idType;

    @Autowired
    private SessionFactory sessionFactory;

    public AbstractDAOController(Class<T> entityType, Class<I> idType) {
        this.entityType = entityType;
        this.idType = idType;
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }


    @Override
    public I create(T entity) {
        try {
            getSession().persist(entity);
           // System.out.println(entity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return (I) entity.getId();
    }

    @Override
    public I update(T entity) {
        //System.out.println("ABS:"+entity);
        getSession().update(entity);
        return (I) entity.getId();
    }

    @Override
    public int delete(T entity) {

        Session session = getSession();
        session.merge(entity);

        session.delete(entity);
        return 0;
    }

    @Override
    public T read(I id) {
     //  System.out.println("Abs : "+id);
      // System.out.println("Abs : "+(id instanceof  Long));
        return (T) getSession().get(entityType, (java.io.Serializable) id);
    }

    @Override
    public List<T> getAll(int offset, int limit, String order) {

        Criteria criteria = getSession().createCriteria(entityType);
        criteria.setFirstResult(offset);
        criteria.setMaxResults(limit);
        criteria.addOrder(Order.asc(order));


        return criteria.list();
    }

    @Override
    public List<T> getAllListById(Long id,String propertyName ) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.eq(propertyName,id));
        return  criteria.list();
    }

    @Override
    public Long getAllCount() {

        Criteria criteria = getSession().createCriteria(entityType);
        criteria.setProjection(Projections.rowCount());
        return (Long)criteria.uniqueResult();
    }

    @Override
    public List<T> getAll() {
        Criteria criteria = getSession().createCriteria(entityType);
        return criteria.list();
    }



    public void detach(Object entity) {

// Check for lazy-loading proxies
        if (entity instanceof HibernateProxy) {
            SessionImplementor sessionImplementor = ((HibernateProxy) entity)
                    .getHibernateLazyInitializer().getSession();
            if (sessionImplementor instanceof Session) {
                ((Session) sessionImplementor).evict(entity);
            }

            return;
        }

// processing queue
        Queue<Object> entities = new LinkedList<Object>();
        Set<Object> processedEntities = new IdentitySet();

        entities.add(entity);

        while ((entity = entities.poll()) != null) {

// Skip already processed entities
            if (processedEntities.contains(entity)) {
                continue;
            }

            ClassMetadata classMetadata = sessionFactory
                    .getAllClassMetadata().get(entity.getClass().getName());
            String[] propertyNames = classMetadata.getPropertyNames();
            Session session = null;

            // Iterate through all persistent properties
            for (String propertyName : propertyNames) {

                Object propertyValue = classMetadata.getPropertyValue(entity, propertyName);
                Type propertyType = classMetadata.getPropertyType(propertyName);

                // Handle entity types
                if (propertyType.isEntityType()) {

                    // Detach proxies
                    if (propertyValue instanceof HibernateProxy) {
                        SessionImplementor sessionImplementor = ((HibernateProxy) propertyValue)
                                .getHibernateLazyInitializer().getSession();

                        if (sessionImplementor instanceof Session) {
                            ((Session) sessionImplementor).evict(propertyValue);

                            // If we don't yet have a session for this entity save it for later use.
                            if (session == null)
                                session = (Session) sessionImplementor;
                        }

                    } else {
                        // Add entities to the processing queue.
                        entities.add(propertyValue);
                    }

                }
                // Handle collection types
                else if (propertyType.isCollectionType()) {

                    if (propertyValue instanceof AbstractPersistentCollection) {
                        SessionImplementor sessionImplementor =
                                ((AbstractPersistentCollection) propertyValue).getSession();

                        // If we don't yet have a session for this entity save it for later use.
                        if (sessionImplementor instanceof Session && session == null) {
                            session = (Session) sessionImplementor;
                        }
                    }
                }
            }

            // Evict the entity and associated collections.
            if (session != null) {
                session.evict(entity);
            }

            processedEntities.add(entity);
        }
    }
}
