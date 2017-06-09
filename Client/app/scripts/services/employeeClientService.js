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
          },
        {
            'field': 'projId',
            'name': 'Project',
            'enableCellEdit' : false,
            'minWidth': 50
        },
        {
          'field': 'role',
          'name': 'Role',
          'enableCellEdit' : false,
          'minWidth': 50
      },
      {
        'field': 'jobStage',
        'name': 'Job_Stage',
        'enableCellEdit' : false,
        'minWidth': 50
    },
    {
      'field': 'type',
      'name': 'type',
      'enableCellEdit' : false,
      'minWidth': 50
  },
  {
    'field': 'personnelNo',
    'name': 'Personnel No',
    'enableCellEdit' : false,
    'minWidth': 50
  },
  {
    'field': 'status',
    'name': 'Status',
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

  this.getProjectlist = function(data){
    var project =[];
     data.forEach(function(item){
       var list={};
       list.projName=item.projName;
       list.projId=item._id;
      project.push(list);
  })
  return project;

};
this.getGridDataForServer = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
      row._id = item.employeeId;
      row.name = item.name;
      row.signum = item.signum;
      row.role = item.role;
      row.personnelNo = item.personnelNo;
      row.type = item.type;
      row.businessArea =item.businessArea;
      row.product =item.product;
      row.location = item.location;
      row.teamName = item.teamName;
      row.egiLineManager =item.egiLineManager;
      row.pool=item.pool;
      row.jobStage = item.jobStage;
			row.mapping_dtls = [];
			for(var key  in item.months){
				var year = key.substring(0,4);
				var month = key.substring(5);
        var projId = item.projId;
        var status = mapping.status;
        var CU=mapping.CU;
				var mappingEntity = _.find(row.mapping_dtls, {'year' : parseInt(year)});
				if(mappingEntity){
					mappingEntity.months[month] = item.months[key];
				}
				else{
					var newEntry = {
						'year' : null,
            'projId' :null,
            'status' :null,
            'CU' : null,
						'months' : {}

					};
					newEntry.year = parseInt(year);
					newEntry.months[month] = item.months[key];
          newEntry.projId=projId;
          newEntry.status = status;
          newEntry.CU = CU;
					row.mapping_dtls.push(newEntry);
				}
			}
			result.push(row);
		});
		return result;
	};

  this.getUtilGridData = function(data){
		var result = [];
		data.forEach(function(item){
			var row = {};
			row.employeeId = item._id;
      row.name = item.name;
			row.signum = item.signum;
      row.role = item.role;
      row.personnelNo = item.personnelNo;
      row.type = item.type;
      row.businessArea =item.businessArea;
      row.product =item.product;
      row.location = item.location;
      row.teamName = item.teamName;
      row.egiLineManager =item.egiLineManager;
      row.pool=item.pool;
      row.jobStage = item.jobStage;
			row.months = {};
			item.mapping_dtls.forEach(function(mapping){
				for(var key in mapping.months){
  row.projId = mapping.projId;
          row.status = mapping.status;
          row.CU=mapping.CU;
					var name = mapping.year.toString().concat(' ').concat(key);
					row.months[name] = mapping.months[key];
				}
			});
			result.push(row);
		});
		return result;
	};

});
