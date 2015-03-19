package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.CustomerOrderHasItemDAOController;
import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.entity.CustomerOrderHasItemPK;
import org.egreen.opensms.server.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */

@Service
public class CustomerOrderHasItemDAOService {

    @Autowired
    private CustomerOrderHasItemDAOController customerOrderHasItemDAOController;

    @Autowired
    private ItemDAOService itemDAOService;

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
        CustomerOrderHasItemPK returnOrderId;
        Item itemByName = itemDAOService.searchItemByItemName(customerOrderHasItem.getItemName());

        if (itemByName != null) {
            Item item = itemDAOService.searchItemByItemId(customerOrderHasItem.getItemId());
            if (item.getQty().doubleValue() > customerOrderHasItem.getQuentity().doubleValue()) {
                double qty = item.getQty().doubleValue() - customerOrderHasItem.getQuentity().doubleValue();
                item.setQty(BigDecimal.valueOf(qty));
                itemDAOService.updateItem(item);
            } else {
                item.setQty(BigDecimal.ZERO);
                itemDAOService.updateItem(item);
            }
            customerOrderHasItem.setCustomerOrderHasItemId(customerOrderHasItemId);
            returnOrderId = customerOrderHasItemDAOController.create(customerOrderHasItem);
        }else{

            Item item = new Item();
            System.out.println("ItemName : "+customerOrderHasItem.getItemName());
            item.setName(customerOrderHasItem.getItemName());
            item.setBuyingPrice(customerOrderHasItem.getAmount());

            Long aLong = itemDAOService.saveItem(item);
            System.out.println("ITem Add : "+aLong);

            customerOrderHasItem.setCustomerOrderHasItemId(customerOrderHasItemId);
            returnOrderId = customerOrderHasItemDAOController.create(customerOrderHasItem);
        }

        return returnOrderId;
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
