
woodcastle.controller("MainController", function($rootScope,$scope,$log,$location,$http,$timeout,$interval,woodcastleService) {
	$scope.bills = [];
	$scope.getAllBills = function(){
		var dbName = "woodcastle",collectionName = "bills",response ;  
		var storageService  = new App42Storage();
		storageService.findAllDocuments(dbName,collectionName,{  
			success: function(object) 
			{  
				var storageObj = JSON.parse(object);
				var response = storageObj.app42.response.storage.jsonDoc;
				for(var i=0;i<response.length;i++)  
				{
					var jsonDocObject = response[i];
					jsonDocObject.billNo = i+1;
					$scope.bills.push(jsonDocObject)
				}
			},  
			error: function(error) { 	
			}  
		});
	}
	$scope.getAllBills();
	$scope.openBill = function(){
		$rootScope.bills = $scope.bills;
		$location.path("/bill")
	}
	$scope.openCreateBill = function(){
		$location.path("/createBill")
	}
	
});

woodcastle.controller("printBillController", function($rootScope,$scope,$log,$location,$http,$timeout,$interval,woodcastleService) {
	$scope.bill = $rootScope.bill;
	$scope.printBill  = function(divName) {
		/* var printContents = document.getElementById(divName).innerHTML;
		 w = window.open();
		 w.document.write(printContents);
		 w.print();
		 w.close();*/
	}
	
	
	
});

woodcastle.controller("billController", function($rootScope,$scope,$log,$location,$http,$timeout,$interval,woodcastleService) {
	$scope.openCreateBill = function(){
		$location.path("/createBill")
	}
	$scope.bills = $rootScope.bills;
	$scope.openPrintBill = function(bill){
		$rootScope.bill = bill
		$location.path("/print")
	}
});

woodcastle.controller("createBillController", function($rootScope,$scope,$log,$location,$http,$timeout,$interval,woodcastleService) {
	$scope.hotelName = "woodcastle";
	$scope.startDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
	$scope.endDate =moment().format('DD-MM-YYYY');
	$('#daterange').val(moment().subtract(1, 'days').format('DD-MM-YYYY') + ' - ' +  moment().format('DD-MM-YYYY'));
	 $('#daterange').daterangepicker(
        {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
			maxDate:moment().utc(),
			dateLimit:{
                days: 1
           },
        },
        function (start, end, label) {
			 $scope.startDate = start.format('DD-MM-YYYY')
             $scope.endDate =end.format('DD-MM-YYYY')
            $('#daterange').val(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
	});
	
	$scope.aStartDate = moment().subtract(1, 'days').format('DD-MM-YYYY');
	$scope.aEndDate = moment().format('DD-MM-YYYY');
	$('#daterange-btn').val(moment().subtract(1, 'days').format('DD-MM-YYYY') + ' - ' +  moment().format('DD-MM-YYYY'));
	$('#daterange-btn').daterangepicker(
        {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
			maxDate:moment().utc()
        },
        function (start, end, label) {
			 $scope.aStartDate = start.format('DD-MM-YYYY')
             $scope.aEndDate = end.format('DD-MM-YYYY')
            $('#daterange-btn').val(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
	});
	$scope.validate = function(){
        $scope.error = 'false'
        $scope.isCustomerNameValid = "default"
        $scope.isGstinValid = "default"
        $scope.isAddressValid = "default"
        $scope.isPersonValid = "default"
        $scope.isRoomValid = "default"
        $scope.isRoomRentValid = "default"
        $scope.isExtraBedValid = "default"
        $scope.isMiscSundryValid = "default"
        $scope.isDiscountValid = "default"
        $scope.isOtherChargesValid = "default"
      
        if($scope.customerName === undefined || $scope.customerName == ""){
            $scope.isCustomerNameValid = 'blank'
            $scope.error = 'true'
        }
        if($scope.address === undefined || $scope.address == ""){
            $scope.isAddressValid = 'blank'
            $scope.error = 'true'
        }
        if($scope.personNo === undefined || $scope.personNo == "" || $scope.personNo <= 0){
            $scope.isPersonValid = 'blank'
            $scope.error = 'true'
        }
        if($scope.roomNo === undefined || $scope.roomNo == "" || $scope.roomNo <= 0){
            $scope.isRoomValid = 'blank'
            $scope.error = 'true'
        }
        if($scope.roomRent === undefined || $scope.roomRent == "" || $scope.roomRent <= 0){
            $scope.isRoomRentValid = 'blank'
            $scope.error = 'true'
        }
		if($scope.noOfRooms === undefined || $scope.noOfRooms == "" || $scope.noOfRooms <= 0){
            $scope.isNoOfRoomsValid = 'blank'
            $scope.error = 'true'
        }
        if($scope.error == 'true'){
            return false
        }else{
            return true 
        }
    }
	$scope.saveBill = function(){
		
		if($scope.validate()){
			$scope.loadingState = true;
			var total = $scope.roomRent + $scope.miscSundry + $scope.extraBed - $scope.discount
			var taxableValue = total + $scope.otherCharges
			var taxCharges,taxRate = 0; 
			if(taxableValue > 2500){
				taxRate = 18;
				taxCharges = taxableValue * taxRate/100;
			}else if(taxableValue < 1000){
				taxCharges = 0
			}else{
				taxRate = 12
				taxCharges = taxableValue * taxRate/100;
			}
			var grandTotal = taxableValue + taxCharges;
			var balanceToPay = grandTotal - $scope.lessAdvance
			var data = {
				customerName: $scope.customerName,
				hotelName: $scope.hotelName,
				cGstin:$scope.cGstin,
				address:$scope.address,
				instructions: $scope.instructions,
				date:$scope.startDate,
				avDSDate:$scope.aStartDate,
				avDEDate:$scope.aEndDate,
				arrivalTime: $scope.arrivalTime,
				departureTime:$scope.departureTime,
				personNo:$scope.personNo,
				roomNo: $scope.roomNo,
				roomRent:$scope.roomRent,
				noOfRooms:$scope.noOfRooms,
				extraBed:$scope.extraBed,
				miscSundry: $scope.miscSundry,
				discount:$scope.discount,
				otherCharges:$scope.otherCharges,
				totalAmount: total,
				taxableValue: taxableValue,
				taxCharges: taxCharges,
				lessAdvance:$scope.lessAdvance,
				balanceToPay:balanceToPay,
				grandTotal:grandTotal,
				taxRate:taxRate
			}
			var dbName = "woodcastle",collectionName = "bills",response ;  
			var storageService  = new App42Storage();
			storageService.insertJSONDocument(dbName,collectionName,data,{  
				success: function(object) 
				{  
					console.log(object)
					window.location.href = "https://woodcastledelhi.github.io/";
				},  
				error: function(error) {  
					$("#errorMsg").show()
					$scope.errorMsg = "Getting Error while saving the bill, Please try again."
				}  
			}); 
		}else{
				$("#errorMsg").show()
				$scope.errorMsg = "Getting Error while saving the bill, Please try again."
		}
	}
});