package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.CustomerOrderPayment;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */
public interface CustomerOrderPaymentDAOController extends DAOController<CustomerOrderPayment,Long>  {
    List<CustomerOrderPayment> getAllCustomerPayementsByOrderId(Long orderId);

    BigDecimal searchAllCustomerPaymentsAmount();

    List<CustomerOrderPayment> searchCustomerOrderPaymentsByDateRange(String firstDate, String secondDate);
}
