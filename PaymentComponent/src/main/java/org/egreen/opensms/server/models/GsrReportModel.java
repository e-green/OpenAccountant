package org.egreen.opensms.server.models;

import org.egreen.opensms.server.entity.ChequeDetails;


/**
 * Created by chethiya on 11/7/2014.
 */
public class GsrReportModel {
    private ChequeDetails chequeDetails;
    private String customerName;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public ChequeDetails getChequeDetails() {
        return chequeDetails;
    }

    public void setChequeDetails(ChequeDetails chequeDetails) {
        this.chequeDetails = chequeDetails;
    }
}
