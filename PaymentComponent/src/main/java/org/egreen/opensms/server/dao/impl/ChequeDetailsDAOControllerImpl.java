package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.ChequeDetailsDAOController;
import org.egreen.opensms.server.entity.ChequeDetails;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by chethiya on 11/3/2014.
 */
@Repository
public class ChequeDetailsDAOControllerImpl extends AbstractDAOController<ChequeDetails,Integer>implements ChequeDetailsDAOController {
    public ChequeDetailsDAOControllerImpl() {
        super(ChequeDetails.class, Integer.class);
    }

    @Override
    public List<ChequeDetails> getAllGsrOrderDetails() {
        Criteria criteria  = getSession().createCriteria(entityType);
        criteria.add(Restrictions.like("type","GSR"));
        criteria.add(Restrictions.eq("aproveStatus",false));
        return criteria.list();
    }

    @Override
    public List<ChequeDetails> getChequeDetailsByOrderId(Long orderId) {
        Criteria criteria  = getSession().createCriteria(entityType);
        criteria.add(Restrictions.eq("orderId",orderId));
        return criteria.list();
    }
}
