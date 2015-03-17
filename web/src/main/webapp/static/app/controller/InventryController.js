/**
 * Created by ChanakaDeSilva on 3/10/2015.
 */
function InventryController($scope, inventryService) {

    $scope.addItemView = false;
    $scope.categoryView = false;
    $scope.supplierView = false;
    $scope.brandView = false;

    $scope.allCategories = [];
    $scope.allSuppliers = [];
    $scope.allBrands = [];
    $scope.allItems = [];

    $scope.inventoryValue = "";

    getAllCategory();
    getAllSupplier();
    getAllBrands();
    getAllItems();
    getValue();

//    add category
    $scope.addCategory = function () {
        var category = $scope.category;
        console.log(category);
        inventryService.saveCategory(category).then(function (data) {
            console.log(data);
            getAllCategory();
            toast("Category Added Successfully", 3000, "rounded");
        });
    };

//    add supplier
    $scope.addSupplier = function () {
        var supplier = $scope.supplier;
        console.log(supplier);
        inventryService.saveSupplier(supplier).then(function (data) {
            console.log(data);
            toast("Supplier Added Successfully", 3000, "rounded");
        });
    };

//    add brand
    $scope.addBrand = function () {
        var brand = {"brandName": $scope.brand.brandName, "supplierId": 1};
        console.log(brand);
        inventryService.saveBrand(brand).then(function (data) {
            console.log(data);
            toast("Brand Added Successfully", 3000, "rounded");
        });
    };

//     save item
    $scope.saveItem = function () {
        var item = $scope.inventory;
        console.log(item);
        inventryService.saveItemService(item).then(function (data) {
            console.log(data);
            toast("Item Added Successfully", 3000, "rounded");
        });
        $scope.inventory = {};
    };

//    search items by qty
    $scope.searchItem = function () {
        var num = $scope.inventory.limit;
        inventryService.searchInventory(num).then(function (data) {
            console.log(data);
            $scope.allItems = data;
        });
    };

//    Reset All
    $scope.resetAll = function () {
        getAllItems();
    };

    //    Get Category
    function getAllCategory() {
        inventryService.getCategory().then(function (data) {
            console.log(data);
            $scope.allCategories = data.data;
        });
    }

    //    Get supplier
    function getAllSupplier() {
        inventryService.getSupplier().then(function (data) {
            console.log(data);
            $scope.allSuppliers = data.data;
        });
    }

    //    Get Brands
    function getAllBrands() {
        inventryService.getBrand().then(function (data) {
            console.log(data);
            $scope.allBrands = data.data;
        });
    }

//    Get All items
    function getAllItems() {
        inventryService.getItem().then(function (data) {
            console.log(data);
            $scope.allItems = data;
        });
    }

//    Get inventory value
    function getValue() {
        inventryService.getInventoryValue().then(function (data) {
            console.log(data);
            $scope.inventoryValue = data.data;
        });
    }

    /*
     -----------------------------start of direct ui methods---------------------------------
     */

//    Item Add Methods
    $scope.viewItemAdd = function () {
        $scope.addItemView = true;
    };

    $scope.hideItemAdd = function () {
        $scope.addItemView = false;
    };

//    Category management
    $scope.viewCategory = function () {
        $scope.categoryView = true;
    };

    $scope.hideCategory = function () {
        $scope.categoryView = false;
    };

//   Supplier management
    $scope.viewSupplier = function () {
        $scope.supplierView = true;
    };

    $scope.hideSupplier = function () {
        $scope.supplierView = false;
    };

    //   Brand management
    $scope.viewBrand = function () {
        $scope.brandView = true;
    };

    $scope.hideBrand = function () {
        $scope.brandView = false;
    };


}