/**
 * Created by ChanakaDeSilva on 2/15/2015.
 */
function IncomeController($scope, $element, incomeService) {

    getInome();
    getChartData();
    getIncomeAmount();

    $scope.income = {
        date: '',
        incomeName: '',
        paymentType: '',
        amount: ''
    };
    $scope.errors = [];

    $scope.addIncomeView = false;
    $scope.allIncomes = [];
    $scope.data = [];
    var income_id = "";
    $scope.showCheque = false;
    $scope.totalIncomeAmount = "";

    function getIncomeAmount() {
        incomeService.searchAmounts().then(function (data) {
            $scope.totalIncomeAmount = data.data.income;
        });
    }

    $scope.addIncome = function () {
        $scope.addIncomeView = true;
    };
    $scope.hideIncome = function () {
        $scope.addIncomeView = false;
    };

//    Get All Incomes for the front chart
    function getInome() {
        incomeService.all().then(function (data) {
            console.log(data);
            $scope.allIncomes = data.data;
            console.log(data.data);
        });
    }

//    Save a income
    $scope.saveIncome = function () {

        if ($scope.income.date === '') {
            $scope.errors.push("Enter Income Date");
            toast('Enter Transaction Date', 3000, 'rounded');
        }

        if ($scope.income.incomeName === '') {
            $scope.errors.push("Enter Income Name");
            toast('Enter Transaction Name', 3000, 'rounded');
        }

        if ($scope.income.paymentType === '') {
            $scope.errors.push("Enter Income Type");
            toast('Select Transaction Type', 3000, 'rounded');
        }

        if ($scope.income.amount === '') {
            $scope.errors.push("Enter Income Amount");
            toast('Enter Transaction Amount', 3000, 'rounded');
        }

        if ($scope.errors.length > 0) {
            return;
        }

        var income = $scope.income;
        console.log(income);
        incomeService.save($scope.income).then(function (data) {
            console.log(data);
            getInome();
            getChartData();
            getIncomeAmount();
        });

        if ($scope.income.paymentType === 'cheque') {

            incomeService.saveWithCheque($scope.income).then(function (data) {
                console.log(data);
                getInome();
                getChartData();
                getIncomeAmount();
            });
        }

        $scope.income = {
            date: '',
            incomeName: '',
            paymentType: '',
            amount: '',
            chequeId: '',
            chequeDate: '',
            chequeBank: '',
            branch: ''
        };

        getInome();
        getChartData();
        getIncomeAmount();

    };

//    Get confirm Modal
    $scope.getModal = function (id, name) {
        income_id = id;
        console.log(name);
        $('#confirmModal').modal('show');
    };

//    Do modal action
    $scope.confirmAction = function () {
        console.log("Do Action Activated ");
        incomeService.remove(income_id).then(function (data) {
            console.log(data);
            getInome();
            getChartData();
            getIncomeAmount();
        });
    };

//    Search Income By Date

    $scope.searchIncome = function () {
        var dates = $scope.income;
        console.log(dates);
        incomeService.getIncomeByDate(dates).then(function (data) {
            console.log(data);
            $scope.allIncomes = data.data;
            console.log(data.data);
        });
    };

//    End of Search Income

//    Reset Search Query
    $scope.resetAll = function () {
        getInome();
        $scope.income = {};
    };
//    End Of reset
    function getChartData() {
//    Getting data
        incomeService.getBasicChartData(new Date().getFullYear()).then(function (data) {
            console.log("Printing all the chart data values");
            $scope.data = [data.data];
            console.log($scope.data);
        });
    }

//    Adding Chart Instance
    $scope.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    $scope.series = ['Income'];

//    $scope.data = [
//        [65000, 154000, 95000, 78541, 45985, 78459, 65000, 45000, 78000, 35000, 99000, 45698]
//    ];
//  End of Adding Chart Instance

//    Checking Form Validation
    var registrationForm = $($element);

    $scope.isInvalid = function () {
        return registrationForm.form('validate form');
    };

    $scope.register = function () {
        if (this.isInvalid()) {
            alert("No Validate");
            return;
        }
        alert("Register was clicked!");
    };
//  End of Form Validation


//    Get Selected Option
    $scope.getSelectedType = function () {
        var value = $scope.income.paymentType;
        console.log(value);
        if (value === "cheque") {
//            $('#chequeModal').modal('show');
            $scope.showCheque = true;
        } else {
            $scope.showCheque = false;
        }
    };

}