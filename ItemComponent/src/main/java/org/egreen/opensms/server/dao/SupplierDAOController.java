package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Supplier;

import java.util.List;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */
public interface SupplierDAOController extends DAOController<Supplier,Long> {
    List<Supplier> findAllVendor();

    Integer deleteSupplier(Long supplierId);
}

