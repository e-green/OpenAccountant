package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Item;
import org.egreen.opensms.server.model.ItemModel;

import java.util.List;

/**
 * Created by dewmal on 8/19/14.
 */
public interface ItemDAOController extends DAOController<Item, Long> {

    List<Item> findItemByQuery(String itemName);

    List<Item> findAllItem();

    List<ItemModel> findAllfakeQty();

    long getItemBatchQty(String id);

    List<Item> searchItemModelByItemQty(double qty);

    Integer deleteItem(Long itemId);

    Item searchItemByItemName(String itemName);

}
