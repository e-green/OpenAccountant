package org.egreen.opensms.server.model;

import java.math.BigDecimal;

/**
 * Created by Pramoda Fernando on 2/18/2015.
 */
public class IncomeSpendingsModel {

    private Double Amount;
    private Integer Month;

    public IncomeSpendingsModel() {
    }


    public IncomeSpendingsModel(Double amount, Integer month) {
        Amount = amount;
        Month = month;
    }

    public Double getAmount() {
        return Amount;
    }

    public void setAmount(Double amount) {
        Amount = amount;
    }

    public Integer getMonth() {
        return Month;
    }

    public void setMonth(Integer month) {
        Month = month;
    }
}
