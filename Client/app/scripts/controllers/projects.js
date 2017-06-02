'use strict';

angular.module('rnaminventoryApp')
  .controller('ProjectsCtrl',['projectsService', 'projectsClientService', 'uiGridConstants', function (projectsService, projectsClientService, uiGridConstants) {
    console.log('projects');
    var proj = this;
    proj.origFormData = {};
    proj.dataToSave = [];
    proj.formVisibility = false;
    proj.newProject = false;
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
               proj.newProject = true;
            },
            order: 210
          }
        ],
       
        onRegisterApi: function(gridApi){
          proj.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged(null, function(row){
                proj.formVisibility = true;
            projectsService.getProjectById(row.entity.projId)
              .then(function(response){

                proj.origFormData = response.data;
                proj.formData = Object.assign({}, proj.origFormData);
                proj.managerName.value = proj.formData.manager;
                console.log(proj.managerName.value);
                proj.directorName.value = proj.formData.Director;
                console.log(proj.directorName.value);
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
  
    proj.cancel = function(){
     proj.formVisibility = false; 
    }

    proj.cancel = function(){
      proj.formData = proj.origFormData = {};
      proj.formVisibility = false;
      proj.newProject = false;
    }

    proj.reset = function(){
      console.log(proj.origFormData);
      proj.formData = Object.assign({}, proj.origFormData);
    };

    proj.save = function(){
      if(proj.newProject){
        projectsService.saveProject(proj.formData)
          .then(function(response){
            var id = response.data._id;
            proj.dataToSave.push(id)
            console.log("Project persisted");
            proj.gridOptions.data.push({
              'projId': id,
              'projName' : response.data.projName
            });
            proj.newProject = false;
          }, function(error){
            console.log("Error saving new project");
          });

      }
      else if(!projectsClientService.checkForChange(proj.origFormData, proj.formData)){
        projectsService.updateProject(proj.formData)
          .then(function(response){
            console.log("Project Updated");
          }, function(error){
            console.log("Error while updating project");
          })
        
      }
      else {
        console.log("Nothing to save or update");
      }
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
                proj.managerList = response.data[0].managerList;
                proj.managerName = {   "type": "select", 
                "name": "Manager",
                "value": null, 
                "values": proj.managerList 
            };
                proj.directorList = response.data[0].directorList;
                proj.directorName = {   "type": "select", 
                "name": "Director",
                "value": null, 
                "values": proj.directorList 
            };
                proj.egiLM = response.data[0].egiLM;
            }, function (error) {
                console.log('Unable to load project utilization data: ' + error.message);
            });
        proj.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);


