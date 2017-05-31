'use strict';

angular.module('rnaminventoryApp')
.service('employeeService', ['$http', function($http){
   this.getEmployees = function() {
      return $http.get("./emp.json");
   };
}]);