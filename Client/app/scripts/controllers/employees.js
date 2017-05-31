'use strict';

/**
 * @ngdoc function
 * @name rnaminventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rnaminventoryApp
 */
angular.module('rnaminventoryApp')
  .controller('EmployeesCtrl',['employeeService', 'employeeClientService', 'uiGridConstants', function (employeeService, employeeClientService, uiGridConstants) {
  	console.log(employeeService);
  	var emp = this;  

    emp.enablebutton = false;
    emp.enableShow= false;

  	emp.gridOptions = {
        'enableSorting': 'true',
        'enableColumnResizing': 'true',
        'enablePinning':'true',
      	'enableFiltering': 'true',
      	'paginationPageSizes': [25, 50, 75],
    	'paginationPageSize': 25,
    	/*'columnDefs':[
    { name:'signum', width:100  },
    { name:'name', width:200  },
    { name:'type', width:100  },
    { name:'Job_Stage', width:100  },
    { name:'role', width:150 },
    { name:'location', width:150 },
    { name:'eoc_exp', width:100 },
    { name:'ecm_exp', width:100 },
    { name:'total_exp', width:100 },
    { name:'ho_month', width:200 },
    { name:'teamName', width:200 },
    { name:'projectName', width:150 },
    { name:'pool', width:100 },
    { name:'approved_by_RNAM_OSS', width:150 },
    { name:'status', width:150 },
    { name:'cu', width:150 },
    { name:'Egi_Line_Manager', width:150 },
    { name:'getMonthAndYear()', width:150 }
    
  ]*/
    };

    		      emp.gridOptions.enableRowSelection=true;
              emp.gridOptions.enableRowHeaderSelection=false;
              emp.gridOptions.modifierKeysToMultiSelect=true;
              emp.gridOptions.multiSelect= true; 
              emp.gridOptions.enableGridMenu= true;
              emp.gridOptions.enableCellEdit=false;
              emp.gridOptions.enableCellEditOnFocus= true;
              emp.gridOptions.enableFiltering = true;


                 emp.gridOptions.onRegisterApi = function (gridApi) {
                    //set gridApi to controller property
                    emp.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged(null, function (row) {
                      console.log(row);
                      emp.enablebutton = true;
                      emp.enableShow= true;
                    var  mySelections = gridApi.selection.getSelectedRows();
                      console.log(mySelections);
                      console.log(row.entity);
                    });
                };

                emp.show=function(){
                  emp.enableForm = true;
                };


                emp.edit=function(){
                  emp.gridOptions.enableCellEdit=true;
                };

                emp.cancel=function(){
  					emp.enableForm = false;
    			};


        employeeService.getEmployees()
        .then(function (response) {
            console.log(response);
                emp.gridOptions.columnDefs = employeeClientService.getColumnDefs(response.data[0]);
                emp.gridOptions.data = response.data;
                console.log(emp.gridOptions.data);
            }, function (error) {
                console.log('Unable to load projects data: ' + error.message);
            });
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);


angular.module('rnaminventoryApp').filter('date', function () {
  return function (input) {
      return input.month + ', ' + input.year;
  };
}); 


