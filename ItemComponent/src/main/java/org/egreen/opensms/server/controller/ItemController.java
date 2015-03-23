package org.egreen.opensms.server.controller;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.entity.Item;
import org.egreen.opensms.server.model.ItemModel;
import org.egreen.opensms.server.model.MailMail;
import org.egreen.opensms.server.service.BrandDAOService;
import org.egreen.opensms.server.service.CategoryDAOService;
import org.egreen.opensms.server.service.ItemDAOService;
import org.egreen.opensms.server.service.SupplierDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dewmal on 8/19/14.
 */
@Controller
@RequestMapping("mintbooks/v1/item")
public class ItemController {

    private static final Logger LOGGER = Logger.getLogger(ItemController.class);

    @Autowired
    private ItemDAOService itemDAOService;

    @Autowired
    private CategoryDAOService categoryDAOService;

    @Autowired
    private BrandDAOService brandDAOService;

    @Autowired
    private SupplierDAOService supplierDAOService;



    @Autowired
    private MailMail mailMail;


    /**
     * Save Item
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param item
     * @return
     */
    @RequestMapping(value = "save", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addItem(@RequestBody Item item) {
        Long res = itemDAOService.saveItem(item);
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
     * Update Item
     *
     * @param item
     * @return
     */
    @RequestMapping(value = "update", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage updateCategory(@RequestBody Item item) {
        boolean result = itemDAOService.updateItem(item);
        return ResponseMessage.SUCCESS;
    }

    /**
     * Search Item By Name
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @return
     */
    @RequestMapping(value = "searchItemModel", method = RequestMethod.GET)
    @ResponseBody
    public List<ItemModel> searchItemModel() {
        List<ItemModel> itemModelList = new ArrayList<ItemModel>();
        List<Item> list = itemDAOService.searchAllItem();
        for (Item item : list) {
            ItemModel itemModel = new ItemModel();
            itemModel.setItemId(item.getItemId());
            itemModel.setName(item.getName());
            itemModel.setQty(item.getQty());
            itemModel.setBuyingPrice(item.getBuyingPrice());
            itemModel.setRetailPrice(item.getRetailPrice());
            itemModel.setWholeSalePrice(item.getWholeSalePrice());
            itemModel.setBrandId(item.getBrandId());
            itemModel.setCategoryId(item.getCategoryId());
            itemModel.setVendorId(item.getVendorId());
            itemModel.setBrandDetails(brandDAOService.getBrandByBrandId(item.getBrandId()));
            itemModel.setCategoryDetails(categoryDAOService.getCategoryByCategoryId(item.getCategoryId()));
            itemModel.setSupplierDetails(supplierDAOService.searchAllVendorById(item.getVendorId()));
            itemModelList.add(itemModel);
        }
        return itemModelList;
    }

    /**
     * Search Item Model By ItemQty
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param qty
     * @return
     */
    @RequestMapping(value = "searchItemModelByItemQty", method = RequestMethod.GET)
    @ResponseBody
    public List<ItemModel> searchItemModelByItemQty(@RequestParam("qty")double qty) {
        List<ItemModel> itemModelList = new ArrayList<ItemModel>();
        List<Item> list = itemDAOService.searchItemModelByItemQty(qty);
        for (Item item : list) {
            ItemModel itemModel = new ItemModel();
            itemModel.setItemId(item.getItemId());
            itemModel.setName(item.getName());
            itemModel.setQty(item.getQty());
            itemModel.setBuyingPrice(item.getBuyingPrice());
            itemModel.setRetailPrice(item.getRetailPrice());
            itemModel.setWholeSalePrice(item.getWholeSalePrice());
            itemModel.setBrandId(item.getBrandId());
            itemModel.setCategoryId(item.getCategoryId());
            itemModel.setVendorId(item.getVendorId());
            itemModel.setBrandDetails(brandDAOService.getBrandByBrandId(item.getBrandId()));
            itemModel.setCategoryDetails(categoryDAOService.getCategoryByCategoryId(item.getCategoryId()));
            itemModel.setSupplierDetails(supplierDAOService.searchAllVendorById(item.getVendorId()));
            itemModelList.add(itemModel);
        }
        return itemModelList;
    }

    /**
     * Search All Item
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     *
     * @return
     */
    @RequestMapping(value = "search_all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllItem() {
        List<Item> res = itemDAOService.searchAllItem();
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
     *
     * Search Item By Id
     *
     * @param itemId
     * @return
     */
//    @RequestMapping(value = "search_ItemById",method = RequestMethod.GET)
//    @ResponseBody
//    public Item searchItemById(@RequestParam("itemID")String itemId){
//        Item item= itemDAOService.searchItemByItemId(itemId);
//        return  item;
//    }

    /**
     * Search All Fake
     *
     * @return
     */
    @RequestMapping(value = "search_all_fake", method = RequestMethod.GET)
    @ResponseBody
    public List<ItemModel> searchAllfakeQty() {
        List<ItemModel> list = itemDAOService.searchAllfakeQty();
        return list;
    }

    /**
     * Search Stock Amount
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @return
     */
    @RequestMapping(value = "searchStockAmount", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchStockAmount() {
        List<Item> list = itemDAOService.searchAllItem();
        double res = 0;
        for (Item item : list) {
            res += item.getBuyingPrice().doubleValue();
        }
        ResponseMessage responseMessage;
        if (res != 0) {
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        } else {
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(0);
        }
        return responseMessage;
    }

    /**
     *
     * Pegination Item By Range
//     *
//     * @param limit
//     * @param offset
     * @return
     */
//    @RequestMapping(value = "paginateItemByRange",method = RequestMethod.GET)
//    @ResponseBody
//    public   List<ItemSimpleModel> getAllItemByRange(@RequestParam("limit")Integer limit,@RequestParam("offset")Integer offset) {
//       // List<Item> list  = itemDAOService.getAllItemByRange(limit,offset);
//       /// List<Item> list = itemDAOService.getAllItemByRange(limit,offset);
//        List<ItemSimpleModel>itemSimpleModelsList = new ArrayList<ItemSimpleModel>();
//        for (Item item : list) {
//            ItemSimpleModel itemSimpleModel = new ItemSimpleModel();
//            Category category = itemDAOService.searchCategoryName(item.getCategory());
//            Unit unit = itemDAOService.searchUnitName(item.getUnit());
//            itemSimpleModel.setItem(item);
//            itemSimpleModel.setCategoryName(category.getCategory());
//            itemSimpleModel.setUnitName(unit.getUnit());
//            itemSimpleModelsList.add(itemSimpleModel);
//        }
//        return  itemSimpleModelsList;
//    }


    /***
     * Remove Item
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param itemId
     * @return
     */
    @RequestMapping(value = "removeItem", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCategoryById(@RequestParam("itemId") Long itemId) {
        Integer res = itemDAOService.deleteItem(itemId);

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
     *
     * Get Item Details
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-03-17 04.26PM
     *
     * @param itemId
     * @return
     */
    @RequestMapping(value = "getItemDetails", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage getItemDetails(@RequestParam("itemId")Long itemId) {
        Item res = itemDAOService.getItemDetails(itemId);
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

//
//    /**
//     * Get Row Count
//     *
//     * @return
//     */
//    @RequestMapping(value = "getRowCount", method = RequestMethod.GET)
//    @ResponseBody
//    public Long getRowCount() {
//        Long a = itemDAOService.getAllCount();
//        return a;
//    }


    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public Item getObject() {
        return new Item();
    }

}
