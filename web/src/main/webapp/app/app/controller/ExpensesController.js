/**
 * Created by ChanakaDeSilva on 2/15/2015.
 */
function ExpensesController($scope, expenseService, incomeService) {

    $scope.allSpendings = [];

    $scope.addExpenseView = false;

    var spend_id = "";

    $scope.expense = {
        date: '',
        spendingsName: '',
        category: '',
        amount: ''
    };

    $scope.errors = [];
    $scope.data = [];
    $scope.totalExpenses = "";

    getSpendingAmount();
    getSpendings();
    getChartData();

    function getSpendingAmount() {
        incomeService.searchAmounts().then(function (data) {
            $scope.totalExpenses = data.data.spendings;
        });
    }

    $scope.addExpense = function () {
        $scope.addExpenseView = true;
    };
    $scope.hideExpense = function () {
        $scope.addExpenseView = false;
    };

    function getSpendings() {
        expenseService.all().then(function (data) {
            console.log(data);
            $scope.allSpendings = data.data;
        });
    }

    $scope.saveExpense = function () {

        $scope.errors = [];

        if ($scope.expense.date === '') {
            $scope.errors.push("Enter Income Date");
            toast('Enter Transaction Date', 3000, 'rounded');
        }

        if ($scope.expense.spendingsName === '') {
            $scope.errors.push("Enter Income Name");
            toast('Enter Transaction Name', 3000, 'rounded');
        }

        if ($scope.expense.category === '') {
            $scope.errors.push("Enter Income Type");
            toast('Select Payment Category', 3000, 'rounded');
        }

        if ($scope.expense.amount === '') {
            $scope.errors.push("Enter Income Amount");
            toast('Enter Transaction Amount', 3000, 'rounded');
        }

        if ($scope.errors.length > 0) {
            return;
        }

        var expense = $scope.expense;
        console.log(expense);
        expenseService.save(expense).then(function (data) {
            console.log(data);

            $scope.expense = {
                date: '',
                spendingsName: '',
                category: '',
                amount: ''
            };

            getSpendings();
            getChartData();
            getSpendingAmount();
        });
    };

    //    Get confirm Modal
    $scope.getModal = function (id, name) {
        spend_id = id;
        console.log(name);
        $('#confirmModal').modal('show');
    };

    //    Do modal action
    $scope.confirmAction = function () {
        console.log("Do Action Activated ");
        expenseService.remove(spend_id).then(function (data) {
            console.log(data);
            getSpendings();
            getChartData();
            getSpendingAmount();
        });
    };

    //    Search Spending By Date

    $scope.searchSpending = function () {
        var dates = $scope.spending;
        console.log(dates);
        expenseService.getSpendingByDate(dates).then(function (data) {
            console.log(data);
            $scope.allSpendings = data.data;
            console.log(data.data);
        });
    };

//    Add reset all method
    $scope.resetAll = function () {
        getSpendings();
        $scope.spending = {};
    };

//    End of reset all method

//    End of Search Income

    function getChartData() {
//    Getting data
        expenseService.getBasicChartData(new Date().getFullYear()).then(function (data) {
            console.log("Printing all the chart data values");
            $scope.data = [data.data];
            console.log($scope.data);
        });
    }

    //    Adding Chart Instance
    $scope.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    $scope.series = ['Series A'];


//  End of Adding Chart Instance
}