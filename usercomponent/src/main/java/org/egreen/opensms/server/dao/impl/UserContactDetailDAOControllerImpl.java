package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.UserContactDetailsDAOController;

import org.egreen.opensms.server.entity.UserContactDetail;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dewmal on 7/17/14.
 */
@Repository
public class UserContactDetailDAOControllerImpl extends AbstractDAOController<UserContactDetail, Long> implements UserContactDetailsDAOController {

    public UserContactDetailDAOControllerImpl() {
        super(UserContactDetail.class, Long.class);
    }


    @Override
    public List<UserContactDetail> findUsers(String searchQuery) {
        System.out.println(searchQuery);
        Criteria criteria = getSession().createCriteria(entityType);
        Disjunction or = Restrictions.disjunction();
        or.add(Restrictions.like("name", searchQuery, MatchMode.ANYWHERE));
        or.add(Restrictions.like("province", searchQuery, MatchMode.ANYWHERE));
        or.add(Restrictions.like("addressLine1", searchQuery, MatchMode.ANYWHERE));
        or.add(Restrictions.like("addressLine2", searchQuery, MatchMode.ANYWHERE));
        or.add(Restrictions.like("country", searchQuery, MatchMode.ANYWHERE));
        or.add(Restrictions.like("email", searchQuery, MatchMode.ANYWHERE));
        criteria.add(or);
        return criteria.list();
    }

    public List<UserContactDetail> getUserByCity(String city){
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("city", city));
        System.out.println(criteria.list());
        return criteria.list();
    }

    @Override
    public List<UserContactDetail> getAllCustomerbyName(String custName) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("name",custName,MatchMode.ANYWHERE));
        return criteria.list();
    }

    @Override
    public List<UserContactDetail> search_all_sortByCustomerName() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.addOrder(Order.asc("firstName"));
        return criteria.list();
    }

    @Override
    public List<UserContactDetail> search_all_sortByCustomerOrderValue() {
        Session session=getSession();
        String hql = "SELECT u FROM UserContactDetail u, CustomerOrder cu group by user_id order by amount desc";
        return session.createQuery(hql).list();

    }

    @Override
    public List<UserContactDetail> testing_search_all() {
        Session session=getSession();
        String hql = "EXPLAIN SELECT u FROM UserContactDetail u";
        return session.createQuery(hql).list();
    }


}
