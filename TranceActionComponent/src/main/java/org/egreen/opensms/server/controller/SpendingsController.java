package org.egreen.opensms.server.controller;

import org.egreen.opensms.server.entity.Spendings;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.model.SpendingsByCartegoryModel;
import org.egreen.opensms.server.model.SpendingsByCategoryListModel;
import org.egreen.opensms.server.service.SpendingsDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pramoda Fernando on 2/16/2015.
 */

@Controller
@RequestMapping("mintbooks/v1/Spendings/")
public class SpendingsController {

    @Autowired
    private SpendingsDAOService spendingsDAOService;

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
    @RequestMapping(value = "save",method = RequestMethod.POST, headers = "Accept=application/json")
    @ResponseBody
    public ResponseMessage addSpendings(@RequestBody Spendings spendings) {
        Long res = spendingsDAOService.saveSpendings(spendings);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "searchAllSpendings", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage searchAllSpendings() {
        List<Spendings> res = spendingsDAOService.searchAllSpendings();
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "searchYearSpendings", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage  searchYearSpendings(@RequestParam("year")String year) {
        List<IncomeSpendingsModel> incomeSpendingsModel = spendingsDAOService.searchYearSpendings(year);
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
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(objects);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(amountList);
        }
        return responseMessage;
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
    @RequestMapping(value = "searchAllSpendingAmount", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage  searchAllSpendingAmount() {
        BigDecimal res = spendingsDAOService.searchAllSpendingAmount();
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "searchSpendingsByDateRange",method = RequestMethod.GET)
    @ResponseBody
    public  ResponseMessage searchSpendingsByDateRange(@RequestParam("firstDate") String firstDate,@RequestParam("secondDate") String secondDate) {
        List<Spendings> res =  spendingsDAOService.searchSpendingsByDateRange(firstDate,secondDate);
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "removeSpendings", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMessage removeSpendingss(@RequestParam("spendingsId")Long spendingsId) {
        int i = spendingsDAOService.removeSpendingss(spendingsId);
        ResponseMessage responseMessage = ResponseMessage.SUCCESS;
        responseMessage.setData(i);
        return ResponseMessage.SUCCESS;
    }

    /**
     *
     * Search Spendings By Category
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-25 04.10PM
     * @version 1.0
     *
     *
     * @return
     */
    @RequestMapping(value = "searchSpendingsByCategory", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage  searchSpendingsByCategory() {
        List<SpendingsByCartegoryModel> res = spendingsDAOService.searchSpendingsByCategory();
        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
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
    @RequestMapping(value = "searchSpendingsByCategoryInList", method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage  searchSpendingsByCategoryinList() {
        List<SpendingsByCartegoryModel> ob = spendingsDAOService.searchSpendingsByCategory();
        List<String>categoryNameList = new ArrayList<String>();
        List<Double>amountList =  new ArrayList<Double>();

        for (SpendingsByCartegoryModel cartegoryModel : ob) {
            categoryNameList.add(cartegoryModel.getCategoryName());
            amountList.add(cartegoryModel.getAmount());
        }

        SpendingsByCategoryListModel res = new SpendingsByCategoryListModel();
        res.setCategoryNameList(categoryNameList);
        res.setAmountList(amountList);


        ResponseMessage responseMessage;
        if(res != null){
            responseMessage = ResponseMessage.SUCCESS;
            responseMessage.setData(res);
        }else{
            responseMessage = ResponseMessage.DANGER;
            responseMessage.setData(res);
        }
        return responseMessage;
    }

    /**
     * Get Spendings Object
     *
     * @author Pramoda Nadeeshan Fernando
     * @since 2015-02-25 04.10PM
     * @version 1.0
     *
     * @return
     */
    @RequestMapping(value = "ob", method = RequestMethod.GET)
    @ResponseBody
    public Spendings ob() {
        return new Spendings();
    }

}
