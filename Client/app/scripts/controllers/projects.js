'use strict';

angular.module('rnaminventoryApp')
  .controller('ProjectsCtrl',['projectsService', 'projectsClientService', 'uiGridConstants', function (projectsService, projectsClientService, uiGridConstants) {
    console.log('projects');
    var proj = this;
    proj.origFormData = {};
    proj.dataToSave = [];
    proj.formVisibility = false;
    proj.formData = {};
    proj.managerNames = ["Anurag", "Ranjeet", "Rajesh"];
    proj.gridOptions = {
        'enableSorting': true,
        'enableFiltering': true,
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
            title: 'Add Project',
            action: function ($event) {
               proj.formData = {};
               proj.formVisibility = true;
            },
            order: 210
          }
        ],
       
        onRegisterApi: function(gridApi){
          proj.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged(null, function(row){
                
            projectsService.getProjectById(row.entity.projId)
              .then(function(response){

                proj.origFormData = response.data;
                proj.formData = Object.assign({}, proj.origFormData);
                proj.formVisibility = true;
              
              }, function(error){
                console.log('Unable to load project data: ' + error.message);
              });
          });
          gridApi.edit.on.afterCellEdit(null,function(rowEntity, colDef, newValue, oldValue,row,col){
            var month = colDef.name.substring(5,8);
            var year=colDef.name.substring(0,4);
        		var Need = newValue;
            var gap = colDef.name.substring(0,9).concat('Gap');
            console.log(gap);
            projectsService.getGapData(rowEntity.projId,year,month,Need)
            .then(function(response){
              rowEntity.months[gap] = response.data.GAP;
              console.log(rowEntity.months[gap]);
            })
          // var newNeed = newValue-oldValue;
        //  proj.gridOptions.data = projectsClientService.getGapData(proj.gridOptions.data, rowEntity,colDef,newNeed);
        });
    }
  };

    proj.reset = function(){
      console.log(proj.origFormData);
      proj.formData = Object.assign({}, proj.origFormData);
    };

    proj.save = function(){
      projectsService.saveProject(proj.formData)
        .then(function(response){
          var id = response.data._id;
          proj.dataToSave.push(id)
          console.log("Project persisted");
          proj.gridOptions.data.push({
            'projId': id,
            'projName' : response.data.projName
          });
        });
    };

    proj.toggleFiltering = function(){
      proj.gridOptions.enableFiltering = !proj.gridOptions.enableFiltering;
      proj.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    proj.saveRows = function(){
      var dirty = proj.gridApi.rowEdit.getDirtyRows(proj.gridApi.grid);
      var dataDirtyRows = dirty.map(function (gridRow) {
          return gridRow.entity;
      });
      console.log(dataDirtyRows);
      if(proj.dataToSave.length > 0)
      {
      dataDirtyRows = projectsClientService.removeSaveFromDirtyRows(dataDirtyRows, proj.dataToSave);
      var saveData = projectsClientService.getSaveData(proj.gridOptions.data, proj.dataToSave);
      if(saveData){
        var saveDataToServer = projectsClientService.getGridDataForServer(saveData);
        projectsService.saveProjectsUtilization(saveDataToServer)
        .then(function (response){
          proj.dataToSave = [];
          console.log("Saved data");
        }, function(error){
          console.log('Unable to save project utilization data: ' + error.message);
        });
      }
    }   
    console.log(dataDirtyRows);
    if(dataDirtyRows.length > 0){

      var serverRows = projectsClientService.getGridDataForServer(dataDirtyRows);
      projectsService.updateProjectsUtilization(serverRows)
        .then(function (response){
          console.log("updated rows");
          proj.gridApi.rowEdit.setRowsClean(dataDirtyRows);
        }, function(error){
          console.log('Unable to update project utilization data: ' + error.message);
        });
      }
    }
    projectsService.getProjectsUtilization()
        .then(function (response) {
                var gridData = projectsClientService.getUtilGridData(response.data);
                proj.gridOptions.columnDefs = projectsClientService.getColumnDefs(gridData[0]);
                proj.gridOptions.data = gridData;
            }, function (error) {
                console.log('Unable to load project utilization data: ' + error.message);
            });

        projectsService.getReference()
        .then(function (response) {
                proj.managerList = response.data.managerList;
                proj.directorList = response.data.directorList;
                proj.egiLM = response.data.egiLM;
            }, function (error) {
                console.log('Unable to load project utilization data: ' + error.message);
            });
        proj.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);


