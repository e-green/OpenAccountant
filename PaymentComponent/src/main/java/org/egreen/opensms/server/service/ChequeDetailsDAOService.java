package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.ChequeDetailsDAOController;
import org.egreen.opensms.server.dao.CustomerOrderDAOController;

import org.egreen.opensms.server.entity.ChequeDetails;
import org.egreen.opensms.server.entity.CustomerOrder;

import org.egreen.opensms.server.models.GsrReportModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by chethiya on 11/3/2014.
 */
@Service
public class ChequeDetailsDAOService {

    @Autowired
    private ChequeDetailsDAOController chequeDetailsDAOController;

    @Autowired
    private CustomerOrderDAOController customerOrderDAOController;


    /**
     *
     * Save Cheque Details
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param chequeDetails
     * @return
     */
    public boolean saveChequeDetails(ChequeDetails chequeDetails) {

//        CustomerOrder read = customerOrderDAOController.read(chequeDetails.getOrderId());
//        if (read.getTotal()>0) {
//            int orderAmount = read.getTotal();
//            BigDecimal paymentAmount = chequeDetails.getAmount();
//            int i = orderAmount - paymentAmount.intValue();
//            if(i>0) {
//                read.setTotal(i);
//                customerOrderDAOController.update(read);
//            }else{
//                read.setTotal(0);
//                customerOrderDAOController.update(read);
//            }
//        }
        chequeDetails.setAproveStatus(false);
      //  chequeDetails.setDate(new Timestamp(new Date().getTime()));
        chequeDetailsDAOController.create(chequeDetails);
        return true;
    }

    /**
     *
     * Update Cheque Details
     *
     * @param chequeDetails
     * @return
     */
//    public boolean updateChequeDetails(ChequeDetails chequeDetails) {
//        chequeDetailsDAOController.update(chequeDetails);
//        return true;
//    }

    /**
     *
     * Search Cheque Details
     *
     * @return
     */
    public List<ChequeDetails> searchChequeDetails() {
        return chequeDetailsDAOController.getAllGsrOrderDetails();
    }

    /**
     *
     * Get Gsr Cheque Details
     *
     * @return
     */
    public List<ChequeDetails> getGsrChequeDetails() {
        List<ChequeDetails>list = chequeDetailsDAOController.getAllGsrOrderDetails();
        return list;
    }

    public List<ChequeDetails> searchChequeDetailsByOrderId(Long orderId) {
        return chequeDetailsDAOController.getChequeDetailsByOrderId(orderId);
    }


}
