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
     emp.formData = [];

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
             emp.formData = [];
             emp.newEmployee = true;
               emp.formVisibility = false;
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
                        emp.origFormData = row.entity;
                        console.log(row.entity);
                         emp.formData[0] = Object.assign({}, emp.origFormData);
                      //   emp.formData =  emp.formData1[0];
                    /*  employeeService.getEmpById(row.entity.employeeId)
                      .then(function(response){
                        emp.origFormData = response.data;
                        emp.formData = Object.assign({}, emp.origFormData);

                        }, function(error){
                        console.log('Unable to load Employee data: ' + error.message);
                      });*/
                    });
                };

                emp.show=function(){
                  emp.enableForm = true;
                  emp.formVisibility = true;
                    emp.newEmployee = false;
                };

                emp.cancel = function(){
                  emp.formData = emp.origFormData = {};
                  emp.formVisibility = false;
                  emp.newEmployee = false;
                };
                emp.reset = function(){
                  console.log(emp.origFormData);
                  emp.formData = Object.assign({}, emp.origFormData);
                };


          emp.assignProject = function(){
            var row = emp.gridApi.selection.getSelectedRows();
            console.log(row);
            emp.gridOptions.data.push({
              'name': row[0].name,
              'signum' : row[0].signum,
              'projId' :row[0].projId,
              'role':row[0].role,
              'jobStage' : row[0].jobStage,
              'type' :row[0].type,
              'personnelNo' : row[0].personnelNo,
              'status' :row[0].status
            });
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
          };

          emp.save = function(){

          if(emp.newEmployee){
            employeeService.saveEmployee(emp.formData)
              .then(function(response){
                var id = response.data._id;
                emp.dataToSave.push(id)
                console.log("Employee persisted");
                emp.gridOptions.data.push({
                  'EmployeeId': id,
                  'signum' : response.data.signum
                });
                emp.newEployee = false;
              }, function(error){
                console.log("Error saving new Employee");
              });

          }
          else if(!employeeClientService.checkForChange(emp.origFormData, emp.formData)){
                         console.log(emp.formData);
             var serverRows = employeeClientService.getGridDataForServer(emp.formData);
            employeeService.updateEmployees(serverRows)
              .then(function(response){
                console.log("Employee Updated");
              }, function(error){
                console.log("Error while updating Employee");
              })

          }
          else {
            console.log("Nothing to save or update");
          }
        };

        employeeService.getEmployees()
        .then(function (response) {
            console.log(response);
            var gridData = employeeClientService.getUtilGridData(response.data);
            emp.gridOptions.columnDefs = employeeClientService.getColumnDefs(gridData[0]);
            emp.gridOptions.data = gridData;
            }, function (error) {
                console.log('Unable to load Employee data: ' + error.message);
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
