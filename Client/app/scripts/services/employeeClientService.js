'use strict';

angular.module('rnaminventoryApp')
.service('employeeClientService',  function(){

  this.getColumnDefs = function(data){
      console.log(data);
    var result = [];
    result.push(
    { 
            'field': 'name',
            'name': 'name',
              'enableCellEdit' : false,
            'minWidth': 50
          },
          { 
            'field': 'signum',
            'name': 'signum',
              'enableCellEdit' : false,
            'minWidth': 50
          }
    );
    for(var key in data.Mapping_dtls[0].months){
      var fieldName = 'Mapping_dtls[0].months.'.concat(key);
      result.push(
      { 
              'field': fieldName,
              'name': key,
              'enableFiltering': false,
              'enableCellEdit' : true,
              'minWidth' : 50,
          'cellClass' : function(grid, row, col) {
              if (grid.getCellValue(row,col) < 0) {
                return 'red';
              }
              else if (grid.getCellValue(row,col) > 0) {
                return 'orange';
              }
              else if (grid.getCellValue(row,col) === 0) {
                return 'green';
              }
            }
          }
      );
      }
      return result;
  };

});