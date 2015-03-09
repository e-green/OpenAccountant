package org.egreen.opensms.server.controller;


//
//import org.egreen.opensms.server.models.AllPaymentDetails;
//import org.egreen.opensms.server.service.ChequeDetailsDAOService;
//import org.egreen.opensms.server.service.CustomerOrderPaymentDAOService;
//import org.egreen.opensms.server.service.GsrPaymentDAOService;
//import net.sf.dynamicreports.adhoc.AdhocManager;
//import net.sf.dynamicreports.adhoc.configuration.AdhocColumn;
//import net.sf.dynamicreports.adhoc.configuration.AdhocConfiguration;
//import net.sf.dynamicreports.adhoc.configuration.AdhocReport;
//import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
//import net.sf.dynamicreports.report.datasource.DRDataSource;
//import net.sf.dynamicreports.report.exception.DRException;
//import net.sf.jasperreports.engine.JRDataSource;


import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRTableModelDataSource;
import org.apache.commons.io.IOUtils;
import org.egreen.opensms.server.entity.CustomerOrder;
import org.egreen.opensms.server.entity.CustomerOrderHasItem;
import org.egreen.opensms.server.models.AllPaymentAmounts;
import org.egreen.opensms.server.service.CustomerOrderDAOService;
import org.egreen.opensms.server.service.CustomerOrderHasItemDAOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Pramoda Fernando on 11/27/2014.
 // */
@Controller
@RequestMapping("mintbooks/v1/reports")
public class ReportController {

    @Autowired
    private CustomerOrderDAOService customerOrderDAOService;

    @Autowired
    private CustomerOrderHasItemDAOService customerOrderHasItemDAOService;


    /**
     *
     * Download Customer Order Invoice
     * (GET)
     *
     * @author Pramoda Nadeeshan Fernando
     * @version 1.0
     * @since 2015-02-16 12.26PM
     *
     * @param session
     * @param response
     * @param customerOrderId
     */
    @RequestMapping(value = "customer_invoice", method = RequestMethod.GET)
    public void report(HttpSession session, HttpServletResponse response,@RequestParam("customerOrderId")Long customerOrderId) {
        Map<String, Object> map = new HashMap<String, Object>();

        CustomerOrder customerOrder = customerOrderDAOService.readCustomerOrderByOrderId(customerOrderId);
        map.put("customer_name", customerOrder.getCustomerName());
        map.put("order_due_date", customerOrder.getOrderDueDate()+"");
        map.put("order_value", customerOrder.getAmount()+"");
        map.put("order_date", customerOrder.getInvoiceDate()+"");

        DefaultTableModel model = new DefaultTableModel();
        JTable table = new JTable(model);

        model.addColumn("product");
        model.addColumn("description");
        model.addColumn("quantity");
        model.addColumn("rate");
        model.addColumn("amount");

        List<CustomerOrderHasItem> customerOrderDetails = customerOrderHasItemDAOService.getAlOrderDetailsByOrderId(customerOrderId);
        for(CustomerOrderHasItem customerOrderHasItem:customerOrderDetails) {
            model.addRow(new Object[]{customerOrderHasItem.getItemName(),customerOrderHasItem.getDescription(),customerOrderHasItem.getQuentity()+"",customerOrderHasItem.getRate()+"", customerOrderHasItem.getAmount()+""});
        }

        JRTableModelDataSource ds = new JRTableModelDataSource(model);
        try {
            JasperReport jr = JasperCompileManager.compileReport("D:/E-Green Projects/MintBooks/mint_books/PaymentComponent/src/main/resources/Invoice.jrxml");
            JasperPrint jp = JasperFillManager.fillReport(jr, map,ds);
            // JasperViewer.viewReport(jp, false);
            File pdf = File.createTempFile("output.", ".pdf");
            JasperExportManager.exportReportToPdfStream(jp, new FileOutputStream(pdf));
            try {
                InputStream inputStream = new FileInputStream(pdf);
                response.setContentType("application/pdf");
                response.setHeader("Content-Disposition", "attachment; filename="+customerOrder.getCustomerName()+".pdf");
                IOUtils.copy(inputStream, response.getOutputStream());
                response.flushBuffer();
                inputStream.close();
            } catch (Exception e) {

                e.printStackTrace();
            }
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
}

