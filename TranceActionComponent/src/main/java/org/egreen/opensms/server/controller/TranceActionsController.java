package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.Income;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.model.Income_SpendingArrayModel;
import org.egreen.opensms.server.model.NetProfit;
import org.egreen.opensms.server.service.IncomeDAOService;
import org.egreen.opensms.server.service.SpendingsDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pramoda Fernando on 2/24/2015.
 */

@Controller
@RequestMapping("mintbooks/v1/TranceActions/")
public class TranceActionsController {


    @Autowired
    private IncomeDAOService incomeDAOService;

    @Autowired
    private SpendingsDAOService spendingsDAOService;

    /**
     * Search All TranceActions
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-25 04.25PM
     *
     * @return
     */
    @RequestMapping(value = "searchAllTranceActions", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllIncomes() {
        BigDecimal totalIncome = incomeDAOService.searchAllIncome();
        BigDecimal totalSpendings = spendingsDAOService.searchAllSpendingAmount();
        double netProfit = totalIncome.doubleValue() - totalSpendings.doubleValue();
        NetProfit res = new NetProfit();
        res.setIncome(totalIncome.doubleValue());
        res.setSpendings(totalSpendings.doubleValue());
        res.setProfit(netProfit);
        ResponseMessage responseMessage;
        if (res != null) {
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        } else {
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

    /**
     *
     *
     * Search Income Spendings
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-25 04.25PM
     *
     *
     * @param year
     * @return
     */
    @RequestMapping(value = "searchIncome_Spendings", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchIncome_Spendings(@RequestParam("year")String year) {
        List<IncomeSpendingsModel> incomeSpendingsModel = incomeDAOService.searchYearIncome(year);
        Map<String, Double> amountList = new HashMap<String, Double>();
        for (int i = 1; i < 13; i++) {
            amountList.put(i + "", (double) 0);
        }

        for (int i = 0; i < incomeSpendingsModel.size(); i++) {
            IncomeSpendingsModel item = incomeSpendingsModel.get(i);
            amountList.put(item.getMonth() + "", item.getAmount());
        }

        Object[] incomeOb = new Object[amountList.size()];
        for (int i = 1; i <= incomeOb.length; i++) {
            incomeOb[i-1] = amountList.get(i+"");
        }

        List<IncomeSpendingsModel> incomeSpendingsModelSpending = spendingsDAOService.searchYearSpendings(year);
        Map<String, Double> amountSpList = new HashMap<String, Double>();
        for (int i = 1; i < 13; i++) {
            amountSpList.put(i + "", (double) 0);
        }
        for (int i = 0; i < incomeSpendingsModelSpending.size(); i++) {
            IncomeSpendingsModel item = incomeSpendingsModelSpending.get(i);
            amountSpList.put(item.getMonth() + "", item.getAmount());
        }
        Object[] spendingOb = new Object[amountSpList.size()];
        for (int i = 1; i <= spendingOb.length; i++) {
            spendingOb[i-1] = amountSpList.get(i+"");
        }

        Income_SpendingArrayModel res = new Income_SpendingArrayModel();
        res.setIncomeList(incomeOb);
        res.setSpendingList(spendingOb);

        ResponseMessage responseMessage;
        if (res != null) {
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        } else {
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

}
