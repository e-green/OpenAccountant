/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('expenseService', function ($http) {

    var expenseService = {
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
                url: host.Spendings + '/save'}).then(function (response) {
                return response.data;
            });

        }, all: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Spendings + '/searchAllSpendings'}).then(function (response) {
                return response.data;
            });
        }, remove: function (id) {

            return $http({
                method: "POST",
                headers: headers,
                url: host.Spendings + '/removeSpendings?spendingsId=' + id}).then(function (response) {
                return response.data;
            });
        }, getSpendingByDate: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Spendings + '/searchSpendingsByDateRange?firstDate=' + data.fromDate + '&secondDate=' + data.toDate}).then(function (response) {
                return response.data;
            });
        }, getBasicChartData: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Spendings + '/searchYearSpendings?year=' + data}).then(function (response) {
                return response.data;
            });
        }
    };
    return expenseService;
});