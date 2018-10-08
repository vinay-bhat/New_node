var app = angular.module("userApp", ['ngRoute', 'ngStorage', '720kb.datepicker', 'ngFileUpload', 'ui.bootstrap', 'ngDialog']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		// Home
		.when("/", {
			templateUrl: "home.html",
			// controller: "homeCtrl"
		})
		// Pages
		.when("/supcreate", {
			templateUrl: "supcreate.html",
			// controller: "homeCtrl"
		})
		.when("/purcreate", {
			templateUrl: "purreg.html",
			// controller: "homeCtrl"
		})
		.when("/supplist", {
			templateUrl: "supplist.html",
			// controller: "homeCtrl"
		})
		.when("/editsupp", {
			templateUrl: "editsupp.html",
			// controller: "homeCtrl"
		})
		.when("/prodcreate", {
			templateUrl: "prodcreate.html",
			// controller: "homeCtrl"
		})
		
		.when("/prodlist", {
			templateUrl: "prodlist.html",
			// controller: "homeCtrl"
		})
		.when("/editprod", {
			templateUrl: "editprod.html",
			// controller: "homeCtrl"
		})
		.when("/custcreate", {
			templateUrl: "custcreate.html",
			// controller: "homeCtrl"
		})
		.when("/custlist", {
			templateUrl: "custlist.html",
			// controller: "homeCtrl"
		})
		.when("/editcust", {
			templateUrl: "editcust.html",
			// controller: "homeCtrl"
		})
		.when("/salescreate", {
			templateUrl: "salescreate.html",
			// controller: "homeCtrl"
		})
		.when("/purchlist", {
			templateUrl: "purchlist.html",
			// controller: "homeCtrl"
		})
		.when("/viewPurchasedDetails", {
			templateUrl: "viewProductsDetails.html",
			// controller: "homeCtrl"
		})
		.when("/presentstock", {
			templateUrl: "presentstock.html",
			// controller: "homeCtrl"
		})

		.when("/saleslist", {
			templateUrl: "saleslist.html",
			// controller: "homeCtrl"
		})
		.when("/viewSalesDetails", {
			templateUrl: "viewSalesDetails.html",
			// controller: "homeCtrl"
		})
		.when("/stockLedger", {
			templateUrl: "stocklegder.html",
			// controller: "homeCtrl"
		})
		.when("/receipt", {
			templateUrl: "receipt.html",
			// controller: "homeCtrl"
		})
		.when("/monthSales", {
			templateUrl: "monthSales.html",
			// controller: "homeCtrl"
		})
		.when("/monthPurchase", {
			templateUrl: "monthPurchase.html",
			// controller: "homeCtrl"
		})
		.when("/stockEntry", {
			templateUrl: "stockentry.html",
			// controller: "homeCtrl"
		})
		.when("/updatedList", {
			templateUrl: "updatedList.html",
			// controller: "homeCtrl"
		})
		.when("/viewUpdatedList", {
			templateUrl: "viewUpdatedList.html",
			// controller: "homeCtrl"
		})
		.when("/directReceipt", {
			templateUrl: "directReceipt.html",
			// controller: "homeCtrl"
		})
		.otherwise("/404", {
			templateUrl: "404.html"
		});

}]);
app.factory('Excel',function($window){
		var uri='data:application/vnd.ms-excel;base64,',
			template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
			base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
			format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
		return {
			tableToExcel:function(tableId,worksheetName){
				var table=$(tableId),
					ctx={worksheet:worksheetName,table:table.html()},
					href=uri+base64(format(template,ctx));
				return href;
			}
		};
	})
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.filter('dateRange', function() {
        return function( items, fromDate, toDate, selectedName ) {
              var filtered = [];
            //here you will have your desired input
            console.log(fromDate, toDate);
            var selectedItem = (selectedName);
            // var from_date = Date.parse(fromDate);
            // var to_date = Date.parse(toDate);
            var d1 = fromDate;
    var split1 = d1.split('-');
    var date1 = new Date(split1[2], split1[1] - 1, split1[0]);
    var timestamp1 = date1.getTime();

    var d2 = toDate;
    var split2 = d2.split('-');
    var date2 = new Date(split2[2], split2[1] - 1, split2[0]);
    var timestamp2 = date2.getTime();

            console.log(timestamp1, timestamp2);
            angular.forEach(items, function(item) {
            	var d = item.inward_date;
    var split = d.split('-');
    var date = new Date(split[2], split[1] - 1, split[0]);
    var timestamp = date.getTime();
            	console.log(Date.parse(new Date(item.date)));
                if(timestamp >= timestamp1 && timestamp <= timestamp2 && item.product_name == selectedItem) {
                    filtered.push(item);
                    console.log(filtered);
                }
            });
            return filtered;
        };
    });

app.filter('dateRange2', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];
            //here you will have your desired input
            console.log(fromDate, toDate);

            // var from_date = Date.parse(fromDate);
            // var to_date = Date.parse(toDate);
            var d1 = fromDate;
    var split1 = d1.split('-');
    var date1 = new Date(split1[2], split1[1] - 1, split1[0]);
    var timestamp1 = date1.getTime();

    var d2 = toDate;
    var split2 = d2.split('-');
    var date2 = new Date(split2[2], split2[1] - 1, split2[0]);
    var timestamp2 = date2.getTime();

            console.log(timestamp1, timestamp2);
            angular.forEach(items, function(item) {
            	var d = item.date;
    var split = d.split('-');
    var date = new Date(split[2], split[1] - 1, split[0]);
    var timestamp = date.getTime();
            	console.log(Date.parse(new Date(item.date)));
                if(timestamp >= timestamp1 && timestamp <= timestamp2) {
                    filtered.push(item);
                    console.log(filtered);
                }
            });
            return filtered;
        };
    });



app.filter('sumByColumn', function () {
      return function (collection, column) {
        var total = 0;

        collection.forEach(function (item) {
          total += item[column];
        });

        return total;
      };
    })
app.controller('batchCtrl', function($scope, $http, $timeout,  $localStorage, Upload, $window, Excel, $filter, ngDialog){

$scope.ngDialog = ngDialog;

$scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'sheet name');
            //$timeout(function(){location.href=exportHref;},100); // trigger download
            $timeout(function(){
    var a = document.createElement('a');
    a.href=exportHref;
    a.download = "Sales.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();
},100);
        }

        $scope.exportToExcelPurchase=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'sheet name');
            //$timeout(function(){location.href=exportHref;},100); // trigger download
            $timeout(function(){
    var a = document.createElement('a');
    a.href=exportHref;
    a.download = "Purchase.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();
},100);
        }


	// $scope.isDisabled = false;

 //    $scope.disableButton = function() {
 //        $scope.isDisabled = true;
 //    }

	$scope.taxes = [5, 12, 18, 28];
	//$scope.date = new Date();
	//$scope.minDate = new Date().toDateString();	

        $scope.insertDetails = function (pageData) {         
	        var variable = pageData;
	    	console.log(variable);
	        $http.post('/insertDetails', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Supplier details added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	reloadRoute();
	        	}, 3000);
	        });    
		}  
		$scope.updateDetails = function (pageData) {         
	        var variable2 = pageData;
	    	console.log(variable2);
	        $http.post('/updateDetails', JSON.stringify(variable2)).then(function(response){  
	        	$scope.successMessage = "Supplier details Updated successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.location = '#/supplist';
	        	}, 500);

	        }); 
	        $scope.clear();
	           
		}  

		//$scope.suppliers=[];
		$http({
	        method: 'get',
	        url: '/getSupplier'
	    }).then(function successCallback(response) {
	        $scope.suppliers = response.data;
	        console.log($scope.suppliers)
	    });

	    $scope.pageData = {};
	    $scope.pageData123 = {};
	    $scope.saveResults123 = {};

        $scope.save = function(supplier){
        $scope.supplier = supplier;
           $localStorage.prevPageData = $scope.supplier;

        };
         $scope.pageData = $localStorage.prevPageData;
        console.log($scope.pageData);  

        $scope.hello123 = function(){
       
           $localStorage.prevPageData123 = $scope.item123;

        };

        $scope.pageData123 = $localStorage.prevPageData123;
        console.log($scope.pageData123); 

         $scope.saveResults = function(purchase){
       		$scope.saveResults = purchase;
           $localStorage.saveResults12 = $scope.saveResults;

        };

        $scope.saveResults123 = $localStorage.saveResults12;
        console.log($scope.saveResults123); 


         $scope.saveForReceipt = function(purchase){
       		$scope.saveForReceipt = purchase;
           $localStorage.saveForReceipt12 = $scope.saveForReceipt;


        };

        $scope.saveForReceipt123 = $localStorage.saveForReceipt12;
        console.log($scope.saveForReceipt123); 
       
       

        $scope.clear = function(){
        	console.log("cleared");
           $localStorage.$reset();
        };
        	$scope.filepath = [];
        $scope.upload = function (file) {
	        Upload.upload({
	            url: '/upload',
	            data: {file: file, 'username': $scope.username}
	        }).then(function (resp) {
	            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	            //$scope.filepath = resp.data;
	            $scope.filepath.push({
				path: resp.data
				
			});
	            
	            console.log($scope.filepath);
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	            $scope.progress = 'progress: ' + progressPercentage + '%  File Uploaded';
	        });
    	};
		//console.log( $scope.filepath);
    	$scope.insertPurchaseDetails = function (pageData) {         
	        var variable = pageData;
	    	//console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/insertPurchaseDetails', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Purchase details added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	$scope.reloadRoute();
	        	}, 1000);
	        });    
		}

		$scope.insertMonthly = function (pageData) {         
	        var variable = pageData;
	    	//console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/insertMonthly', JSON.stringify(variable)).then(function(response){  
	        	
	        });    
		}


		$scope.insertSalesDetails = function (pageData) {         
	        var variable = pageData;
	    	//console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/insertSalesDetails', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Sales details added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	$scope.reloadRoute();
	        	}, 1000);
	        });    
		}

		$scope.updateStatus = function (item123) {         
	        var variable = item123;
	    	console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/updateStatus', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Sales details added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.print();
	        	}, 1000);
	        });    
		}

		$scope.insertPhy = function (pageData) {         
	      var details = pageData;   
        console.log(details);
        $http.post('/insertPhy', JSON.stringify(details)).then(function(response){  
	        
	        }); 
	    	
		}

		$scope.updatePhy = function (prod) {         
	      var details = prod;   
        console.log(details);
        $http.post('/updatePhy', JSON.stringify(details)).then(function(response){  
	        	$scope.successMessage = "Updated details added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	$scope.reloadRoute();
	        	}, 1000);
	        }); 
	    	
		}
		$scope.increase = function (prod) {
			console.log(prod);
    		this.prod.quantity;
    		}

    		$scope.oldvalueinsert = [];

    		$scope.lasttry = function (prod) {
			console.log(prod);
    		$scope.oldvalueinsert.push(prod);
			console.log($scope.oldvalueinsert);
			// $http.post('/updateNewWithOld', JSON.stringify($scope.oldvalueinsert)).then(function(response){  
	        	
	  //       });    
    		}

    		$scope.oldToNew = function () {         
	       
	    	console.log($scope.oldvalueinsert);
	        $http.post('/updateNewWithOld', JSON.stringify($scope.oldvalueinsert)).then(function(response){  
	        	
	        });    
		}

    	$scope.updateOldPhy = function () {         
	       
	    	console.log($scope.products);
	        $http.post('/updateOldPhy', JSON.stringify($scope.products)).then(function(response){  
	        	
	        });    
		}
		

		$scope.getPurc = function (purchase) {         
	        var variable = purchase;
	    	console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/getPurc', JSON.stringify(variable)).then(function(response){  
	        	$scope.purchasedProductDetails = response.data;
	        	 $localStorage.proddetail = $scope.purchasedProductDetails;
	        console.log($scope.purchasedProductDetails);
	        $scope.reloadRoute();
	        });    
		}

		$scope.getSale = function (purchase) {         
	        var variable = purchase;
	    	console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/getSale', JSON.stringify(variable)).then(function(response){  
	        	$scope.salesProductDetails = response.data;
	        	 $localStorage.proddetail12 = $scope.salesProductDetails;
	        console.log($scope.salesProductDetails);
	        });    
		}

		$scope.getUpdatedList = function (purchase) {         
	        var variable = purchase;
	    	console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/getUpdatedList', JSON.stringify(variable)).then(function(response){  
	        	$scope.getUpdatedList = response.data;
	        	 $localStorage.updatedStockDetail = $scope.getUpdatedList;
	        console.log($scope.getUpdatedList);
	        });    
		}



		$scope.getResultTax = function (purchase) {         
	        var variable = purchase;
	    	console.log(variable);
	    	//console.log($scope.carts);
	        $http.post('/getResultTax', JSON.stringify(variable)).then(function(response){  
	        	$scope.getResultTax = response.data[0];
	        	$scope.getResultTax0 = response.data[1];
	        	$scope.getResultTax1 = response.data[2];
	        	$scope.getResultTax2 = response.data[3];
	        	$localStorage.results = $scope.getResultTax;
	        	$localStorage.results1 = $scope.getResultTax0;
	        	$localStorage.results2 = $scope.getResultTax1;
	        	$localStorage.results3 = $scope.getResultTax2;
	        console.log($scope.getResultTax0);
	        });    
		}

        $scope.proditems = $localStorage.proddetail;
        console.log($scope.proditems); 

        $scope.saleitems = $localStorage.proddetail12;
        console.log($scope.saleitems);

         $scope.updatedListDetails = $localStorage.updatedStockDetail;
        console.log($scope.updatedListDetails); 

        $scope.sumTaxes = $localStorage.results;
        $scope.sumTaxes1 = $localStorage.results1;
        $scope.sumTaxes2 = $localStorage.results2;
        $scope.sumTaxes3 = $localStorage.results3;
        console.log($scope.sumTaxes); 
        console.log($scope.sumTaxes1); 
        console.log($scope.sumTaxes2); 
        console.log($scope.sumTaxes3); 

		$scope.insertPurchaseProductDetails = function () {         
	       
	    	console.log($scope.carts);
	        $http.post('/insertPurchaseProductDetails', JSON.stringify($scope.carts)).then(function(response){  
	        	// $scope.successMessage = "Purchase details added successfully!!";
	        	// $scope.successMessagebool = true;
	        	// $timeout(function () {
	         //    	$scope.successMessagebool = false;
	         //     	window.location = '#/purcreate';
	        	// }, 5000);
	        });    
		}

		$scope.insertSalesProductDetails = function () {         
	       
	    	console.log($scope.salescart);
	        $http.post('/insertSalesProductDetails', JSON.stringify($scope.salescart)).then(function(response){  
	        	// $scope.successMessage = "Purchase details added successfully!!";
	        	// $scope.successMessagebool = true;
	        	// $timeout(function () {
	         //    	$scope.successMessagebool = false;
	         //     	window.location = '#/purcreate';
	        	// }, 5000);
	        });    
		}

		$scope.insertProduct = function (pageData) {         
	        var variable = pageData;
	    	console.log(variable);

	        $http.post('/insertProducts', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Product added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.location = '#/prodcreate';
	        	}, 5000);
	        });    
		}

		$http({
	        method: 'get',
	        url: '/getProduct'
	    }).then(function successCallback(response) {
	        $scope.products = response.data;
	        console.log($scope.products)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getMonthSales'
	    }).then(function successCallback(response) {
	        $scope.monthSales = response.data;
	        console.log($scope.monthSales)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getPhyUpdate'
	    }).then(function successCallback(response) {
	        $scope.phyUpdates = response.data;
	        console.log($scope.phyUpdates)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getMonthPurchase'
	    }).then(function successCallback(response) {
	        $scope.monthPurchase = response.data;
	        console.log($scope.monthPurchase)
	    }); 

		$http({
	        method: 'get',
	        url: '/getPurchaseDetails'
	    }).then(function successCallback(response) {
	        $scope.purchases = response.data;
	        console.log($scope.purchases)
	    });

	    $http({
	        method: 'get',
	        url: '/getPurchasedProducts'
	    }).then(function successCallback(response) {
	        $scope.purchasedproducts = response.data;
	        console.log($scope.purchasedproducts)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getSalesList'
	    }).then(function successCallback(response) {
	        $scope.saleslists = response.data;
	        console.log($scope.saleslists)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getStockLedger'
	    }).then(function successCallback(response) {
	        $scope.stockLedger = response.data;
	        console.log($scope.stockLedger)
	    }); 

	    $http({
	        method: 'get',
	        url: '/getTempProd'
	    }).then(function successCallback(response) {
	        $scope.tempProds = response.data;
	        console.log($scope.tempProds)
	    });

	    $scope.updateProduct = function (pageData) {         
	        var variable2 = pageData;
	    	console.log(variable2);
	        $http.post('/updateProducts', JSON.stringify(variable2)).then(function(response){  
	        	$scope.successMessage = "Product details Updated successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.location = '#/prodlist';
	        	}, 500);

	        }); 
	        $scope.clear();
	           
		}
		$scope.insertCustomer = function (pageData) {         
	        var variable = pageData;
	    	console.log(variable);
	        $http.post('/insertCustomer', JSON.stringify(variable)).then(function(response){  
	        	$scope.successMessage = "Customer added successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.location = '#/custcreate';
	        	}, 5000);
	        });    
		}

		$http({
	        method: 'get',
	        url: '/getCustomer'
	    }).then(function successCallback(response) {
	        $scope.customers = response.data;
	        console.log($scope.customers)
	    });

	    $http({
	        method: 'get',
	        url: '/getSalesDetails'
	    }).then(function successCallback(response) {
	        $scope.sales = response.data;
	        console.log($scope.sales)
	    });

	    $scope.updateCustomer = function (pageData) {         
	        var variable2 = pageData;
	    	console.log(variable2);
	        $http.post('/updateCustomers', JSON.stringify(variable2)).then(function(response){  
	        	$scope.successMessage = "Customer details Updated successfully!!";
	        	$scope.successMessagebool = true;
	        	$timeout(function () {
	            	$scope.successMessagebool = false;
	             	window.location = '#/custlist';
	        	}, 500);

	        }); 
	        $scope.clear();
	           
		}

		// Product add section

		$scope.carts = [];
		$scope.add_cart = function (product) {
			console.log(product);
		var existingItem = getExistingCartItem(product.id);
		if (existingItem == null) {
			$scope.carts.push({
				p_id: product.id,
				p_uom: product.uom,
				 init_stock: product.present_stock,
				 tax: product.tax,
				
				p_name: product.product_name
				
			});
		} else {
			existingItem.full_quantity++;
		}

		
		console.log($scope.carts);
	}



	function getExistingCartItem(id) {
		for (var i = 0; i < $scope.carts.length; i++) {
			if ($scope.carts[i].p_id === id) {
				return $scope.carts[i];
			}
		}

		return null;
	}
	$scope.remove_cart = function (cart) {
		console.log(cart);
		if (cart) {
			$scope.carts.splice($scope.carts.indexOf(cart), 1);
			$scope.total -= cart.p_price;
		}
	}
	$scope.cartSum = function () {
		var sum = 0;
		$scope.carts.forEach(function (item) {
			sum += item.totalPrice;
		});

		return sum;
	}

		// sales cart section


	$scope.salescart = [];
		$scope.add_sale = function (product) {
			console.log(product);
		var existingItem = getExistingSaleItem(product.id);
		if (existingItem == null) {
			$scope.salescart.push({
				p_id: product.id,
				p_name: product.product_name,
				quantity: product.present_stock,
				tax: product.tax,
				
				basic_price: product.basic_price
				
			});
		} else {
			existingItem.quantity++;
		}

		
		console.log($scope.salescart);
	}



	function getExistingSaleItem(id) {
		for (var i = 0; i < $scope.salescart.length; i++) {
			if ($scope.salescart[i].p_id === id) {
				return $scope.salescart[i];
			}
		}

		return null;
	}
	$scope.remove_sale = function (cart) {
		console.log(cart);
		if (cart) {
			$scope.salescart.splice($scope.salescart.indexOf(cart), 1);
			$scope.total -= cart.p_price;
		}
	}
	$scope.salesSum = function () {
		var sum = 0;
		$scope.salescart.forEach(function (item) {
			sum += item.totalPrice;
		});

		return sum;
	}

	   $scope.reloadRoute = function() {
        console.log("hello");
   $window.location.reload();
  
}
$scope.printDiv = function(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var popupWin = window.open('', '_blank', 'width=900,height=900');
  popupWin.document.open();
  popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '</body></html>');
  popupWin.document.close();
}

$scope.clickToOpen = function () {
       ngDialog.open({
    template: 'externalTemplate.html',
    className: 'ngdialog-theme-default ngdialog-theme-custom',
    scope: $scope
		});
    };

});

