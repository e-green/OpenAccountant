var module = angular.module('cloud_accounting', ['ngRoute', 'chart.js']);


module.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'static/app/template/home/Home.html',
            controller: ''
        }).when('/income', {
            templateUrl: 'static/app/template/income/Income.html',
            controller: ''
        }).when('/spending', {
            templateUrl: 'static/app/template/spendings/Spending.html',
            controller: ''
        }).when('/customer', {
            templateUrl: 'static/app/template/customer/Customer.html',
            controller: ''
        }).when('/invoice/:customer_id', {
            templateUrl: 'static/app/template/invoice/Invoice.html',
            controller: ''
        }).when('/report', {
            templateUrl: 'static/app/template/reports/Report.html',
            controller: ''
        }).when('/payment', {
            templateUrl: 'static/app/template/payments/Payment.html',
            controller: ''
        }).when('/inventory', {
            templateUrl: 'static/app/template/inventry/Inventry.html',
            controller: ''
        }).otherwise({
            redirectTo: '/'
        });
});

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
