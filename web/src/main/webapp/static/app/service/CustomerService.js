/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('customerService', function ($http) {

    var customerService = {
        /**
         * Get all roles from server
         *
         * @returns {*}
         */

        save: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.customer + '/save'}).then(function (response) {
                return response.data;
            });

        }, all: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/search_all_customer'}).then(function (response) {
                return response.data;
            });
        }, remove: function (id) {

            return $http({
                method: "POST",
                headers: headers,
                url: host.Incomes + '/removeIncomes?IncomeId=' + id}).then(function (response) {
                return response.data;
            });
        }, getIncomeByDate: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Incomes + '/searchIncomeByDateRange?firstDate=' + data.fromDate + '&secondDate=' + data.toDate}).then(function (response) {
                return response.data;
            });
        }, getCustomerOrderValues: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer_payment + '/searchAllAmountsModel'}).then(function (response) {
                return response.data;
            });
        }, sortCustomerByName: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/search_all_sortByCustomerName'}).then(function (response) {
                return response.data;
            });
        }, sortCustomerByValue: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/search_all_sortByCustomerOrderValue'}).then(function (response) {
                return response.data;
            });
        }
    };
    return customerService;
});