package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Pramoda Fernando on 10/3/2014.
 */
@Entity
@Table(name = "item")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Item implements EntityInterface<Long> {
    private Long itemId;
    private String name;
    private BigDecimal qty;
    private BigDecimal buyingPrice;
    private BigDecimal wholeSalePrice;
    private BigDecimal retailPrice;
    private Long categoryId;
    private Long vendorId;
    private Long brandId;



    @Id
    @Column(name = "item_id")
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "qty")
    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    @Basic
    @Column(name = "buying_price")
    public BigDecimal getBuyingPrice() {
        return buyingPrice;
    }

    public void setBuyingPrice(BigDecimal buyingPrice) {
        this.buyingPrice = buyingPrice;
    }

    @Basic
    @Column(name = "wholesale_price")
    public BigDecimal getWholeSalePrice() {
        return wholeSalePrice;
    }

    public void setWholeSalePrice(BigDecimal wholeSalePrice) {
        this.wholeSalePrice = wholeSalePrice;
    }

    @Basic
    @Column(name = "retail_price")
    public BigDecimal getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(BigDecimal retailPrice) {
        this.retailPrice = retailPrice;
    }

    @Basic
    @Column(name = "category_id")
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Basic
    @Column(name = "vendor_id")
    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    @Basic
    @Column(name = "brand_id")
    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

    @Override
    @Transient
    public Long getId() {
        return getItemId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Item item = (Item) o;

        if (brandId != null ? !brandId.equals(item.brandId) : item.brandId != null) return false;
        if (buyingPrice != null ? !buyingPrice.equals(item.buyingPrice) : item.buyingPrice != null) return false;
        if (categoryId != null ? !categoryId.equals(item.categoryId) : item.categoryId != null) return false;
        if (itemId != null ? !itemId.equals(item.itemId) : item.itemId != null) return false;
        if (name != null ? !name.equals(item.name) : item.name != null) return false;
        if (qty != null ? !qty.equals(item.qty) : item.qty != null) return false;
        if (retailPrice != null ? !retailPrice.equals(item.retailPrice) : item.retailPrice != null) return false;
        if (vendorId != null ? !vendorId.equals(item.vendorId) : item.vendorId != null) return false;
        if (wholeSalePrice != null ? !wholeSalePrice.equals(item.wholeSalePrice) : item.wholeSalePrice != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = itemId != null ? itemId.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (qty != null ? qty.hashCode() : 0);
        result = 31 * result + (buyingPrice != null ? buyingPrice.hashCode() : 0);
        result = 31 * result + (wholeSalePrice != null ? wholeSalePrice.hashCode() : 0);
        result = 31 * result + (retailPrice != null ? retailPrice.hashCode() : 0);
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + (vendorId != null ? vendorId.hashCode() : 0);
        result = 31 * result + (brandId != null ? brandId.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + itemId +
                ", name='" + name + '\'' +
                ", qty=" + qty +
                ", buyingPrice=" + buyingPrice +
                ", wholeSalePrice=" + wholeSalePrice +
                ", retailPrice=" + retailPrice +
                ", categoryId=" + categoryId +
                ", vendorId=" + vendorId +
                ", brandId=" + brandId +
                '}';
    }
}
