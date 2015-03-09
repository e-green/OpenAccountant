package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.CustomerOrderPaymentDAOController;
import org.egreen.opensms.server.entity.CustomerOrderPayment;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Repository
public class CustomerOrderPaymentDAOControllerImpl extends AbstractDAOController<CustomerOrderPayment,Long>implements CustomerOrderPaymentDAOController {


    public CustomerOrderPaymentDAOControllerImpl() {
        super(CustomerOrderPayment.class, Long.class);
    }

    @Override
    public List<CustomerOrderPayment> getAllCustomerPayementsByOrderId(Long orderId) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.eq("customerOrderId",orderId));
        return criteria.list();
    }

    @Override
    public BigDecimal searchAllCustomerPaymentsAmount() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.setProjection(Projections.sum("amount"));
        return (BigDecimal)criteria.uniqueResult();
    }

    @Override
    public List<CustomerOrderPayment> searchCustomerOrderPaymentsByDateRange(String firstDate, String secondDate) {
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
            criteria.add(Restrictions.between("date", fDa, sDa));
        }
        return criteria.list();
    }
}
