package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.CustomerOrder;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Pramoda Fernando on 8/26/2014.
 */
public interface CustomerOrderDAOController extends DAOController<CustomerOrder,Long> {

    List<CustomerOrder> getCustomerOrderByDataRange(String firstDate, String secondDate);

    List<CustomerOrder> getAllCustomerOrder();

    List<CustomerOrder> getCustomerOrdersByName(String customerName);

    List<CustomerOrder> orderLimitByCredit();

    List<CustomerOrder> searchAllCustomerOrderByDate();

    BigDecimal totalCustomerOrderValue();

}
