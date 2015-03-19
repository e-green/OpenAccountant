/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */
function ReportController($scope, incomeService, homeService) {

    $scope.labels_income = [];
    $scope.data_income = [];

    $scope.labels1 = [];
    $scope.data1 = [];

    $scope.labels_income = ["Cheque Payments", "Cash Payments"];
    $scope.data_income = [];

    incomeService.getCashAndChequeamounts().then(function (data) {
        $scope.data_income = [data.data.chequeAmount , data.data.cashAmount];
    });

    incomeService.getChartDateForComparison(new Date().getFullYear()).then(function (data) {
        $scope.data = [
            data.data.incomeList,
            data.data.spendingList
        ];
    });

//    --------------------income and spending chart-------------------------
    $scope.data = [];

    $scope.getchartData = function () {
        var date = $scope.report.year;
        incomeService.getChartDateForComparison(date).then(function (data) {

            $scope.data = [
                data.data.incomeList,
                data.data.spendingList
            ];
        });
    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" , "December"];
    $scope.series = ['Income', 'Expense'];

//    ---------------------Spending chart------------------------------
    homeService.getSpendingCategory().then(function (data) {
        console.log(data);
        $scope.labels1 = data.data.categoryNameList;
        $scope.data1 = data.data.amountList;
    });
}