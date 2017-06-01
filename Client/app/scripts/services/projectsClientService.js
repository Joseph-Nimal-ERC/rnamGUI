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
		   	}
	   	return result;
	};
	this.getUtilGridData = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
			row._id = item._id;
			row.projId = item.projId;
			row.projName = item.projName;
			row.months = {};
			item.needGapDtls.forEach(function(needGap){
				for(var key in needGap.months){
					var name = needGap.year.toString().concat(' ').concat(key);
					row.months[name] = needGap.months[key];
				}
			});
			result.push(row);
		});
		return result;
	};

	this.getSaveData = function(data, dataToSaveIds){
			var result = [];
			console.log(data);
			console.log(dataToSaveIds);
			dataToSaveIds.forEach(function(id){
				console.log(id);
				var row = _.find(data, {'projId' : id});
				if(row){
					result.push(row);
				}
			});
			return result;
	};

	this.getGridDataForServer = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
			row._id = item._id;
			row.projId = item.projId;
			row.projName = item.projName;
			row.needGapDtls = [];
			for(var key  in item.months){
				var year = key.substring(0,4);
				var month = key.substring(5);
				var gapEntity = _.find(row.needGapDtls, {'year' : parseInt(year)});
				if(gapEntity){
					gapEntity.months[month] = item.months[key];
				}
				else{
					var newEntry = {
						'year' : null,
						'months' : {}
					};
					newEntry.year = parseInt(year);
					newEntry.months[month] = item.months[key];
					row.needGapDtls.push(newEntry);
				}
			}
			result.push(row);
		});
		return result;
	}

	this.removeSaveFromDirtyRows = function(data, dataToSaveIds) {
		dataToSaveIds.forEach(function(id){
			_.remove(data, { 'projId' : id});
		})
		return data;
	}
	this.getGapData = function(data, rowEntity, colDef, needDif){
		var gap = colDef.name.substring(0,4).concat('Gap');
		var oldGap = rowEntity.months[gap];
		var newGap = 0;
		if(oldGap){
			newGap = parseInt(oldGap)-parseInt(needDif);
		}
		else {
			newGap = 0-parseInt(needDif);
		}
		rowEntity.months[gap] = newGap;
		var index = _.findIndex(data, {'projId' : rowEntity.projId});
		data.splice(index, 1, rowEntity);
		 return data;
	};

	this.getSaveRows = function(data, dataToSaveId){

		return _(data)
    .filter(c => dataToSaveId.indexOf(c.projId))
    .value();
	}
}]);