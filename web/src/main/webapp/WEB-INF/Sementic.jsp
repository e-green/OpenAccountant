<!DOCTYPE html>
<html ng-app="cloud_accounting">
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Mint Books</title>
    <!--<link href="lib/materialize.css" rel="stylesheet">-->
    <link href="static/lib/semantic.css" rel="stylesheet">
    <link href="static/lib/toast.css" rel="stylesheet">
    <link href="static/lib/angular-chart.css" rel="stylesheet">
    <link href="static/lib/jquery.datetimepicker.css" rel="stylesheet">

    <!--<script src="https://rawgit.com/jpillora/xdomain/gh-pages/dist/0.6/xdomain.js"-->
    <!--slave="http://192.168.1.101:8080/web/proxy"></script>-->

</head>
<body>
<!--style="box-shadow: 2px 1px 10px #c43a56;"-->
<div class="ui inverted teal vertical segment">
    <div class="ui page grid">
        <div class="column">

            <div class="ui grid">
                <div class="six wide column">
                    <h2 class="ui inverted header">Welcome back, Mint Demo User!</h2>
                </div>
                <div class="two wide column"></div>
                <div class="seven wide column">

                </div>
                <div class="one wide column">

                    <a class="item">
                        <i class="circular power icon"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ui inverted red vertical segment">
    <div class="ui page grid">
        <div class="column">
            <div class="ui grid">
                <div class="six wide column">
                    <p>Monday, February 16, 2015</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="ui left vertical inverted labeled icon sidebar menu overlay visible">
    <a class="item">
        <!--<i class="home icon"></i>-->
        <img src="static/lib/img/logo.png" alt="LOGO">
        MintBooks
    </a>
    <a class="item" href="#/home">
        <i class="home icon"></i>
        Home
    </a>
    <a class="item" href="#/income">
        <i class="download icon"></i>
        Income
    </a>
    <a class="item" href="#/spending">
        <i class="upload icon"></i>
        Spending
    </a>
    <a class="item" href="#/customer">
        <i class="users icon"></i>
        Customers
    </a>
    <a class="item" href="#/invoice/-1">
        <i class="browser icon"></i>
        Invoice
    </a>
    <a class="item" href="#/payment">
        <i class="browser icon"></i>
        Payments
    </a>
    <a class="item" href="#/report">
        <i class="fax icon"></i>
        Reports
    </a>
    <a class="item" href="#/inventory">
        <i class="cubes icon"></i>
        Inventory
    </a>
</div>
<br>

<ng-view>

</ng-view>


<script src="static/lib/jquery-1.11.2.js" type="text/javascript"></script>
<script src="static/lib/jquery.tablesort.min.js" type="text/javascript"></script>
<script src="static/lib/jquery.datetimepicker.js" type="text/javascript"></script>

<script src="static/lib/angular.min.js" type="text/javascript"></script>
<script src="static/lib/angular-route.min.js" type="text/javascript"></script>

<!--Adding HIGHCHARTS-->
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/highcharts-3d.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<script src="static/lib/chart.js" type="text/javascript"></script>
<script src="static/lib/angular-chart.js" type="text/javascript"></script>

<script src="static/lib/semantic.js" type="text/javascript"></script>
<script src="static/lib/materialize.js" type="text/javascript"></script>

<script src="static/lib/pdfobject.js" type="text/javascript"></script>

<script src="static/app//main.js" type="text/javascript"></script>
<script src="static/app//url.js" type="text/javascript"></script>

<!--Adding Custom Controllers-->

<script src="static/app//controller/IncomeController.js" type="text/javascript"></script>
<script src="static/app//controller/ExpensesController.js" type="text/javascript"></script>
<script src="static/app//controller/HomeController.js" type="text/javascript"></script>
<script src="static/app//controller/CustomerController.js" type="text/javascript"></script>
<script src="static/app//controller/InvoiceController.js" type="text/javascript"></script>
<script src="static/app//controller/ReportController.js" type="text/javascript"></script>
<script src="static/app//controller/PaymentController.js" type="text/javascript"></script>
<script src="static/app//controller/InventryController.js" type="text/javascript"></script>

<!--Adding cCustom Services-->

<script src="static/app//service/IncomeService.js" type="text/javascript"></script>
<script src="static/app//service/ExpenseService.js" type="text/javascript"></script>
<script src="static/app//service/CustomerService.js" type="text/javascript"></script>
<script src="static/app//service/InvoiceService.js" type="text/javascript"></script>
<script src="static/app//service/PaymentService.js" type="text/javascript"></script>
<script src="static/app//service/HomeService.js" type="text/javascript"></script>
<script src="static/app//service/InventryService.js" type="text/javascript"></script>

<script>
    $('.dropdown')
            .dropdown({
                // you can use any ui transition
                transition: 'drop'
            })
    ;
</script>

</body>
</html>
<!--// shopify , mandrin like mail chimp-->