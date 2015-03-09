package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.entity.CustomerOrderHasItemPK;

import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
public interface CustomerOrderHasItemDAOController extends DAOController<CustomerOrderHasItem,CustomerOrderHasItemPK>  {
    List<CustomerOrderHasItem> getAlOrderDetailsByOrderId(Long orderId);

    Integer removeCustomerOrderHasItem(Long orderId);
}
