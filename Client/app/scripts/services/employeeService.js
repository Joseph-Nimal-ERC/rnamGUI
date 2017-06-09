'use strict';

angular.module('rnaminventoryApp')
.service('employeeService', ['$http', function($http){
   this.getEmployees = function() {
        return $http.get('http://localhost:3000/employee');
   };

   this.getProjectName =function()
   {
      return $http.get('http://localhost:3000/project');
   };
   this.updateEmployees=function(data)
   {
     return $http.put('http://localhost:3000/employee',data);
   };
}]);
