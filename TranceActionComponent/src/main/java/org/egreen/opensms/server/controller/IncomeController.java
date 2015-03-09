package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.Income;
import org.egreen.opensms.server.model.CashChequeAmountModel;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.service.IncomeDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Controller
@RequestMapping("mintbooks/v1/Incomes/")
public class IncomeController {

    @Autowired
    private IncomeDAOService incomeDAOService;

    /**
     * Save Incomes
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param income
     * @return
     *
     */
    @RequestMapping(value = "save", method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addIncome(@RequestBody Income income) {
        Long res = incomeDAOService.saveIncome(income);
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
     * Search All Incomes
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     *
     */
    @RequestMapping(value = "searchAllIncomes", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllIncomes() {
        List<Income> res = incomeDAOService.searchAllIncomes();
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
     * Search Year Income
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @return
     *
     */
    @RequestMapping(value = "searchYearIncome", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchYearIncome(@RequestParam("year") String year) {
        List<IncomeSpendingsModel> incomeSpendingsModel = incomeDAOService.searchYearIncome(year);

        Map<String, Double> amountList = new HashMap<String, Double>();
        for (int i = 1; i < 13; i++) {
            amountList.put(i + "", (double) 0);
        }

        for (int i = 0; i < incomeSpendingsModel.size(); i++) {
            IncomeSpendingsModel item = incomeSpendingsModel.get(i);
            amountList.put(item.getMonth() + "", item.getAmount());
        }
        ResponseMessage responseMessage;
        if (amountList != null) {
            responseMessage = ResponseMessage.SUCCESS;

            Object[] objects = new Object[amountList.size()];
            for (int i = 1; i <= objects.length; i++) {
                objects[i-1] = amountList.get(i+"");
            }
            responseMessage.setData(objects);
        } else {
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(amountList);
        }
        return responseMessage;
    }

    /**
     * Search All Income
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 03.22PM
     *
     * @return
     *
     */
    @RequestMapping(value = "searchAllIncome", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllIncome() {
        BigDecimal res = incomeDAOService.searchAllIncome();
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
     * Search Incomes By DateRange
     * When Parameters Empty Get All Incomes
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param firstDate
     * @param secondDate
     * @return
     *
     */
    @RequestMapping(value = "searchIncomeByDateRange", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchIncomeByDateRange(@RequestParam("firstDate") String firstDate, @RequestParam("secondDate") String secondDate) {
        List<Income> res = incomeDAOService.searchIncomeByDateRange(firstDate, secondDate);
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
     * Remove Incomes By Id
     * (POST)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param IncomeId
     * @return
     *
     */
    @RequestMapping(value = "removeIncomes", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMessage removeIncomes(@RequestParam("IncomeId") Long IncomeId) {
        int i = incomeDAOService.removeIncomes(IncomeId);
        ResponseMessage responseMessage = ResponseMessage.SUCCESS;
        responseMessage.setData(i);
        return ResponseMessage.SUCCESS;
    }

    /**
     *
     * Search Cash_Cheque Incomes
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-25 04.25PM
     *
     * @return
     */
    @RequestMapping(value = "searchCash_ChequeIncomes", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchCash_ChequeIncomes() {
        CashChequeAmountModel  res = incomeDAOService.searchCashChequeIncomes();
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
     * Get Income Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-25 04.25PM
     * @return
     */
    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public Income ob() {
        return new Income();
    }
}
