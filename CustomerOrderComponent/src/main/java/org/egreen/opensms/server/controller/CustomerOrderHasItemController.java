package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.entity.CustomerOrderHasItemPK;
import org.egreen.opensms.server.service.CustomerOrderHasItemDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */

@Controller
@RequestMapping("mintbooks/v1/customer_order_has_item")
public class CustomerOrderHasItemController {

    @Autowired
    private CustomerOrderHasItemDAOService customerOrderHasItemDAOService;


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
    @RequestMapping(value = "save", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addCustomerOrderHasItem(@RequestBody CustomerOrderHasItem customerOrderHasItem) {

        System.out.println("Item Detail : "+customerOrderHasItem);

        CustomerOrderHasItemPK res = customerOrderHasItemDAOService.saveCustomerOrderHasItem(customerOrderHasItem);
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
     * Get All OrderDetails By OrderId
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    @RequestMapping(value = "getAlOrderDetailsByOrderId", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage getAlOrderDetailsByOrderId(@RequestParam("orderId")Long orderId) {
        List<CustomerOrderHasItem> res = customerOrderHasItemDAOService.getAlOrderDetailsByOrderId(orderId);
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
     * Remove CustomerOrder Has Item
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param orderId
     * @return
     */
    @RequestMapping(value = "removeCustomerOrderHasItem", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage removeCustomerOrderHasItem(@RequestParam("orderId")Long orderId) {
        Integer res = customerOrderHasItemDAOService.removeCustomerOrderHasItem(orderId);
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
     * Get CustomerOrder Has Item Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public CustomerOrderHasItem ob() {
        return new CustomerOrderHasItem();
    }
}
