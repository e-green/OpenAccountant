package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Brand;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
public interface BrandDAOController extends DAOController<Brand,Long> {
    List<Brand> getAllBrand();

    List<Brand> findBrandByQuary(String type);

    Integer deleteBrand(Long brandId);
}
