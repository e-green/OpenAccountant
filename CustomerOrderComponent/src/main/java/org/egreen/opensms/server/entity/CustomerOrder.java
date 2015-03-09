package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */
@Entity
@Table(name = "customer_order")
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerOrder implements EntityInterface<Long> {

    private long cusOrderId;
    private Timestamp invoiceDate;
    private Timestamp orderDueDate;
    private Long customerId;
    private String customerName;
    private BigDecimal amount;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @Id
    @Column(name = "cus_orderId")
    public long getCusOrderId() {
        return cusOrderId;
    }

    public void setCusOrderId(long cusOrderId) {
        this.cusOrderId = cusOrderId;
    }

    public Timestamp getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Timestamp invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Timestamp getOrderDueDate() {
        return orderDueDate;
    }

    public void setOrderDueDate(Timestamp orderDueDate) {
        this.orderDueDate = orderDueDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomerOrder that = (CustomerOrder) o;

        if (cusOrderId != that.cusOrderId) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;
        if (customerName != null ? !customerName.equals(that.customerName) : that.customerName != null) return false;
        if (invoiceDate != null ? !invoiceDate.equals(that.invoiceDate) : that.invoiceDate != null) return false;
        if (orderDueDate != null ? !orderDueDate.equals(that.orderDueDate) : that.orderDueDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (cusOrderId ^ (cusOrderId >>> 32));
        result = 31 * result + (invoiceDate != null ? invoiceDate.hashCode() : 0);
        result = 31 * result + (orderDueDate != null ? orderDueDate.hashCode() : 0);
        result = 31 * result + (customerName != null ? customerName.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getCusOrderId();
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
                "cusOrderId=" + cusOrderId +
                ", invoiceDate=" + invoiceDate +
                ", orderDueDate=" + orderDueDate +
                ", customerId=" + customerId +
                ", customerName='" + customerName + '\'' +
                ", amount=" + amount +
                '}';
    }
}
