package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Pramoda Fernando on 2/16/2015.
 */
@Entity
@Table(name = "spendings")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Spendings implements EntityInterface<Long> {

    private long spendingsId;
    private String spendingsName;
    private String category;
    private Timestamp date;
    private BigDecimal amount;
    private String note;


    @Id
    @Column(name = "spendingsId")
    public long getSpendingsId() {
        return spendingsId;
    }

    public void setSpendingsId(long spendingsId) {
        this.spendingsId = spendingsId;
    }

    public String getSpendingsName() {
        return spendingsName;
    }

    public void setSpendingsName(String spendingsName) {
        this.spendingsName = spendingsName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    @Transient
    public Long getId() {
        return getSpendingsId();
    }


    @Override
    public String toString() {
        return "Spendings{" +
                "spendingsId=" + spendingsId +
                ", spendingsName='" + spendingsName + '\'' +
                ", paymentType='" + category + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", note='" + note + '\'' +
                '}';
    }
}
