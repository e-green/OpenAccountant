package org.egreen.opensms.server.model;

import org.egreen.opensms.server.entity.*;


/**
 * Created by Pramoda Fernando on 9/23/2014.
 */
public class ItemModel extends Item {

    private Supplier supplierDetails;
    private Brand  brandDetails;
    private Category categoryDetails;

    public ItemModel() {
    }

    public ItemModel(Supplier supplierDetails, Brand brandDetails, Category categoryDetails) {
        this.supplierDetails = supplierDetails;
        this.brandDetails = brandDetails;
        this.categoryDetails = categoryDetails;
    }

    public Supplier getSupplierDetails() {
        return supplierDetails;
    }

    public void setSupplierDetails(Supplier supplierDetails) {
        this.supplierDetails = supplierDetails;
    }

    public Brand getBrandDetails() {
        return brandDetails;
    }

    public void setBrandDetails(Brand brandDetails) {
        this.brandDetails = brandDetails;
    }

    public Category getCategoryDetails() {
        return categoryDetails;
    }

    public void setCategoryDetails(Category categoryDetails) {
        this.categoryDetails = categoryDetails;
    }
}
