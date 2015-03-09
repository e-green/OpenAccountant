/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('homeService', function ($http) {

    var homeService = {
        /**
         * Get all roles from server
         *
         * @returns {*}
         */

        getIncomeAndSpendingAndProfit: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.TranceActions + '/searchAllTranceActions'}).then(function (response) {
                return response.data;
            });

        }, getSpendingCategory: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Spendings + '/searchSpendingsByCategoryInList'}).then(function (response) {
                return response.data;
            });
        }, getSpendingCategoryList: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.Spendings + '/searchSpendingsByCategory'}).then(function (response) {
                return response.data;
            });
        }
    };
    return homeService;
});