package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.CustomerOrder;

import org.egreen.opensms.server.service.CustomerOrderDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Controller
@RequestMapping("mintbooks/v1/customer_order")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderDAOService customerOrderDAOService;


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
    @RequestMapping(value = "save", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addCustomerOrder(@RequestBody CustomerOrder customerOrder) {
        Long res = customerOrderDAOService.saveCustomerOrder(customerOrder);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "updateAmountById", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMessage updateAmountById(@RequestParam("orderId")Long orderId,@RequestParam("amount")Double amount) {
       Long res = customerOrderDAOService.updateAmountById(orderId,amount);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

    /**
     * Total Customer Order Value
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "totalCustomerOrderValue", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage totalCustomerOrderValue() {
        BigDecimal res = customerOrderDAOService.totalCustomerOrderValue();
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

//    @RequestMapping(value = "searchAll", method = RequestMethod.GET)
//       @ResponseBody
//       public List<CustomerOrder> searchCustomerOrder() {
//        List<CustomerOrder> list = customerOrderDAOService.searchCustomerOrder();
//        return list;
//    }
//

    @RequestMapping(value = "searchAllTodayCustomerOrder", method = RequestMethod.GET)
    @ResponseBody
    public List<CustomerOrder> searchAllCustomerOrderByDate() {
        List<CustomerOrder> list = customerOrderDAOService.searchAllCustomerOrderByDate();
        return list;
    }

    @RequestMapping(value = "searchOrderHistoryByCustomerId", method = RequestMethod.GET)
    @ResponseBody
    public List<CustomerOrder> searchOrderHistoryByCustomerId(@RequestParam("customerId")Long customerId) {
        List<CustomerOrder> list = customerOrderDAOService.searchOrderHistoryByCustomerId(customerId);
        return list;
    }
//
//    @RequestMapping(value = "searchCustomerOrderLimitByCredit", method = RequestMethod.GET)
//    @ResponseBody
//    public List<CustomerOrder> searchCustomerOrderLimitByCredit() {
//        List<CustomerOrder> list = customerOrderDAOService.searchCustomerOrderLimitByCredit();
//        return list;
//    }
//
//    @RequestMapping(value = "searchAllByCustomerName", method = RequestMethod.GET)
//    @ResponseBody
//    public List<CustomerOrder> searchCustomerOrderByCustomerName(@RequestParam("customerName")String customerName) {
//        List<CustomerOrder> list = customerOrderDAOService.searchCustomerOrderByCustomerName(customerName);
//        return list;
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
    @RequestMapping(value = "searchCustomerOrderByDateRange", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCustomerOrderByDateRange(@RequestParam("firstDate")String firstDate,@RequestParam("secondDate")String secondDate) {
        List<CustomerOrder> res = customerOrderDAOService.searchCustomerOrderByDateRange(firstDate,secondDate);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

    /**
     * Get CustomerOrder Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public CustomerOrder ob() {
        return new CustomerOrder();
    }



}
