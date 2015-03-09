/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('invoiceService', function ($http) {

    var invoiceService = {
        /**
         * Get all roles from server
         *
         * @returns {*}
         */

        saveInvoice: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.customer_order + '/save'}).then(function (response) {
                return response.data;
            });

        },
        saveInvoicehasItem: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.customer_order_has_item + '/save'}).then(function (response) {
                return response.data;
            });

        }, getCustomerInfo: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/search_customerById?userID=' + id}).then(function (response) {
                return response.data;
            });
        }, getOrderItems: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_order_has_item + '/getAlOrderDetailsByOrderId?orderId=' + id}).then(function (response) {
                return response.data;
            });
        }, removeOrderItem: function (id) {

            return $http({
                method: "POST",
                headers: headers,
                url: host.customer_order_has_item + '/removeCustomerOrderHasItem?orderId=' + id}).then(function (response) {
                return response.data;
            });
        }, updateOrder: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                url: host.customer_order + '/updateAmountById?orderId=' + data.order_id + '&amount=' + data.amount}).then(function (response) {
                return response.data;
            });
        }, getPDF: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.reports + '/customer_invoice?customerOrderId=' + id}).then(function (response) {
                return response.data;
            });
        }
    };
    return invoiceService;
});