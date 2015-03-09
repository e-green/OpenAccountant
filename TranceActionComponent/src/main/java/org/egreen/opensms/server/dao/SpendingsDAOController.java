package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Spendings;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.model.SpendingsByCartegoryModel;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Pramoda Fernando on 2/16/2015.
 */
public interface SpendingsDAOController  extends DAOController<Spendings,Long> {
    List<IncomeSpendingsModel> searchYearSpendings(String year);

    BigDecimal searchAllSpendingAmount();

    List<Spendings> searchSpendingsByDateRange(String firstDate, String secondDate);

    int removeSpendingss(Long spendingsId);

    List<SpendingsByCartegoryModel> searchSpendingsByCategory();

}
