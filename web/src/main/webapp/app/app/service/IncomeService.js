/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('incomeService', function ($http) {

    var incomeService = {
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
                url: host.Incomes + '/save'}).then(function (response) {
                return response.data;
            });

        }, saveWithCheque: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.cheque_details + '/save'}).then(function (response) {
                return response.data;
            });

        }, all: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Incomes + '/searchAllIncomes'}).then(function (response) {
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
        }, getBasicChartData: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Incomes + '/searchYearIncome?year=' + data}).then(function (response) {
                return response.data;
            });
        }, searchAmounts: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.TranceActions + '/searchAllTranceActions'}).then(function (response) {
                return response.data;
            });
        }, getChartDateForComparison: function (data) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.TranceActions + '/searchIncome_Spendings?year=' + data}).then(function (response) {
                return response.data;
            });
        }, getCashAndChequeamounts: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Incomes + '/searchCash_ChequeIncomes'}).then(function (response) {
                return response.data;
            });
        }
    };
    return incomeService;
});