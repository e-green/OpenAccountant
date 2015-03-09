package org.egreen.opensms.server.models;

import org.egreen.opensms.server.entity.UserContactDetail;

/**
* Created by Pramoda Fernando on 10/9/2014.
*/
public class UserDetailModel{

    private UserContactDetail userContactDetail;
    private double orderAmount;


    public UserContactDetail getUserContactDetail() {
        return userContactDetail;
    }

    public void setUserContactDetail(UserContactDetail userContactDetail) {
        this.userContactDetail = userContactDetail;
    }

    public double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(double orderAmount) {
        this.orderAmount = orderAmount;
    }
}


