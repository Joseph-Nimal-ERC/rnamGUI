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
  .constant('_', window._);
