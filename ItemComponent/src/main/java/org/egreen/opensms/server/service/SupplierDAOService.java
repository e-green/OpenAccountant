package org.egreen.opensms.server.service;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.dao.SupplierDAOController;
import org.egreen.opensms.server.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */
@Service
public class SupplierDAOService {
    private static final Logger LOGGER = Logger.getLogger(SupplierDAOService.class);



    @Autowired
    private SupplierDAOController venderCategoryDAOController;

    /**
     *
     * Save Vendor Category
     *
     * @param supplier
     * @return
     */
    public Long saveVendorCategory(Supplier supplier){

        long supplierId = new Date().getTime();
        supplier.setSupplierId(supplierId);


        Long aLong = venderCategoryDAOController.create(supplier);
        return aLong;
    }

    /**
     *
     * Update Vendor Category
     *
     * @param vendorCategoryEntity
     * @return
     */
    public boolean updateVendorCategory(Supplier vendorCategoryEntity){
        LOGGER.info(vendorCategoryEntity);
        venderCategoryDAOController.update(vendorCategoryEntity);
        return true;
    }

    /**
     *
     * Search All Vendor Category
     *
     * @return
     */
    public List<Supplier> searchAllVendor(){
        List<Supplier> list = venderCategoryDAOController.findAllVendor();
        return list;

    }

    /**
     *
     * Search All Vendor By Id
     *
     * @param vendorID
     * @return
     */
    public Supplier searchAllVendorById(Long vendorID) {
        return venderCategoryDAOController.read(vendorID);
    }

    /**
     * Remove Supplier
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     *
     * @param supplierId
     * @return
     */
    public Integer deleteSupplier(Long supplierId) {

        return venderCategoryDAOController.deleteSupplier(supplierId);
    }
}

