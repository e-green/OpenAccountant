package org.egreen.opensms.server.model;

/**
 * Created by Pramoda Fernando on 2/25/2015.
 */
public class CashChequeAmountModel {
    private Double cashAmount;
    private Double chequeAmount;

    public CashChequeAmountModel() {
    }

    public CashChequeAmountModel(double cashAmount, double chequeAmount) {
        this.cashAmount = cashAmount;
        this.chequeAmount = chequeAmount;
    }

    public double getCashAmount() {
        return cashAmount;
    }

    public void setCashAmount(double cashAmount) {
        this.cashAmount = cashAmount;
    }

    public double getChequeAmount() {
        return chequeAmount;
    }

    public void setChequeAmount(double chequeAmount) {
        this.chequeAmount = chequeAmount;
    }
}
