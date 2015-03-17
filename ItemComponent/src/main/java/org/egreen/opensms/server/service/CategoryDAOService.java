package org.egreen.opensms.server.service;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.dao.CategoryDAOController;
import org.egreen.opensms.server.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.rmi.server.UID;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
@Service
public class CategoryDAOService {


    private static final Logger LOGGER = Logger.getLogger(CategoryDAOService.class);


    private static final AtomicInteger COUNTER = new AtomicInteger();


    @Autowired
    private CategoryDAOController daoController;


    /**
     * Save Category
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param category
     * @return
     */
    public Long saveCategory(Category category) {
        long categoryId = new Date().getTime();
        category.setCategoryId(categoryId);
        Long res = daoController.create(category);
        return res;
    }

    /**
     *
     * Update Category
     *
     * @param category
     * @return
     */
    public  boolean updateCatogory(Category category){
        LOGGER.info(category);
        daoController.update(category);
        return true;
    }

//    /**
//     * Search Category By Name
//     *
//     * @author Pramoda Nadeeshan Fernando
//     * @version 1.0
//     * @since 2015-03-17 04.26PM
//     *
//     * @param categoryName
//     * @return
//     */
//    public List<Category> searchCategoryByName(String categoryname) {
//        List<Category> categoryList = daoController.findCategoryByQuery(categoryname);
//        return categoryList;
//    }

    /**
     * Search All Category
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @return
     */
    public List<Category> searchAllCategory() {
        List<Category> categoryList = daoController.findAllCategory();
        return categoryList;
    }


    /**
     *
     * Find Non Parent
     *
     * @return
     */
    public List<Category> searchAllNonParent() {
        List<Category> categoryList = daoController.findNonParent();
        return categoryList;
    }


    /**
     * Remove Category
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param categoryId
     * @return
     */
    public Integer deleteCategory(Long categoryId) {
       // Category read = daoController.read(categoryId);
        int delete = daoController.deleteCategory(categoryId);
       return delete;
    }

    /**
     *
     * Get All Category By Range
     *
     * @param limit
     * @param offset
     * @return
     */
//    public List<Category> getAllCategoryByRange(Integer limit, Integer offset) {
//        return daoController.getAllOrder(limit,offset,"");
//    }

    /**
     *
     * Get All Count
     *
     * @return
     */
    public Long getAllCount() {
        return daoController.getAllCount();
    }

    public Category getCategoryByCategoryId(Long categoryId) {
        return daoController.read(categoryId);
    }


}
