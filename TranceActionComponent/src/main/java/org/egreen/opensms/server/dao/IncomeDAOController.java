package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Income;
import org.egreen.opensms.server.model.CashChequeAmountModel;
import org.egreen.opensms.server.model.IncomeSpendingsModel;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */
public interface IncomeDAOController extends DAOController<Income,Long> {
    List<IncomeSpendingsModel>  searchYearIncome(String year);

    List<Income> searchIncomeByDateRange(String firstDate, String secondDate);

    int removeIncomes(Long IncomeId);

    BigDecimal searchAllIncome();

    List<Income> getAllIncomes();

    CashChequeAmountModel  searchCashChequeIncomes();

}
