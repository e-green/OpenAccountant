package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by chethiya on 11/3/2014.
 */
@Entity
@Table(name = "cheque_details")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChequeDetails implements EntityInterface<Integer>{
    private int chequeId;
    private Timestamp chequeDate;
    private String chequeBank;
    private String branch;
    private boolean aproveStatus;

    @Basic
    @Column(name = "aproveStatus")
    public boolean getAproveStatus() {
        return aproveStatus;
    }

    public void setAproveStatus(boolean aproveStatus) {
        this.aproveStatus = aproveStatus;
    }




    @Basic
    @Column(name = "branch")
    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    @Id
    @Column(name = "cheque_id")
    public int getChequeId() {
        return chequeId;
    }

    public void setChequeId(int chequeId) {
        this.chequeId = chequeId;
    }



    @Basic
    @Column(name = "cheque_date")
    public Timestamp getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(Timestamp chequeDate) {
        this.chequeDate = chequeDate;
    }

    @Basic
    @Column(name = "cheque_bank")
    public String getChequeBank() {
        return chequeBank;
    }

    public void setChequeBank(String chequeBank) {
        this.chequeBank = chequeBank;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChequeDetails that = (ChequeDetails) o;

        if (aproveStatus != that.aproveStatus) return false;
        if (chequeId != that.chequeId) return false;
        if (branch != null ? !branch.equals(that.branch) : that.branch != null) return false;
        if (chequeBank != null ? !chequeBank.equals(that.chequeBank) : that.chequeBank != null) return false;
        if (chequeDate != null ? !chequeDate.equals(that.chequeDate) : that.chequeDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = chequeId;
        result = 31 * result + (chequeDate != null ? chequeDate.hashCode() : 0);
        result = 31 * result + (chequeBank != null ? chequeBank.hashCode() : 0);
        result = 31 * result + (branch != null ? branch.hashCode() : 0);
        result = 31 * result + (aproveStatus ? 1 : 0);
        return result;
    }

    @Override
    @Transient
    public Integer getId() {
        return getChequeId();
    }


    @Override
    public String toString() {
        return "ChequeDetails{" +
                "chequeId=" + chequeId +
                ", chequeDate=" + chequeDate +
                ", chequeBank='" + chequeBank + '\'' +
                ", branch='" + branch + '\'' +
                ", aproveStatus=" + aproveStatus +
                '}';
    }
}
