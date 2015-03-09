/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */
function CustomerController($scope, customerService) {

    getCustomer();

    $scope.allCustomers = {};
    $scope.totalAmount = "";
    $scope.recievedAmount = "";
    $scope.pendingAmount = "";

    $scope.customer = {
        firstName: ''
    };

    $scope.errors = [];

    customerService.getCustomerOrderValues().then(function (data) {
        console.log(data);
        $scope.totalAmount = data.data.totalCustomerOrderAmount;
        $scope.recievedAmount = data.data.receivedCustomerOrderAmount;
        $scope.pendingAmount = data.data.pendingCustomerOrderAmount;
    });

    $scope.sortByName = function () {
        customerService.sortCustomerByName().then(function (data) {
            console.log(data);
            $scope.allCustomers = data.data;
        });
    };

    $scope.sortByValue = function () {
        customerService.sortCustomerByValue().then(function (data) {
            console.log(data);
            $scope.allCustomers = data.data;
        });
    };

//    Call the Add Customer Modal
    $scope.getModel = function () {
        $('#customerModal').modal('show');
    };

//    End of calling Add Customer Modal

//    Get all Customer
    function getCustomer() {
        customerService.all().then(function (data) {
            $scope.allCustomers = data.data;
        });
    }

//    End of get all customers

    $scope.saveCustomer = function () {

        $scope.errors = [];

        if ($scope.customer.firstName === '') {
            $scope.errors.push("Enter Customer Name");
            toast('Enter Customer Name', 3000, 'rounded');
        }

        if ($scope.errors.length > 0) {
            return;
        }

        var customerObj = $scope.customer;
        console.log(customerObj);
        customerService.save(customerObj).then(function (data) {
            console.log(data);
            getCustomer();
        });
        $scope.customer = {};
    };
}