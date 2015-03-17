/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('paymentService', function ($http) {

    var paymentService = {
        /**
         * Get all roles from server
         *
         * @returns {*}
         */

        savePayment: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.customer_payment + '/save'}).then(function (response) {
                return response.data;
            });

        },
        getTodayCustomerOrders: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_order + '/searchAllTodayCustomerOrder'}).then(function (response) {
                return response.data;
            });

        }, getOrderItems: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_order_has_item + '/getAlOrderDetailsByOrderId?orderId=' + id}).then(function (response) {
                return response.data;
            });
        }, viewInvoicePayment: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_payment + '/searchCustomerPayments?orderId=' + id}).then(function (response) {
                return response.data;
            });
        }, viewInvoicePaymentbyDate: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_order + '/searchCustomerOrderByDateRange?firstDate=' + data.from_date + '&secondDate=' + data.to_date}).then(function (response) {
                return response.data;
            });
        }
    };
    return paymentService;
});