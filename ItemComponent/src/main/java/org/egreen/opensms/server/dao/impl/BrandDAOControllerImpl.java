package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.BrandDAOController;
import org.egreen.opensms.server.entity.Brand;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
@Repository
public class BrandDAOControllerImpl extends  AbstractDAOController<Brand,Long>implements BrandDAOController {
    public BrandDAOControllerImpl() {
        super(Brand.class,Long.class);
    }

    @Override
    public List<Brand> getAllBrand() {
        Criteria criteria = getSession().createCriteria(entityType);
        return criteria.list();
    }

    @Override
    public List<Brand> findBrandByQuary(String type) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("type", type, MatchMode.ANYWHERE));
        return criteria.list();
    }

    @Override
    public Integer deleteBrand(Long brandId) {
        Session session=getSession();
        String hql = "delete from Brand where brandId= :brandId";
        int i = session.createQuery(hql).setLong("brandId",brandId).executeUpdate();
        return i;
    }
}
