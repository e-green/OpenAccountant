package org.egreen.opensms.server.models;


import org.egreen.opensms.server.entity.ChequeDetails;
import org.egreen.opensms.server.entity.CustomerOrderPayment;

import java.util.List;

/**
 * Created by Pramoda Fernando on 11/27/2014.
 */
public class AllPaymentDetails {

    private List<CustomerOrderPayment>customerOrderPayments;
    private List<ChequeDetails>chequeReport;
    private double full_cash_amount;
    private double full_cheque_amount;

    public List<CustomerOrderPayment> getCustomerOrderPayments() {
        return customerOrderPayments;
    }

    public void setCustomerOrderPayments(List<CustomerOrderPayment> customerOrderPayments) {
        this.customerOrderPayments = customerOrderPayments;
    }

    public List<ChequeDetails> getChequeReport() {
        return chequeReport;
    }

    public void setChequeReport(List<ChequeDetails> chequeReport) {
        this.chequeReport = chequeReport;
    }


    public double getFull_cash_amount() {
        return full_cash_amount;
    }

    public void setFull_cash_amount(double full_cash_amount) {
        this.full_cash_amount = full_cash_amount;
    }

    public double getFull_cheque_amount() {
        return full_cheque_amount;
    }

    public void setFull_cheque_amount(double full_cheque_amount) {
        this.full_cheque_amount = full_cheque_amount;
    }
}
