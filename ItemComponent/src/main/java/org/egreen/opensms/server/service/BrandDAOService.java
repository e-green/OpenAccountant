package org.egreen.opensms.server.service;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.dao.BrandDAOController;
import org.egreen.opensms.server.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */

@Service
public class BrandDAOService {

    private static final Logger LOGGER = Logger.getLogger(BrandDAOService.class);

    @Autowired
    private BrandDAOController brandDAOController;

    /**
     *
     * Save Brand
     *
     * @param brand
     * @return
     */
    public Long saveBrand(Brand brand){
        Long brandId = new Date().getTime();
        brand.setBrandId(brandId);
        Long res = brandDAOController.create(brand);
        return res;
    }


    /**
     *
     * Get All Brand
     *
     * @return
     */
    public List<Brand>getAll(){

        List<Brand> profitList = null;
        try {
            profitList = brandDAOController.getAllBrand();
            LOGGER.info("PROFIT : "+profitList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  profitList;
    }


    /**
     *
     * Search Brand by Range
     * Can Order by Name
     *
     * @param offset
     * @param limit
     * @param orderby
     * @return
     */
//    public List<Brand>getBrandByRange(int offset,int limit,String orderby){
//
//        List<Brand>list = brandDAOController.getAllOrder(offset,limit,orderby);
//        return list;
//    }


    /**
     *
     *Get Brand By Type
     *
     * @param type
     * @return
     */
    public List<Brand>getBrandByType(String type){

        List<Brand>list = brandDAOController.findBrandByQuary(type);
        return list;
    }


    public Brand getBrandByBrandId(Long brandId) {
        return brandDAOController.read(brandId);
    }

    public Integer deleteBrand(Long brandId) {

        return brandDAOController.deleteBrand(brandId);
    }
}
