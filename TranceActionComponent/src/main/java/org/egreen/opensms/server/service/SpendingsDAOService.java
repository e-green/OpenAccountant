package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.SpendingsDAOController;
import org.egreen.opensms.server.entity.Spendings;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.model.SpendingsByCartegoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 2/16/2015.
 */

@Service
public class SpendingsDAOService {

    @Autowired
    private SpendingsDAOController spendingsDAOController;

    /**
     * Save Spendings
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     *
     * @param spendings
     * @return
     */
    public Long saveSpendings(Spendings spendings) {
        long spendingsId = new Date().getTime();
        spendings.setSpendingsId(spendingsId);
        return spendingsDAOController.create(spendings);
    }

    /**
     *
     * Search All Spendings
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     *
     * @return
     */
    public List<Spendings> searchAllSpendings() {
        return spendingsDAOController.getAll();
    }

    /**
     *
     * Search Year Spendings
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     *
     * @return
     */
    public List<IncomeSpendingsModel> searchYearSpendings(String year) {
        return spendingsDAOController.searchYearSpendings(year);
    }

    /**
     *
     * Search All Spendings
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     * @return
     */
    public BigDecimal searchAllSpendingAmount() {

        return spendingsDAOController.searchAllSpendingAmount();
    }

    /**
     *
     * Search Spendings By DateRange
     * When Parameters Empty Get All Spendings
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     * @param firstDate
     * @param secondDate
     * @return
     */
    public List<Spendings> searchSpendingsByDateRange(String firstDate, String secondDate) {
        return spendingsDAOController.searchSpendingsByDateRange(firstDate,secondDate);
    }

    /**
     *
     * Remove Spendings
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-17 09.05AM
     * @version 1.0
     *
     * @param spendingsId
     * @return
     */
    public int removeSpendingss(Long spendingsId) {
        return spendingsDAOController.removeSpendingss(spendingsId);
    }

    /**
     *
     *  Search Spendings By Category In List
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-25 04.10PM
     * @version 1.0
     *
     *
     * @return
     */
    public List<SpendingsByCartegoryModel> searchSpendingsByCategory() {
        return  spendingsDAOController.searchSpendingsByCategory();
    }
}
