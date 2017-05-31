'use strict';

angular.module('rnaminventoryApp')
.service('projectsClientService', ['_', function(_){

	this.getColumnDefs = function(data){
		var result = [];
		result.push(
		{ 
            'field': 'projName',
            'name': 'Project Name',
            'pinnedLeft' : true,
            'enableCellEdit' : false,
            'minWidth': 150,
            'cellClass' : 'red',
            'enableHiding': false
        }
		);
		for(var key in data.needGapDtls.months){
			var fieldName = 'needGapDtls.months.'.concat(key);
			result.push(
			{ 
	            'field': fieldName,
	            'name': key,
	            'enableFiltering': false,
	            'enableCellEdit' : true,
	            'minWidth' : 90,
			    'cellClass' : 'red'
	        }
			);
	   	}
	   	return result;
	};
	this.getUtilGridData = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {
				'projId' : item.projId,
				'projName' : item.projName,
				
			};
			result.push(row);
		});
		return result;
	};

	this.getGapData = function(data, rowEntity, colDef, needDif){
		var gap = colDef.name.substring(0,4).concat('Gap');
		var oldGap = rowEntity.needGapDtls.months[gap];
		var newGap = 0;
		if(oldGap){
			newGap = parseInt(oldGap)-parseInt(needDif);
		}
		else {
			newGap = 0-parseInt(needDif)
		}
		rowEntity.needGapDtls.months[gap] = newGap;
		var index = _.findIndex(data, {'projId' : rowEntity.projId});
		data.splice(index, 1, rowEntity);
		 return data;
	}
}]);