package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.CustomerOrderHasItemDAOController;
import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.entity.CustomerOrderHasItemPK;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
@Repository
public class CustomerOrderHasItemDAOControllerImpl extends AbstractDAOController<CustomerOrderHasItem,CustomerOrderHasItemPK> implements CustomerOrderHasItemDAOController {

    public CustomerOrderHasItemDAOControllerImpl() {
        super(CustomerOrderHasItem.class,CustomerOrderHasItemPK.class);
    }

    @Override
    public List<CustomerOrderHasItem> getAlOrderDetailsByOrderId(Long orderId) {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.eq("cusOrderId",orderId));
        return criteria.list();
    }

    @Override
    public Integer removeCustomerOrderHasItem(Long customerOrderHasItemId) {
        Session session=getSession();
        String hql = "delete from CustomerOrderHasItem where customerOrderHasItemId= :customerOrderHasItemId";
        int i = session.createQuery(hql).setLong("customerOrderHasItemId",customerOrderHasItemId).executeUpdate();
        return i;
    }
}
