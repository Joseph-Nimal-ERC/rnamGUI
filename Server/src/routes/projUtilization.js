var express = require('express');
var router = express.Router();

var ProjUtilization = require('../models/ProjUtilization.js');
var EmpUtilization = require('../models/EmpUtilization.js');

/* Get all Project utilization details */
router.get('/getAllProjectUtilization', function(req, res, next) {
  ProjUtilization.find(function (err, projUtilization) {
    if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No records found'});
	else
		res.json(projUtilization);
  });
});

/* Get specific Project utilization details */
router.get('/:id', function(req, res, next) {
  ProjUtilization.findById(req.params.id, function (err, projUtilization) {
    if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No details found for the Project'});
	else
		res.json(projUtilization);
  });
});

/* Get project gap value using projectId, year, month and need */
router.get('/', function(req, res, next) {
  var projectId = req.query.projectId;
  var year = req.query.year;
  var month = req.query.month;
  var need = req.query.need;
  var allocatedResources = 0;
  var monthTagName = 'mapping_dtls.months.'+ month;
  console.log('inside gap');
  EmpUtilization.find({'mapping_dtls.projId' : projectId, 'mapping_dtls.year' : year, 'mapping_dtls.status' : 'Committed'}).where(monthTagName).equals(1).exec(function (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({GAP : -(need)});
	else{
		empUtilization.forEach(function(empUtilRecord){
			allocatedResources = allocatedResources + 1;
			console.log(allocatedResources);
		});
		console.log('final gap : ' + (need-allocatedResources));
		res.json({GAP : -(need-allocatedResources)});
	}
  });
});

/* Get employee utilization details for a given year */
router.get('/getUtilizationForYear/:year', function(req, res, next) {
  var yearValue = req.params.year;
  console.log(yearValue);
  ProjUtilization.find({'need_Gap_dtls.year' : yearValue} , {'need_Gap_dtls.$' : 1}, function (err, projUtilization) {
    if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No details found for the project'});
	else
		res.json(projUtilization);
  });
});


/* Get Project utilization details for given year range */
router.get('/', function(req, res, next) {
  var fromYearValue = req.query.fromyear;
  var toYearValue = req.query.toyear;
  ProjUtilization.find({'need_Gap_dtls.year': {$gte:fromYearValue, $lte : toYearValue}},function (err, projUtilization) {
   if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No details found for the projecttreses'});
	else
		res.json(projUtilization);
  });
});
	
});

/* Create new Project utilization entry */
router.post('/', function(req, res, next) {
	ProjUtilization.create(req.body, function(err, projUtilization){
		if(err)
			next(err);
		else
			res.json(projUtilization);
		});
})

/* Update existing Project utilization entry */
router.put('/', function(req, res, next) {
	for(var key in req.body){
		var reqBody = req.body[key];
		ProjUtilization.findByIdAndUpdate({_id : reqBody._id}, reqBody, function(err, projUtilization){
			if (err) 
				return next(err);
		});
	}
	 res.json({message : 'Project Utilization record(s) updated Successfully'});
});

/* Delete an Project utilization entry */
router.delete('/:id', function(req, res, next) {
  ProjUtilization.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json({message : 'Project Utilization record deleted Successfully'});
  });
});

module.exports = router;