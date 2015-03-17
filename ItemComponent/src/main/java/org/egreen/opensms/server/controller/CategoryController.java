package org.egreen.opensms.server.controller;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.entity.Category;
import org.egreen.opensms.server.service.CategoryDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
@Controller
@RequestMapping("mintbooks/v1/category")
public class CategoryController {

    private static final Logger LOGGER = Logger.getLogger(CategoryController.class);

    @Autowired
    private CategoryDAOService categoryDAOService;

    /**
     * Save Category
     *
     * @param category
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addCategory(@RequestBody Category category) {
        LOGGER.info(category);
        Long res = categoryDAOService.saveCategory(category);
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

    /**
     * Update Category
     *
     * @param category
     * @return
     */
    @RequestMapping(value = "update", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage updateCategory(@RequestBody Category category) {
        LOGGER.info(category);
        boolean result = categoryDAOService.updateCatogory(category);
        return ResponseMessage.SUCCESS;
    }

    /**
     * Search Category By Name
     *
     * @param categoryName
     * @return
     */
    @RequestMapping(value = "search", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCategoryByName(@RequestParam("categoryName") String categoryName) {
        List<Category> res = categoryDAOService.searchCategoryByName(categoryName);

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

    /**
     * Search All Category
     *
     * @return
     */
    @RequestMapping(value = "search_all", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage searchAllCategory() {
        List<Category> res = categoryDAOService.searchAllCategory();

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

    /**
     * Search Category By Id
     *
     * @return
     */
    @RequestMapping(value = "search_categoryById", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public List<Category> searchCategoryById() {
        List<Category> list = categoryDAOService.searchAllCategory();
        LOGGER.info(list);
        return list;
    }


    /**
     * Remove Category
     *
     * @param categoryId
     * @return
     */
    @RequestMapping(value = "removeCategory", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCategoryById(@RequestParam("categoryId") Long categoryId) {
        Integer res = categoryDAOService.deleteCategory(categoryId);

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

    /**
     * Find Non Parent
     *
     * @return
     */
    @RequestMapping(value = "search_all_nonParent", method = RequestMethod.GET)
    @ResponseBody
    public List<Category> searchAllCategoryNonParent() {
        List<Category> list = categoryDAOService.searchAllNonParent();
        LOGGER.info(list);
        return list;
    }

    /**
     *
     * Pagination Category By Range
     *
     * @param limit
     * @param offset
     * @return
     */
//    @RequestMapping(value = "paginateCategoryByRange",method = RequestMethod.GET)
//    @ResponseBody
//    public  List<Category>  getAllCategoryByRange(@RequestParam("limit")Integer limit,@RequestParam("offset")Integer offset ) {
//
//        List<Category> list  = categoryDAOService.getAllCategoryByRange(limit, offset);
//        return list;
//    }


    /**
     * Get Row Count
     *
     * @return
     */
    @RequestMapping(value = "getRowCount", method = RequestMethod.GET)
    @ResponseBody
    public Long getRowCount() {

        Long a = categoryDAOService.getAllCount();
        return a;
    }

    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public Category ob() {
        return new Category();
    }
}
