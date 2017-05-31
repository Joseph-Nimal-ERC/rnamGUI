'use strict';

angular.module('rnaminventoryApp')
.service('projectsService', ['$http', function($http){
   this.getProjects = function() {
      return $http.get('http://localhost:3000/project');
   };

   this.getProjectById = function(id) {
      return $http.get('http://localhost:3000/project/getTask/'.concat(id));
   };

   this.getProjectsUtilization = function() {
      return $http.get('../projUtil.json');
   };

   this.saveProject = function(data) {
      return $http.post('http://localhost:3000/project', data);
   };
}]);