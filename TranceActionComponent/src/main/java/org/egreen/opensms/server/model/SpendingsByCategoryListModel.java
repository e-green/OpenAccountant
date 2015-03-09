package org.egreen.opensms.server.model;

import java.util.List;

/**
 * Created by Pramoda Fernando on 2/24/2015.
 */
public class SpendingsByCategoryListModel {

 private List<String> categoryNameList;
    private List<Double>amountList;


    public List<Double> getAmountList() {
        return amountList;
    }

    public void setAmountList(List<Double> amountList) {
        this.amountList = amountList;
    }

    public List<String> getCategoryNameList() {
        return categoryNameList;
    }

    public void setCategoryNameList(List<String> categoryNameList) {
        this.categoryNameList = categoryNameList;
    }
}
