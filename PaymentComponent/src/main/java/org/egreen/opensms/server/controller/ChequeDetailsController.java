package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.ChequeDetails;
import org.egreen.opensms.server.models.GsrReportModel;
import org.egreen.opensms.server.service.ChequeDetailsDAOService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chethiya on 11/3/2014.
 */
@Controller
@RequestMapping("mintbooks/v1/cheque_details")
public class ChequeDetailsController {


    @Autowired
    private ChequeDetailsDAOService chequeDetailsDAOService;

    /**
     *
     * Save Cheque Details
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param chequeDetails
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addChequeDetails(@RequestBody ChequeDetails chequeDetails){
        boolean res = chequeDetailsDAOService.saveChequeDetails(chequeDetails);
        ResponseMessage responseMessage;
        if(res){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

//    /**
//     *
//     * Update Cheque Details
//     *
//     * @param chequeDetails
//     * @return
//     */
//    @RequestMapping(value = "update",method = RequestMethod.POST,headers = "Accept=application/json")
//    @ResponseBody
//    public ResponseMessage updateChequeDetails(@RequestBody ChequeDetails chequeDetails){
//        boolean result = chequeDetailsDAOService.updateChequeDetails(chequeDetails);
//        return ResponseMessage.SUCCESS;
//    }

    /**
     *
     * aproveOrder
     *
     * @param chequeId
     * @return
     */
//    @RequestMapping(value = "aproveOrder",method = RequestMethod.POST,headers = "Accept=application/json")
//    @ResponseBody
//    public ResponseMessage aproveOrder(@RequestParam("chequeId")Integer chequeId){
//      boolean result = chequeDetailsDAOService.aproveOrder(chequeId);
//        return ResponseMessage.SUCCESS;
//    }

    /**
     *
     * Search All Cheque Details
     *
     * @return
     */
    @RequestMapping(value = "searchAll",method = RequestMethod.GET)
    @ResponseBody
    public List<ChequeDetails> searchAllChequeDetails(){
        List<ChequeDetails> list= chequeDetailsDAOService.searchChequeDetails();
        return list;
    }

    /**
     *
     * Search All Cheque By OrderId
     *
     * @param orderId
     * @return
     */
    @RequestMapping(value = "searchAllChequeByOrderId",method = RequestMethod.GET)
    @ResponseBody
    public List<ChequeDetails> searchAllChequeByOrderId(@RequestParam("orderId")Long orderId){
        List<ChequeDetails> list= chequeDetailsDAOService.searchChequeDetailsByOrderId(orderId);
        return list;
    }

    /**
     * Get Cheque Details Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     */
    @RequestMapping(value = "ob",method = RequestMethod.GET,headers = "Accept=application/json")
    @ResponseBody
    public ChequeDetails getOb(){
        return new ChequeDetails();
    }
}
