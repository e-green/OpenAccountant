package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.CustomerOrderDAOController;
import org.egreen.opensms.server.entity.CustomerOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Service
public class CustomerOrderDAOService {

    @Autowired
    private CustomerOrderDAOController customerOrderDAOController;

    /**
     *
     * Save Customer Order
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param customerOrder
     * @return
     */
    public Long saveCustomerOrder(CustomerOrder customerOrder) {
        long cusOrderId = new Date().getTime();
        customerOrder.setCusOrderId(cusOrderId);
        customerOrderDAOController.create(customerOrder);
        return cusOrderId;
    }
//
//    public List<CustomerOrder> searchCustomerOrder() {
//        return customerOrderDAOController.getAllCustomerOrder();
//    }


    /**
     * Search Customer Order By DateRange
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param firstDate
     * @param secondDate
     * @return
     */
    public List<CustomerOrder> searchCustomerOrderByDateRange(String firstDate, String secondDate) {
        return customerOrderDAOController.getCustomerOrderByDataRange(firstDate, secondDate);
    }
//
//    public List<CustomerOrder> searchCustomerOrderByCustomerName(String customerName) {
//        return customerOrderDAOController.getCustomerOrdersByName(customerName);
//    }
//
//    public List<CustomerOrder> searchCustomerOrderLimitByCredit() {
//        return customerOrderDAOController.orderLimitByCredit();
//
//    }
//
    public List<CustomerOrder> searchAllCustomerOrderByDate() {
        return customerOrderDAOController.searchAllCustomerOrderByDate();
    }

    /**
     * Update Amount By Id
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @param amount
     * @return
     */
    public Long updateAmountById(Long orderId, Double amount) {
        CustomerOrder read = customerOrderDAOController.read(orderId);
        read.setAmount(BigDecimal.valueOf(amount));
        return customerOrderDAOController.update(read);
    }

//    public List<CustomerOrder> getCustomerOrdersByCustomerId(Long userId) {
//        return customerOrderDAOController.getAllListById(userId,"customerId");
//    }

    /**
     * Total Customer Order Value
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    public BigDecimal totalCustomerOrderValue() {
        return customerOrderDAOController.totalCustomerOrderValue();
    }

    public CustomerOrder readCustomerOrderByOrderId(Long customerOrderId) {
        return customerOrderDAOController.read(customerOrderId);

    }
}
