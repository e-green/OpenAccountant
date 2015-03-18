/**
 * Created by ChanakaDeSilva on 2/15/2015.
 */
function HomeController($scope, homeService) {

//    First Chart
    $scope.labels = ["INCOME", "EXPENSES", "PROFIT"];
    $scope.data = [];
    $scope.spendingList = [];

    $scope.income = "";
    $scope.spending = "";
    $scope.profit = "";

    homeService.getIncomeAndSpendingAndProfit().then(function (data) {
        $scope.data = [data.data.income , data.data.spendings, data.data.profit];
        $scope.income = data.data.income;
        $scope.spending = data.data.spendings;
        $scope.profit = data.data.profit;
    });

//    Second Chart
    $scope.labels1 = [];
    $scope.data1 = [];

    homeService.getSpendingCategory().then(function (data) {
        console.log(data);
        $scope.labels1 = data.data.categoryNameList;
        $scope.data1 = data.data.amountList;
    });

//    For Side View
    homeService.getSpendingCategoryList().then(function (data) {
        console.log(data);
        $scope.spendingList = data.data;
        console.log("List===============================================");
        console.log($scope.spendingList);
    });
}