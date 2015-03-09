package org.egreen.opensms.server.models;

import java.math.BigDecimal;

/**
 * Created by Pramoda Fernando on 10/23/2014.
 */
public class PaymentModel {

    private Long grnOrderId;
    private BigDecimal paidAmount;
    private BigDecimal totolAmount;
    private BigDecimal remainigAmount;

    public Long getGrnOrderId() {
        return grnOrderId;
    }

    public void setGrnOrderId(Long grnOrderId) {
        this.grnOrderId = grnOrderId;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BigDecimal getTotolAmount() {
        return totolAmount;
    }

    public void setTotolAmount(BigDecimal totolAmount) {
        this.totolAmount = totolAmount;
    }

    public BigDecimal getRemainigAmount() {
        return remainigAmount;
    }

    public void setRemainigAmount(BigDecimal remainigAmount) {
        this.remainigAmount = remainigAmount;
    }
}
