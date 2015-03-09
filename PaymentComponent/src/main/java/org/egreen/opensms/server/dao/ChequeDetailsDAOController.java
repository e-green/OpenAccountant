package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.ChequeDetails;

import java.util.List;

/**
 * Created by chethiya on 11/3/2014.
 */
public interface ChequeDetailsDAOController extends DAOController<ChequeDetails,Integer>{
    List<ChequeDetails> getAllGsrOrderDetails();

    List<ChequeDetails> getChequeDetailsByOrderId(Long orderId);
}
