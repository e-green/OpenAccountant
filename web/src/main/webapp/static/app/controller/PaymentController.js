/**
 * Created by ChanakaDeSilva on 2/19/2015.
 */
function PaymentController($scope, paymentService) {

    $scope.today_orders = [];
    $scope.orderItems = [];
    $scope.all_order_payment = [];
    $scope.payment = {};
    var payment_id = "";

    paymentService.getTodayCustomerOrders().then(function (data) {
        console.log(data);
        $scope.today_orders = data;
    });

    $scope.orderItemsMethod = function (id) {
        paymentService.getOrderItems(id).then(function (data) {
            console.log(data);
            $scope.orderItems = data.data;
            $('#orderModal').modal('show');
        });
    };

//    Get Payment Modal
    $scope.getPaymentModal = function (id) {
        payment_id = id;
        $('#paymentModal').modal('show');
    };

//    Do payments
    $scope.makePayment = function () {
        var foo = {"customerOrderId": payment_id, "date": $scope.payment.date, "amount": $scope.payment.amount};
        paymentService.savePayment(foo).then(function (data) {
            console.log(data);
        });
        $scope.payment = {};
    };

    //    Call the Add Customer Modal
    $scope.getModel = function () {
        $('#orderModal').modal('show');
    };

//    View Payments
    $scope.viewPayments = function (id) {
        console.log(id);
        paymentService.viewInvoicePayment(id).then(function (data) {
            console.log(data);
            $scope.all_order_payment = data;
        });
        $('#orderpaymentModal').modal('show');
    };

//    Search Customer Invoices
    $scope.searchInvoice = function () {
        var datez = {"from_date": $scope.invoice.fromDate, "to_date": $scope.invoice.toDate};
        console.log(datez);
        paymentService.viewInvoicePaymentbyDate(datez).then(function (data) {
            console.log(data);
            $scope.today_orders = data.data;
        });
    };
}