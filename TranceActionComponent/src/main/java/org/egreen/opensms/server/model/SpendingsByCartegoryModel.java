package org.egreen.opensms.server.model;

/**
 * Created by Pramoda Fernando on 2/24/2015.
 */
public class SpendingsByCartegoryModel {

    private String categoryName;
    private double amount;

    public SpendingsByCartegoryModel() {
    }

    public SpendingsByCartegoryModel(String categoryName, double amount) {
        this.categoryName = categoryName;
        this.amount = amount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
