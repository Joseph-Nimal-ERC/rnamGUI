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
		
			for(var key in data.months){
				var fieldName = 'months.'.concat(key);
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
		   	};
	   
	   	return result;
	};
	this.getUtilGridData = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
			row['projId'] = item.projId;
			row['projName'] = item.projName;
			row['months'] = {};
			item.needGapDtls.forEach(function(needGap){
				for(var key in needGap.months){
					var name = needGap.year.concat(' ').concat(key);
					row.months[name] = needGap.months[key];
				}
			});
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