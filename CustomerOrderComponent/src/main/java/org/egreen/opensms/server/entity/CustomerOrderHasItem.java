package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
@Entity
@Table(name = "customer_order_has_item")
@IdClass(CustomerOrderHasItemPK.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerOrderHasItem implements EntityInterface<CustomerOrderHasItemPK> {

    private long customerOrderHasItemId;
    private long cusOrderId;
    private long itemId;
    private String itemName;
    private String description;
    private BigDecimal quentity;
    private BigDecimal rate;
    private BigDecimal amount;

    @Id
    @Column(name = "customerOrderHasItemId")
    public long getCustomerOrderHasItemId() {
        return customerOrderHasItemId;
    }

    public void setCustomerOrderHasItemId(long customerOrderHasItemId) {
        this.customerOrderHasItemId = customerOrderHasItemId;
    }

    @Id
    @Column(name = "cusOrderId")
    public long getCusOrderId() {
        return cusOrderId;
    }

    public void setCusOrderId(long cusOrderId) {
        this.cusOrderId = cusOrderId;
    }

    @Id
    @Column(name = "itemId")
    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    @Basic
    @Column(name = "itemName")
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "quentity")
    public BigDecimal getQuentity() {
        return quentity;
    }

    public void setQuentity(BigDecimal quentity) {
        this.quentity = quentity;
    }

    @Basic
    @Column(name = "rate")
    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    @Basic
    @Column(name = "amount")
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomerOrderHasItem that = (CustomerOrderHasItem) o;

        if (cusOrderId != that.cusOrderId) return false;
        if (customerOrderHasItemId != that.customerOrderHasItemId) return false;
        if (itemId != that.itemId) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (itemName != null ? !itemName.equals(that.itemName) : that.itemName != null) return false;
        if (quentity != null ? !quentity.equals(that.quentity) : that.quentity != null) return false;
        if (rate != null ? !rate.equals(that.rate) : that.rate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (customerOrderHasItemId ^ (customerOrderHasItemId >>> 32));
        result = 31 * result + (int) (cusOrderId ^ (cusOrderId >>> 32));
        result = 31 * result + (int) (itemId ^ (itemId >>> 32));
        result = 31 * result + (itemName != null ? itemName.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (quentity != null ? quentity.hashCode() : 0);
        result = 31 * result + (rate != null ? rate.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }


    @Override
    public String toString() {
        return "CustomerOrderHasItem{" +
                "customerOrderHasItemId=" + customerOrderHasItemId +
                ", cusOrderId=" + cusOrderId +
                ", itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", description='" + description + '\'' +
                ", quentity=" + quentity +
                ", rate=" + rate +
                ", amount=" + amount +
                '}';
    }

    @Override
    @Transient
    public CustomerOrderHasItemPK getId() {
        return new CustomerOrderHasItemPK(getCustomerOrderHasItemId(),getCusOrderId());
    }
}
