'use strict';

angular.module('rnaminventoryApp')
  .controller('ProjectsCtrl',['projectsService', 'projectsClientService', 'uiGridConstants', function (projectsService, projectsClientService, uiGridConstants) {
    console.log('projects');
    var proj = this;
    proj.origFormData = {};
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
              proj.formVisibility = true;
              
            projectsService.getProjectById(row.entity.projId)
              .then(function(response){
                proj.origFormData = response.data;
                proj.formData = Object.assign({}, proj.origFormData);
                console.log(proj.formData);
              }, function(error){
                console.log('Unable to load project data: ' + error.message);
              });
          });
          gridApi.edit.on.afterCellEdit(null,function(rowEntity, colDef, newValue, oldValue,row,col){
            var newNeed = newValue-oldValue;
            proj.gridOptions.data = projectsClientService.getGapData(proj.gridOptions.data, rowEntity,colDef,newNeed);
          })
        }
    };

    proj.reset = function(){
      console.log(proj.origFormData);
      proj.formData = Object.assign({}, proj.origFormData);
    };

    proj.save = function(){
      projectsService.saveProject(proj.formData)
        .then(function(response){
          console.log("Project persisted");
          proj.gridOptions.data.push({
            'projId': response.data._id,
            'projName' : response.data.projects
          });
        });
    };
    proj.toggleFiltering = function(){
      proj.gridOptions.enableFiltering = !proj.gridOptions.enableFiltering;
      proj.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

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


