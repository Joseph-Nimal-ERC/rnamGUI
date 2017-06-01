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
      return $http.get('http://localhost:3000/projUtilization');
   };

   this.getReference = function() {
      return $http.get('http://localhost:3000/references');
   };

   this.saveProject = function(data) {
      return $http.post('http://localhost:3000/project', data);
   };
}]);