package org.egreen.opensms.server.controller;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.entity.Brand;
import org.egreen.opensms.server.service.BrandDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
@Controller
@RequestMapping("mintbooks/v1/brand")
public class BrandController {
    private static final Logger LOGGER = Logger.getLogger(BrandController.class);

    @Autowired
    private BrandDAOService brandDAOService;


    /**
     * Save Brand
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param brand
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST,headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addBrand(@RequestBody Brand brand) {
        LOGGER.info(brand);
        Long res = brandDAOService.saveBrand(brand);
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
     * Get All Brand
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @return
     */
    @RequestMapping(value = "search", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage getAllBrand() {
        List<Brand> res = brandDAOService.getAll();
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
     *
     * Search Brand by Range
     * Can Order by Name
//     *
//     * @param offset
//     * @param limit
     * @return
     */

//    @RequestMapping(value = "searchRange",method = RequestMethod.GET)
//    @ResponseBody
//    public List<Brand>searchBrandByRange(@RequestParam("offset")int offset,@RequestParam("limit")int limit){
//        List<Brand>limitList = brandDAOService.getBrandByRange(offset,limit,"type");
//        LOGGER.info(limitList);
//        return  limitList;
//  }


    /**
     *
     * Remove Brand
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     *
     * @param brandId
     * @return
     */
    @RequestMapping(value = "removeBrand", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCategoryById(@RequestParam("brandId") Long brandId) {
        Integer res = brandDAOService.deleteBrand(brandId);
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

//    /**
//     *
//     * Search By Type
//     *
//     * @param type
//     * @return
//     */
//    @RequestMapping(value = "search_byType",method = RequestMethod.GET)
//    @ResponseBody
//    public List<Brand>searchBrandByType(@RequestParam("type")String type){
//        List<Brand>limitList = brandDAOService.getBrandByType(type);
//        LOGGER.info(limitList);
//        return  limitList;
//    }

    @RequestMapping(value = "ob",method = RequestMethod.GET)
    @ResponseBody
    public Brand getObject(){
        return  new Brand();
    }
}
