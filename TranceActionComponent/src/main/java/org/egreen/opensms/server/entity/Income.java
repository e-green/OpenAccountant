package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
@Entity
@Table(name = "income")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Income implements EntityInterface<Long> {
    private long incomeId;
    private BigDecimal amount;
    private Timestamp date;
    private String incomeName;
    private String note;
    private String paymentType;
    private Long chequeId;

    @Basic
    @Column(name = "chequeId")
    public Long getChequeId() {
        return chequeId;
    }

    public void setChequeId(Long chequeId) {
        this.chequeId = chequeId;
    }

    @Id
    @Column(name = "incomeId")
    public long getIncomeId() {
        return incomeId;
    }

    public void setIncomeId(long incomeId) {
        this.incomeId = incomeId;
    }

    @Basic
    @Column(name = "amount")
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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
    @Column(name = "incomeName")
    public String getIncomeName() {
        return incomeName;
    }

    public void setIncomeName(String incomeName) {
        this.incomeName = incomeName;
    }

    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Basic
    @Column(name = "payment_type")
    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Income income = (Income) o;

        if (incomeId != income.incomeId) return false;
        if (amount != null ? !amount.equals(income.amount) : income.amount != null) return false;
        if (chequeId != null ? !chequeId.equals(income.chequeId) : income.chequeId != null) return false;
        if (date != null ? !date.equals(income.date) : income.date != null) return false;
        if (incomeName != null ? !incomeName.equals(income.incomeName) : income.incomeName != null) return false;
        if (note != null ? !note.equals(income.note) : income.note != null) return false;
        if (paymentType != null ? !paymentType.equals(income.paymentType) : income.paymentType != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (incomeId ^ (incomeId >>> 32));
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (incomeName != null ? incomeName.hashCode() : 0);
        result = 31 * result + (note != null ? note.hashCode() : 0);
        result = 31 * result + (paymentType != null ? paymentType.hashCode() : 0);
        result = 31 * result + (chequeId != null ? chequeId.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getIncomeId();
    }

    @Override
    public String toString() {
        return "Income{" +
                "incomeId=" + incomeId +
                ", amount=" + amount +
                ", date=" + date +
                ", incomeName='" + incomeName + '\'' +
                ", note='" + note + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", chequeId=" + chequeId +
                '}';
    }
}
