package org.egreen.opensms.server.model;

import org.egreen.opensms.server.entity.Category;
import org.egreen.opensms.server.entity.Item;

/**
 * Created by chethiya on 11/5/2014.
 */
public class ItemSimpleModel{

    private Item item;
    private String categoryName;
    private String unitName;


    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
