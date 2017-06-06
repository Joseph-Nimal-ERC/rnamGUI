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
    for(var key in data.months){
				var fieldName = 'months.'.concat(key);
				result.push(
				{
		            'field': fieldName,
		            'name': key,
		            'enableFiltering': false,
		            'enableCellEdit' : true,
		            'minWidth' : 50,
				    'cellClass' : 'red'
		        }
				);
		   	}
      return result;
  };

  this.getUtilGridData = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
			row._id = item._id;
      row.name = item.name;
			row.signum = item.signum;
			row.months = {};
			item.mapping_dtls.forEach(function(mapping){
				for(var key in mapping.months){
					var name = mapping.year.toString().concat(' ').concat(key);
					row.months[name] = mapping.months[key];
				}
			});
			result.push(row);
		});
		return result;
	};

});
