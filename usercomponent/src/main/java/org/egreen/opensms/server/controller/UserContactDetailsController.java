package org.egreen.opensms.server.controller;


import org.egreen.opensms.server.entity.UserContactDetail;
import org.egreen.opensms.server.models.UserDetailModel;

import org.egreen.opensms.server.service.UserContactDetailControllerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dewmal on 7/17/14.
 */
@Controller
@RequestMapping("mintbooks/v1/customer/")
public class UserContactDetailsController {

    @Autowired
    private UserContactDetailControllerService cdService;

//    @Autowired
//    private CustomerOrderDAOService customerOrderDAOService;


    /**
     * Save Contact Detail
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @param userContactDetail
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage saveContactDetail(@RequestBody UserContactDetail userContactDetail){

        Long res = cdService.saveContactDetails(userContactDetail);
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


    @RequestMapping(value = "update",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage updateContactDetail(@RequestBody UserContactDetail userContactDetail){

        cdService.updateContactDetails(userContactDetail);
        return ResponseMessage.SUCCESS;
    }

    /**
     * Search All Customer
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    @RequestMapping(value = "search_all_customer",method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage search_all_contactDetails(){

        List<UserContactDetail> res =  cdService.searchAllContactDetails();
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

//    @RequestMapping(value = "search_all_customerDetailModel",method = RequestMethod.GET)
//    @ResponseBody
//    public ResponseMessage search_all_customerDetailModel(){
//        List<UserDetailModel>userDetailModels = new ArrayList<UserDetailModel>();
//        List<UserContactDetail> res =  cdService.searchAllContactDetails();
//        for (UserContactDetail re : res) {
//            double val = 0;
//            UserDetailModel userDetailModel = new UserDetailModel();
//            userDetailModel.setUserContactDetail(re);
//            List<CustomerOrder>list = customerOrderDAOService.getCustomerOrdersByCustomerId(re.getUserId());
//            for (CustomerOrder customerOrder : list) {
//                val += customerOrder.getAmount().doubleValue();
//                userDetailModel.setOrderAmount(val);
//            }
//            userDetailModels.add(userDetailModel);
//        }
//        ResponseMessage responseMessage;
//        if(res != null){
//            responseMessage = ResponseMessage.SUCCESS;
//            responseMessage.setData(userDetailModels);
//        }else{
//            responseMessage = ResponseMessage.DANGER;
//            responseMessage.setData(userDetailModels);
//        }
//        return responseMessage;
//    }


    @RequestMapping(value = "search_all",method = RequestMethod.GET)
       @ResponseBody
       public List<UserContactDetail> searchAll(@RequestParam("limit")Integer limit,@RequestParam("offset")Integer offset){
        List<UserContactDetail> list =  cdService.searchAllDetails(limit,offset);
        return list;
    }

    @RequestMapping(value = "testing_search_all",method = RequestMethod.GET)
    @ResponseBody
    public List<UserContactDetail> testing_search_all(){
        List<UserContactDetail> list =  cdService.testing_search_all();
        return list;
    }

    /**
     * Search All Sort By Customer Name
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    @RequestMapping(value = "search_all_sortByCustomerName",method = RequestMethod.GET)
      @ResponseBody
      public ResponseMessage search_all_sortByCustomerName(){
        List<UserContactDetail> res =  cdService.search_all_sortByCustomerName();
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
     * Search All Sort By CustomerOrder Value
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     *
     * @return
     */
    @RequestMapping(value = "search_all_sortByCustomerOrderValue",method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage search_all_sortByCustomerOrderValue(){
        List<UserContactDetail> res =  cdService.search_all_sortByCustomerOrderValue();
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

    @RequestMapping(value = "search_customerById",method = RequestMethod.GET)
    @ResponseBody
    public UserContactDetail searchAllDetailsByUserId(@RequestParam("userID")Long userId){

        UserContactDetail user  =   cdService.searchAllDetailsByUserId(userId);
        return user;
    }

    @RequestMapping(value = "getRowCount",method = RequestMethod.GET)
    @ResponseBody
    public Long getRowCount(){
        return cdService.getRowCount();
    }


    /***
     *
     * Get UserContactDetail Object
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    @RequestMapping(value = "ob",method = RequestMethod.GET)
    @ResponseBody
    public UserContactDetail getob(){
        return new UserContactDetail();
    }





}
