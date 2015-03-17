package org.egreen.opensms.server.controller;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.entity.Supplier;
import org.egreen.opensms.server.service.SupplierDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */

@Controller
@RequestMapping("mintbooks/v1/supplier")
public class SupplierController {

    private static final Logger LOGGER = Logger.getLogger(SupplierController.class);

    @Autowired
    private SupplierDAOService vendorCategoryDAOService;

    /**
     *
     * Save Vendor Category
     *
     * @param vendorCategoryEntity
     * @return
     */
    @RequestMapping(value = "save",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage saveVendorCategory(@RequestBody Supplier vendorCategoryEntity){

        Long res = vendorCategoryDAOService.saveVendorCategory(vendorCategoryEntity);
        ResponseMessage responseMessage;
        if(res != res){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }


    /**
     *
     * Update Vendor Category
     *
     * @param vendorCategoryEntity
     * @return
     */
    @RequestMapping(value = "update",method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage updateVendorCategory(@RequestBody Supplier vendorCategoryEntity){
        LOGGER.info(vendorCategoryEntity);
        vendorCategoryDAOService.updateVendorCategory(vendorCategoryEntity);
        return ResponseMessage.SUCCESS;
    }

    @RequestMapping(value = "search", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchGrnOrderByOrderId() {
        List<Supplier> res = vendorCategoryDAOService.searchAllVendor();
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

    @RequestMapping(value = "removeSupplier", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCategoryById(@RequestParam("supplierId") Long supplierId) {
        Integer res = vendorCategoryDAOService.deleteSupplier(supplierId);

        ResponseMessage responseMessage;
        if (res != null) {
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        } else {
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }


    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public Supplier getOb() {
        return new Supplier();
    }
}
