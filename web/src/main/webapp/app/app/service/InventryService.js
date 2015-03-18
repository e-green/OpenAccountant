/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */

module.factory('inventryService', function ($http) {

    var inventryService = {
        /**
         * Get all roles from server
         *
         * @returns {*}
         */

        saveCategory: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.category + '/save'}).then(function (response) {
                return response.data;
            });

        }, saveSupplier: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.supplier + '/save'}).then(function (response) {
                return response.data;
            });
        }, saveBrand: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.brand + '/save'}).then(function (response) {
                return response.data;
            });
        }, saveItemService: function (data) {

            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.item + '/save'}).then(function (response) {
                return response.data;
            });

        }, getCategory: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.category + '/search_all'}).then(function (response) {
                return response.data;
            });
        }, getSupplier: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.supplier + '/search'}).then(function (response) {
                return response.data;
            });
        }, getBrand: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.brand + '/search'}).then(function (response) {
                return response.data;
            });
        }, getItem: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.item + '/searchItemModel'}).then(function (response) {
                return response.data;
            });
        }, getInventoryValue: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.item + '/searchStockAmount'}).then(function (response) {
                return response.data;
            });
        }, searchInventory: function (id) {

            return $http({
                method: "GET",
                headers: headers,
                url: host.item + '/searchItemModelByItemQty?qty=' + id}).then(function (response) {
                return response.data;
            });
        }, getItemsforview: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.item + '/search_all'}).then(function (response) {
                return response.data;
            });
        }
    };
    return inventryService;
});