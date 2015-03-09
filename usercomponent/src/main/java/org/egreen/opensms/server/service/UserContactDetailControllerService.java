package org.egreen.opensms.server.service;


import org.egreen.opensms.server.dao.UserContactDetailsDAOController;
import org.egreen.opensms.server.entity.UserContactDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * Created by dewmal on 7/17/14.
 */
@Service
public class UserContactDetailControllerService {

    @Autowired
    private UserContactDetailsDAOController userContactDetailsDAOController;

    /**
     * Save Contact Detail
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @param contactDetail
     * @return
     */
    public Long saveContactDetails(UserContactDetail contactDetail) {
        long userId = new Date().getTime();
        contactDetail.setUserId(userId);


        return userContactDetailsDAOController.create(contactDetail);
    }

    /**
     * Get user contact details
     *
     * @param userid
     * @return
     */
    public UserContactDetail getContactDetails(Long userid) {
        return userContactDetailsDAOController.read(userid);
    }


    /**
     *
     * Get User By City
     *
     * @param city
     * @return
     */
    public List<UserContactDetail> getCustomersbyCity(String city) {

        List<UserContactDetail> userByCity = userContactDetailsDAOController.getUserByCity(city);

        return userByCity;

    }

    public List<UserContactDetail> searchAllDetails(Integer limit,Integer offset) {
        return userContactDetailsDAOController.getAll(offset,limit,"userId");
    }


    public Long getRowCount() {
        return userContactDetailsDAOController.getAllCount();
    }

    public void updateContactDetails(UserContactDetail userContactDetail) {
        userContactDetailsDAOController.update(userContactDetail);
    }

    public UserContactDetail searchAllDetailsByUserId(Long userId) {
        return userContactDetailsDAOController.read(userId);
    }

    /**
     * Search All Customer
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    public List<UserContactDetail> searchAllContactDetails() {
        return userContactDetailsDAOController.getAll();
    }

    /**
     * Search All Sort By Customer Name
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    public List<UserContactDetail> search_all_sortByCustomerName() {
        return userContactDetailsDAOController.search_all_sortByCustomerName();

    }

    /**
     * Search All Sort By CustomerOrder Value
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     *
     * @return
     */
    public List<UserContactDetail> search_all_sortByCustomerOrderValue() {

        return userContactDetailsDAOController.search_all_sortByCustomerOrderValue();
    }

    public List<UserContactDetail> testing_search_all() {
        return userContactDetailsDAOController.testing_search_all();
    }
}
