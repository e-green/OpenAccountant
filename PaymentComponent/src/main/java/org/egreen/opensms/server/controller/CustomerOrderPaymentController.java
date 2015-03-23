package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.CustomerOrder;
import org.egreen.opensms.server.entity.CustomerOrderPayment;

import org.egreen.opensms.server.models.CustomerOrderModel;
import org.egreen.opensms.server.models.CustomerOrderPaymentDetailModel;
import org.egreen.opensms.server.service.CustomerOrderDAOService;
import org.egreen.opensms.server.service.CustomerOrderPaymentDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */


@Controller
@RequestMapping("mintbooks/v1/customer_payment")
public class CustomerOrderPaymentController {

    @Autowired
    private CustomerOrderPaymentDAOService customerPaymentDAOService;

    @Autowired
    private CustomerOrderDAOService customerOrderDAOService;


    /**
     * Add Customer Order Payment
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param customerOrderPayment
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addCustomerOrderPayment(@RequestBody CustomerOrderPayment customerOrderPayment){
        Long res = customerPaymentDAOService.saveCustomerPayment(customerOrderPayment);
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
     * Search Customer Payments
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    @RequestMapping(value = "searchCustomerPayments",method = RequestMethod.GET)
    @ResponseBody
    public List<CustomerOrderPayment> searchCustomerPayments(@RequestParam("orderId")Long orderId){
        List<CustomerOrderPayment> list = customerPaymentDAOService.getAllCustomerPayementsByOrderId(orderId);
        return list;
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
    @RequestMapping(value = "searchAllCustomerPaymentsAmount",method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllCustomerPaymentsAmount(){
        BigDecimal res = customerPaymentDAOService.searchAllCustomerPaymentsAmount();
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
    @RequestMapping(value = "searchCustomerOrderPaymentsByDateRange", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCustomerOrderPaymentsByDateRange(@RequestParam("firstDate")String firstDate,@RequestParam("secondDate")String secondDate) {
        List<CustomerOrderPayment> res = customerPaymentDAOService.searchCustomerOrderPaymentsByDateRange(firstDate,secondDate);
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
     * Search All Amounts Model
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "searchAllAmountsModel", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllAmountsModel() {
        BigDecimal totalCustomerOrderAmount = customerOrderDAOService.totalCustomerOrderValue();
        BigDecimal receivedCustomerOrderAmount = customerPaymentDAOService.searchAllCustomerPaymentsAmount();
        double pendingCustomerOrderAmount  = totalCustomerOrderAmount.doubleValue()-receivedCustomerOrderAmount.doubleValue();
        CustomerOrderModel res = new CustomerOrderModel();
        res.setTotalCustomerOrderAmount(totalCustomerOrderAmount.doubleValue());
        res.setReceivedCustomerOrderAmount(receivedCustomerOrderAmount.doubleValue());
        res.setPendingCustomerOrderAmount(pendingCustomerOrderAmount);

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

    @RequestMapping(value = "getAllDebatorsDetailByCustomerId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage getAllDebatorsDetailByCustomerId(@RequestParam("customerId")Long customerId) {
        List<CustomerOrderPaymentDetailModel>res =  new ArrayList<CustomerOrderPaymentDetailModel>();

        List<CustomerOrder> customerOrders = customerOrderDAOService.searchOrderHistoryByCustomerId(customerId);
        double paidAmount = 0;
        for (CustomerOrder customerOrder : customerOrders) {
            System.out.println("OrderAmount : "+customerOrder.getAmount());
            List<CustomerOrderPayment> allCustomerPayementsByOrderId = customerPaymentDAOService.getAllCustomerPayementsByOrderId(customerOrder.getCusOrderId());

            for (CustomerOrderPayment customerOrderPayment : allCustomerPayementsByOrderId) {

                System.out.println(customerOrderPayment.getAmount()+"-----"+customerOrderPayment.getCustomerOrderId());
                CustomerOrderPaymentDetailModel detailModel =  new CustomerOrderPaymentDetailModel();

                detailModel.setOrderId(customerOrder.getCusOrderId());
                detailModel.setOrderDate(customerOrder.getOrderDueDate());
                detailModel.setCustomerName(customerOrder.getCustomerName());
                detailModel.setTotalAmount(customerOrder.getAmount().doubleValue());
                paidAmount +=customerOrderPayment.getAmount().doubleValue();
                detailModel.setPaidAmount(paidAmount);
                detailModel.setRemainingAmount(customerOrder.getAmount().doubleValue()-paidAmount);
                System.out.println("DUE :"+customerOrderPayment.getAmount());
                res.add(detailModel);
                paidAmount= 0;
            }
        }
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


    @RequestMapping(value = "getAllDebatorsDetail", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage getAllDebatorsDetail() {
        List<CustomerOrderPaymentDetailModel>res =  new ArrayList<CustomerOrderPaymentDetailModel>();

        List<CustomerOrder> customerOrders = customerOrderDAOService.searchAllCustomerOrder();
        double paidAmount = 0;
        for (CustomerOrder customerOrder : customerOrders) {
            System.out.println("OrderAmount : "+customerOrder.getAmount());
            List<CustomerOrderPayment> allCustomerPayementsByOrderId = customerPaymentDAOService.getAllCustomerPayementsByOrderId(customerOrder.getCusOrderId());
            for (CustomerOrderPayment customerOrderPayment : allCustomerPayementsByOrderId) {
                System.out.println(customerOrderPayment.getAmount()+"-----"+customerOrderPayment.getCustomerOrderId());
                CustomerOrderPaymentDetailModel detailModel =  new CustomerOrderPaymentDetailModel();

                detailModel.setOrderId(customerOrder.getCusOrderId());
                detailModel.setOrderDate(customerOrder.getOrderDueDate());
                detailModel.setCustomerName(customerOrder.getCustomerName());
                detailModel.setTotalAmount(customerOrder.getAmount().doubleValue());
                paidAmount +=customerOrderPayment.getAmount().doubleValue();
                detailModel.setPaidAmount(paidAmount);
                detailModel.setRemainingAmount(customerOrder.getAmount().doubleValue()-paidAmount);
                System.out.println("DUE :"+customerOrderPayment.getAmount());
                res.add(detailModel);
                paidAmount= 0;
            }

        }
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
     * Get CustomerOrderPayment Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "ob",method = RequestMethod.GET)
    @ResponseBody
    public CustomerOrderPayment getObject(){
        CustomerOrderPayment customerOrderPayment = new CustomerOrderPayment();
        return customerOrderPayment;
    }

}
