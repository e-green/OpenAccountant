/**
 * Created by ChanakaDeSilva on 2/16/2015.
 */
function InvoiceController($scope, $routeParams, invoiceService, inventryService) {

    var customer_id = $routeParams.customer_id;
    console.log(customer_id);
    var customer_name = "";
    var customerOrderID = "";
    var total_amount = 0;

    $scope.invoice = {};
    $scope.orderItems = [];
    $scope.order_price = "";
    $scope.allItems = [];

    $scope.order_id = "";

    inventryService.getItemsforview().then(function (data) {
        console.log(data);
        $scope.allItems = data.data;
    });

//    Get Item Price
    $scope.getItemPrice = function () {
        var itemid = $scope.invoice.itemName;
        console.log(itemid);
        invoiceService.getItemPriceView(itemid).then(function (data) {
            console.log(data);
            $scope.invoice.rate = data.data.retailPrice;
            console.log("Price : " + $scope.invoice.rate)
        });
    };

//    Get Customer Details
    invoiceService.getCustomerInfo(customer_id).then(function (data) {
        console.log(data);
        $scope.invoice.customer_name = data.firstName;
        customer_name = data.firstName;
    });

//    Save Customer Order
    $scope.saveCustomerInvoice = function () {

        var customer_order = {
            "invoiceDate": $scope.invoice.invoiceDate,
            "orderDueDate": $scope.invoice.orderDueDate,
            "customerId": customer_id,
            "customerName": customer_name,
            "amount": null
        };

        invoiceService.saveInvoice(customer_order).then(function (data) {
            console.log(data);
            customerOrderID = data.data;
        });
    };

//    Generate the order amount - do the maths part
    $scope.calculate = function () {
        var rate = $scope.invoice.rate;
        var qty = $scope.invoice.quentity;
        var amount = rate * qty;
        console.log(amount);
        $scope.invoice.amount = amount;
    };

//  Save Customer Order has Item
    $scope.saveCustomerOrderItem = function () {
        var item = {
            "cusOrderId": customerOrderID,
            "itemId": $scope.invoice.itemName,
            "itemName": $scope.invoice.itemName,
            "description": $scope.invoice.description,
            "quentity": $scope.invoice.quentity,
            "rate": $scope.invoice.rate,
            "amount": $scope.invoice.amount
        };


        invoiceService.saveInvoicehasItem(item).then(function (data) {

            total_amount = total_amount + $scope.invoice.amount;
            console.log("Total Order Amount is : " + total_amount);
            $scope.order_price = total_amount;

            console.log(data);
            $scope.invoice.itemName = "";
            $scope.invoice.description = "";
            $scope.invoice.quentity = "";
            $scope.invoice.rate = "";
            $scope.invoice.amount = "";

        });
        getOrderItemstoView();
    };

//    Get Items in the selected order
    function getOrderItemstoView() {
        invoiceService.getOrderItems(customerOrderID).then(function (data) {
            console.log(data);
            $scope.orderItems = data.data;
            console.log("Array Printed :-)");
            console.log($scope.orderItems);
        });
    }

//    Delete the entry Record
    $scope.removeItem = function (id) {
        invoiceService.removeOrderItem(id).then(function (data) {
            console.log(data);
            getOrderItemstoView();
        });
    };

//    Update the order with the value of order
    $scope.updateOrder = function () {
        var obj = {"order_id": customerOrderID, "amount": total_amount };
        invoiceService.updateOrder(obj).then(function (data) {
            console.log(data);
            $scope.order_id = data.data;
            alert("Customer Invoice Updated " + $scope.order_id);
            $scope.invoice.customer_name = "";
            $scope.invoice.invoiceDate = "";
            $scope.invoice.orderDueDate = "";
        });
    };

    $scope.getReport = function () {
//        invoiceService.getPDF('1424947699760').then(function (data) {
//            console.log(data);
//        });
    };
}
