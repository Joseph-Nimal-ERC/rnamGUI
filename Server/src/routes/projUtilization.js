var express = require('express');
var router = express.Router();

var ProjUtilization = require('../models/ProjUtilization.js');

/* Get all Project utilization details */
router.get('/', function(req, res, next) {
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


/* Create new Project utilization entry */
router.post('/', function(req, res, next) {
	for(var key in req.body){
		var reqBody = req.body[key];
		ProjUtilization.create(reqBody, function (err, projUtilization) {
			if (err) 
				return next(err);
		});
	}	
	 res.json({message : 'Project Utilization record(s) added Successfully'});
});

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