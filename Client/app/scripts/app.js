'use strict';

/**
 * @ngdoc overview
 * @name rnaminventoryApp
 * @description
 * # rnaminventoryApp
 *
 * Main module of the application.
 */
angular
  .module('rnaminventoryApp', [
    'ngResource',
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.pinning',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.autoResize',
    'ui.grid.pagination', 
    'ui.grid.rowEdit'
  ])
  .config(function ($routeProvider,$locationProvider) {

  $locationProvider.hashPrefix(''); 
    $routeProvider
      .when('/', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'proj'
      })
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl',
        controllerAs: 'emp'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('_', window._)
  .filter('mapProject', function() {
  var projectHash = {
    1: 'Project1',
    2: 'Project2'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return projectHash[input];
    }
  };
}); 

