package org.egreen.opensms.server.service;

import org.egreen.opensms.server.dao.IncomeDAOController;
import org.egreen.opensms.server.entity.Income;
import org.egreen.opensms.server.model.CashChequeAmountModel;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Service
public class IncomeDAOService {

    @Autowired
    private IncomeDAOController IncomeDAOController;

    /**
     * Save Income
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @param income
     * @return
     */
    public Long saveIncome(Income income) {
        long incomeId = new Date().getTime();
        income.setIncomeId(incomeId);
        return IncomeDAOController.create(income);
    }

    /**
     * Search All Incomes
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.26PM
     * @version 1.0
     *
     * @return
     */
    public List<Income> searchAllIncomes() {

        return IncomeDAOController.getAllIncomes();
    }

    /**
     * Search Year Income
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 12.26PM
     * @version 1.0
     *
     *
     * @return
     */
    public List<IncomeSpendingsModel>  searchYearIncome(String year) {
        List<IncomeSpendingsModel> incomeSpendingsModels = IncomeDAOController.searchYearIncome(year);
        return incomeSpendingsModels;
    }

    /**
     * Search Incomes By DateRange
     * When Parameters Empty Get All Incomes
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 12.26PM
     * @version 1.0
     *
     * @param firstDate
     * @param secondDate
     * @return
     */
    public List<Income> searchIncomeByDateRange(String firstDate, String secondDate) {
        return IncomeDAOController.searchIncomeByDateRange(firstDate, secondDate);
    }

    /**
     *
     * Remove Incomes By Id
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 12.26PM
     * @version 1.0
     *
     * @param IncomeId
     * @return
     */
    public int removeIncomes(Long IncomeId) {
        return IncomeDAOController.removeIncomes(IncomeId);
    }

    /**
     * Search All Income
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-16 03.22PM
     * @version 1.0
     *
     *
     * @return
     */
    public BigDecimal searchAllIncome() {
        return IncomeDAOController.searchAllIncome();
    }

    public CashChequeAmountModel searchCashChequeIncomes() {
        return IncomeDAOController.searchCashChequeIncomes();

    }
}
