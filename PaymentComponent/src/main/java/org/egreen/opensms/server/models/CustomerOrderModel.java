package org.egreen.opensms.server.models;

/**
 * Created by Pramoda Fernando on 2/24/2015.
 */
public class CustomerOrderModel {
    private double totalCustomerOrderAmount;
    private double receivedCustomerOrderAmount;
    private double pendingCustomerOrderAmount;


    public double getTotalCustomerOrderAmount() {
        return totalCustomerOrderAmount;
    }

    public void setTotalCustomerOrderAmount(double totalCustomerOrderAmount) {
        this.totalCustomerOrderAmount = totalCustomerOrderAmount;
    }

    public double getReceivedCustomerOrderAmount() {
        return receivedCustomerOrderAmount;
    }

    public void setReceivedCustomerOrderAmount(double receivedCustomerOrderAmount) {
        this.receivedCustomerOrderAmount = receivedCustomerOrderAmount;
    }

    public double getPendingCustomerOrderAmount() {
        return pendingCustomerOrderAmount;
    }

    public void setPendingCustomerOrderAmount(double pendingCustomerOrderAmount) {
        this.pendingCustomerOrderAmount = pendingCustomerOrderAmount;
    }
}
