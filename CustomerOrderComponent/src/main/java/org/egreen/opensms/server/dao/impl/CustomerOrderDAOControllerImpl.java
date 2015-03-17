package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.CustomerOrderDAOController;

import org.egreen.opensms.server.entity.CustomerOrder;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * Created by Pramoda Fernando on 8/26/2014.
 */

@Repository
public class CustomerOrderDAOControllerImpl extends AbstractDAOController<CustomerOrder,Long> implements CustomerOrderDAOController {
    public CustomerOrderDAOControllerImpl() {
        super(CustomerOrder.class,Long.class);
    }

    @Override
    public List<CustomerOrder> getCustomerOrderByDataRange(String firstDate, String secondDate) {
        Criteria criteria = getSession().createCriteria(entityType);
        SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd");
        //  System.out.println(firstDate);
        // System.out.println(secondDate);
        Date fDa = null;
        Date sDa = null;
        if(firstDate.equals("")&&secondDate.equals("")){
            Criteria criteria1 = getSession().createCriteria(entityType);
            // criteria1.add(Restrictions.eq("status",true));
            return  criteria1.list();
        }else {
            try {
                fDa = sm.parse(firstDate);
                sDa = sm.parse(secondDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            // criteria.add(Restrictions.eq("status",true));
            criteria.add(Restrictions.between("invoiceDate", fDa, sDa));
        }
        return criteria.list();
    }

    @Override
    public List<CustomerOrder> getAllCustomerOrder() {
        Criteria criteria = getSession().createCriteria(entityType);
        return criteria.list();
    }

    @Override
    public List<CustomerOrder> getCustomerOrdersByName(String customerName) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("customerName",customerName));
        return criteria.list();
    }

    @Override
    public List<CustomerOrder> orderLimitByCredit() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.gt("total",0));
        criteria.addOrder(Order.desc("total"));
        criteria.setMaxResults(10);
        return criteria.list();
    }

    @Override
    public List<CustomerOrder> searchAllCustomerOrderByDate() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.addOrder(Order.asc("invoiceDate"));
        criteria.setMaxResults(10);
        return criteria.list();
    }

    @Override
    public BigDecimal totalCustomerOrderValue() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.setProjection(Projections.sum("amount"));
        return (BigDecimal)criteria.uniqueResult();
    }
}
