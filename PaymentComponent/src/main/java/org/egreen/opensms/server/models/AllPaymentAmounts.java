package org.egreen.opensms.server.models;

import java.math.BigDecimal;

/**
 * Created by Pramoda Fernando on 12/4/2014.
 */
public class AllPaymentAmounts {

    private double allChequeAmount;
    private double allCashAmount;
//    private double remainingAmount;
//
//    private double allPaymentAmount;
//    private double fullPayment;


    public double getAllChequeAmount() {
        return allChequeAmount;
    }

    public void setAllChequeAmount(double allChequeAmount) {
        this.allChequeAmount = allChequeAmount;
    }

    public double getAllCashAmount() {
        return allCashAmount;
    }

    public void setAllCashAmount(double allCashAmount) {
        this.allCashAmount = allCashAmount;
    }

//    public double getRemainingAmount() {
//        return remainingAmount;
//    }
//
//    public void setRemainingAmount(double remainingAmount) {
//        this.remainingAmount = remainingAmount;
//    }
//
//    public double getAllPaymentAmount() {
//        return allPaymentAmount;
//    }
//
//    public void setAllPaymentAmount(double allPaymentAmount) {
//        this.allPaymentAmount = allPaymentAmount;
//    }
//
//    public double getFullPayment() {
//        return fullPayment;
//    }
//
//    public void setFullPayment(double fullPayment) {
//        this.fullPayment = fullPayment;
//    }
}
