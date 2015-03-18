var module = angular.module('cloud_accounting', ['ngRoute', 'chart.js']);


module.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'app/template/home/Home.html',
            controller: ''
        }).when('/income', {
            templateUrl: 'app/template/income/Income.html',
            controller: ''
        }).when('/spending', {
            templateUrl: 'app/template/spendings/Spending.html',
            controller: ''
        }).when('/customer', {
            templateUrl: 'app/template/customer/Customer.html',
            controller: ''
        }).when('/invoice/:customer_id', {
            templateUrl: 'app/template/invoice/Invoice.html',
            controller: ''
        }).when('/report', {
            templateUrl: 'app/template/reports/Report.html',
            controller: ''
        }).when('/payment', {
            templateUrl: 'app/template/payments/Payment.html',
            controller: ''
        }).when('/inventory', {
            templateUrl: 'app/template/inventry/Inventry.html',
            controller: ''
        }).otherwise({
            redirectTo: '/'
        });
});

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
