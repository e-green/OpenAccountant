package org.egreen.opensms.server.dao;


import org.egreen.opensms.server.entity.UserContactDetail;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by dewmal on 7/17/14.
 */
public interface UserContactDetailsDAOController extends DAOController<UserContactDetail, Long> {


    /**
     * Search users by search query
     *
     * @param searchQuery
     * @return
     */
    List<UserContactDetail> findUsers(String searchQuery);


    List<UserContactDetail> getUserByCity(String city);

    List<UserContactDetail> getAllCustomerbyName(String custName);


    List<UserContactDetail> search_all_sortByCustomerName();

    List<UserContactDetail> search_all_sortByCustomerOrderValue();

    List<UserContactDetail> testing_search_all();

}
