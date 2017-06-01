'use strict';

angular.module('rnaminventoryApp')
.service('projectsService', ['$http', function($http){
   this.getProjects = function() {
      return $http.get('http://localhost:3000/project');
   };

   this.getProjectById = function(id) {
      return $http.get('http://localhost:3000/project/'.concat(id));
   };

   this.getProjectsUtilization = function() {
    //  return $http.get('../projUtil.json');
      return $http.get('http://localhost:3000/projUtilization/getAllProjectUtilization');
   };

   this.saveProjectsUtilization = function(data) {
      return $http.post('http://localhost:3000/projUtilization', data);
   };
   
    this.getGapData=function(projId,year,month,need)
   {
     console.log('http://localhost:3000/projUtilization?projectId='+projId+'&year='+year+'&month='+month+'&need='+need);
     return $http.get('http://localhost:3000/projUtilization?projectId='+projId+'&year='+year+'&month='+month+'&need='+need);
   };

   this.updateProjectsUtilization = function(data) {
      return $http.put('http://localhost:3000/projUtilization', data);
   };

   this.getReference = function() {
      return $http.get('http://localhost:3000/references');
   };

   this.saveProject = function(data) {
      return $http.post('http://localhost:3000/project', data);
   };
}]);