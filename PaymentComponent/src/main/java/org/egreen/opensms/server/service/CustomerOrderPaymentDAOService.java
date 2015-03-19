package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.CustomerOrderDAOController;
import org.egreen.opensms.server.dao.CustomerOrderPaymentDAOController;
import org.egreen.opensms.server.entity.CustomerOrder;
import org.egreen.opensms.server.entity.CustomerOrderPayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Service
public class CustomerOrderPaymentDAOService {

    @Autowired
    private CustomerOrderPaymentDAOController customerOrderPaymentDAOController;

    @Autowired
    private CustomerOrderDAOController  customerOrderDAOController;


    /**
     * Add Customer Order Payment
     *
     * @param customerOrderPayment
     * @return
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     */
    public Long saveCustomerPayment(CustomerOrderPayment customerOrderPayment) {
        long paymentId = new Date().getTime();
        customerOrderPayment.setPaymentId(paymentId);

//        CustomerOrder customerOrder = customerOrderDAOController.read(customerOrderPayment.getCustomerOrderId());
//
//        double updateValue;
//        if (customerOrder.getAmount().doubleValue()>customerOrderPayment.getAmount().doubleValue()) {
//          updateValue = customerOrder.getAmount().doubleValue() - customerOrderPayment.getAmount().doubleValue();
//            customerOrder.setAmount(BigDecimal.valueOf(updateValue));
//            customerOrderDAOController.update(customerOrder);
//        }else{
//            customerOrder.setAmount(BigDecimal.ZERO);
//            customerOrderDAOController.update(customerOrder);
//        }

        return  customerOrderPaymentDAOController.create(customerOrderPayment);

    }

    /**
     * Search Customer Payments
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    public List<CustomerOrderPayment> getAllCustomerPayementsByOrderId(Long orderId) {
        return customerOrderPaymentDAOController.getAllCustomerPayementsByOrderId(orderId);
    }

    /**
     *
     * Search All Customer Payments Amount
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     *
     * @return
     */
    public BigDecimal searchAllCustomerPaymentsAmount() {
        return customerOrderPaymentDAOController.searchAllCustomerPaymentsAmount();

    }

    /**
     * Search CustomerOrder Payments By DateRange
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param firstDate
     * @param secondDate
     * @return
     */
    public List<CustomerOrderPayment> searchCustomerOrderPaymentsByDateRange(String firstDate, String secondDate) {
        return customerOrderPaymentDAOController.searchCustomerOrderPaymentsByDateRange(firstDate,secondDate);
    }
}
