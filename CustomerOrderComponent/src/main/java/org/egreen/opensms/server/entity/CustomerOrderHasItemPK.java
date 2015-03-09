package org.egreen.opensms.server.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
public class CustomerOrderHasItemPK implements Serializable {
    private long customerOrderHasItemId;
    private long cusOrderId;
    private long itemId;

    @Column(name = "customerOrderHasItemId")
    @Id
    public long getCustomerOrderHasItemId() {
        return customerOrderHasItemId;
    }


    public CustomerOrderHasItemPK() {
    }

    public void setCustomerOrderHasItemId(long customerOrderHasItemId) {
        this.customerOrderHasItemId = customerOrderHasItemId;
    }

    public CustomerOrderHasItemPK(long customerOrderHasItemId, long cusOrderId) {
        this.customerOrderHasItemId = customerOrderHasItemId;
        this.cusOrderId = cusOrderId;
    }

    @Column(name = "cusOrderId")
    @Id
    public long getCusOrderId() {
        return cusOrderId;
    }

    public void setCusOrderId(long cusOrderId) {
        this.cusOrderId = cusOrderId;
    }

    @Column(name = "itemId")
    @Id
    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomerOrderHasItemPK that = (CustomerOrderHasItemPK) o;

        if (cusOrderId != that.cusOrderId) return false;
        if (customerOrderHasItemId != that.customerOrderHasItemId) return false;
        if (itemId != that.itemId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (customerOrderHasItemId ^ (customerOrderHasItemId >>> 32));
        result = 31 * result + (int) (cusOrderId ^ (cusOrderId >>> 32));
        result = 31 * result + (int) (itemId ^ (itemId >>> 32));
        return result;
    }
}
