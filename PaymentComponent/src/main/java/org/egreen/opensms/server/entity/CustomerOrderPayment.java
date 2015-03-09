package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */
@Entity
@Table(name = "customer_order_payment")
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerOrderPayment implements EntityInterface<Long> {
    private long paymentId;
    private long customerOrderId;
    private Timestamp date;
    private BigDecimal amount;

    @Id
    @Column(name = "paymentId")
    public long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(long paymentId) {
        this.paymentId = paymentId;
    }

    @Basic
    @Column(name = "customer_orderId")
    public long getCustomerOrderId() {
        return customerOrderId;
    }

    public void setCustomerOrderId(long customerOrderId) {
        this.customerOrderId = customerOrderId;
    }

    @Basic
    @Column(name = "date")
    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
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

        CustomerOrderPayment that = (CustomerOrderPayment) o;

        if (customerOrderId != that.customerOrderId) return false;
        if (paymentId != that.paymentId) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (paymentId ^ (paymentId >>> 32));
        result = 31 * result + (int) (customerOrderId ^ (customerOrderId >>> 32));
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getPaymentId();
    }

    @Override
    public String toString() {
        return "CustomerOrderPayment{" +
                "paymentId=" + paymentId +
                ", customerOrderId=" + customerOrderId +
                ", date=" + date +
                ", amount=" + amount +
                '}';
    }
}
