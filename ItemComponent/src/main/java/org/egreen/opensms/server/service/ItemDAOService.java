package org.egreen.opensms.server.service;

import org.apache.log4j.Logger;
import org.egreen.opensms.server.dao.CategoryDAOController;
import org.egreen.opensms.server.dao.ItemDAOController;

import org.egreen.opensms.server.entity.Category;
import org.egreen.opensms.server.entity.Item;

import org.egreen.opensms.server.model.ItemModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */

@Service
public class ItemDAOService {

    private static final Logger LOGGER = Logger.getLogger(ItemDAOService.class);



    @Autowired
    private ItemDAOController itemDAOController;

    @Autowired
    private CategoryDAOController categoryDAOController;




    /**
     *
     * Save Item
     *
     * @param item
     * @return
     */
    public Long saveItem(Item item){
        LOGGER.info(item);
        long itemId = new Date().getTime();
        item.setItemId(itemId);
        System.out.println("Item Name : "+item.getName());


        Long aLong = itemDAOController.create(item);
        return  aLong;
    }


    /**
     *
     * Update Item
     *
     * @param item
     * @return
     */
    public boolean updateItem(Item item){
        LOGGER.info(item);
        itemDAOController.update(item);
        return true;

    }

    /**
     *
     * Search Item By Name
     *
     * @param itemName
     * @return
     */
    public List<Item>  searchItemByName(String itemName){
        List<Item> list = itemDAOController.findItemByQuery(itemName);
        return list;

    }

    /**
     *
     * Search All Item
     *
     * @return
     */
    public List<Item>  searchAllItem(){
        List<Item> list = itemDAOController.findAllItem();
        return list;

    }

    /**
     *
     * Search All Fake Qty
     *
     * @return
     */
    public List<ItemModel>  searchAllfakeQty(){
        List<ItemModel> list = itemDAOController.findAllfakeQty();
        return list;

    }

    /**
     *
     * Check Is Empty
     *
     * @param id
     * @return
     */
    public boolean isEmpty(String id) {

        long qty = itemDAOController.getItemBatchQty(id);
        if (qty > 0) {
            return false;
        }
        return true;
    }

    /**
     *
     * Search Item By Item ID
     *
     * @param itemId
     * @return
     */
    public Item searchItemByItemId(Long itemId) {
        return itemDAOController.read(itemId);
    }

    /**
     *
     * Search Category Name By CategoryId
     *
     * @param category
     * @return
     */
    public Category searchCategoryName(long category) {
        return categoryDAOController.read(category);
    }


    /**
     *
     * Get All Item By Range
     *
     * @param limit
     * @param offset
     * @return
     */
//    public List<Item> getAllItemByRange(Integer limit, Integer offset) {
//        return itemDAOController.getAllOrder(limit,offset,"");
//    }

    /**
     *
     * Get All Count
     *
     * @return
     */
    public Long getAllCount() {
        return itemDAOController.getAllCount();

    }

    public List<Item> searchItemModelByItemQty(double qty) {
        return itemDAOController.searchItemModelByItemQty(qty);
    }

    public Integer deleteItem(Long itemId) {
        return itemDAOController.deleteItem(itemId);
    }

    public Item getItemDetails(Long itemId) {
        return itemDAOController.read(itemId);
    }
}
