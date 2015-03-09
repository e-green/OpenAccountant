package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.CustomerOrderHasItemDAOController;
import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.entity.CustomerOrderHasItemPK;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */

@Service
public class CustomerOrderHasItemDAOService {

    @Autowired
    private CustomerOrderHasItemDAOController customerOrderHasItemDAOController;


    /**
     * Customer Order Has ItemSave
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param customerOrderHasItem
     * @return
     */
    public CustomerOrderHasItemPK saveCustomerOrderHasItem(CustomerOrderHasItem customerOrderHasItem) {
        long customerOrderHasItemId = new Date().getTime();
        customerOrderHasItem.setCustomerOrderHasItemId(customerOrderHasItemId);
        return customerOrderHasItemDAOController.create(customerOrderHasItem);
    }

    /**
     * Get All OrderDetails By OrderId
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    public List<CustomerOrderHasItem> getAlOrderDetailsByOrderId(Long orderId) {
        return customerOrderHasItemDAOController.getAlOrderDetailsByOrderId(orderId);
    }

    /**
     * Remove CustomerOrder Has Item
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    public Integer removeCustomerOrderHasItem(Long orderId) {
        return customerOrderHasItemDAOController.removeCustomerOrderHasItem(orderId);
    }
}
