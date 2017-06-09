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

    emp.ProjectNamelist = [];

  	emp.gridOptions = {
         'enableSorting': true,
        'enableColumnResizing': true,
        'enablePinning':true,
      	'enableFiltering': true,
      	'paginationPageSizes': [25, 50, 75],
      'showGridFooter': true,
      'enableRowSelection': true,
      'enableRowHeaderSelection' : false,
      'multiSelect' : false,
      'modifierKeysToMultiSelect' : false,
      'noUnselect' : true,
      'enableGridMenu': true,
      'rowEditWaitInterval' :-1,
      'gridMenuCustomItems': [
        {
          title: 'Add Employee',
          action: function ($event) {
             emp.formData = {};
             emp.formVisibility = true;
             emp.newEmployee = true;
          },
          order: 210
        }
      ]
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

          emp.saveRows = function(){
            var dirty = emp.gridApi.rowEdit.getDirtyRows(emp.gridApi.grid);
            var dataDirtyRows = dirty.map(function (gridRow) {
                return gridRow.entity;
            });
            console.log(dataDirtyRows);
          /*  if(emp.dataToSave.length > 0)
            {
            dataDirtyRows = employeeClientService.removeSaveFromDirtyRows(dataDirtyRows, emp.dataToSave);
            var saveData = employeeClientService.getSaveData(emp.gridOptions.data, emp.dataToSave);
            if(saveData){
              var saveDataToServer = employeeClientService.getGridDataForServer(saveData);
              employeeService.saveEmployeesUtilization(saveDataToServer)
              .then(function (response){
                emp.dataToSave = [];
                console.log("Saved data");
              }, function(error){
                console.log('Unable to save Employee utilization data: ' + error.message);
              });
            }
          }*/
          if(dataDirtyRows.length > 0){

            var serverRows = employeeClientService.getGridDataForServer(dataDirtyRows);
            console.log(serverRows);
            employeeService.updateEmployees(serverRows)
              .then(function (response){
                console.log("updated rows");
                emp.gridApi.rowEdit.setRowsClean(dataDirtyRows);
              }, function(error){
                console.log('Unable to update Employee utilization data: ' + error.message);
              });
            }
          }


        employeeService.getEmployees()
        .then(function (response) {
            console.log(response);
            var gridData = employeeClientService.getUtilGridData(response.data);
            emp.gridOptions.columnDefs = employeeClientService.getColumnDefs(gridData[0]);
            emp.gridOptions.data = gridData;
            }, function (error) {
                console.log('Unable to load projects data: ' + error.message);
            });

            employeeService.getProjectName()
          .then(function(response){
            emp.ProjectNamelist = employeeClientService.getProjectlist(response.data);
          });
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
