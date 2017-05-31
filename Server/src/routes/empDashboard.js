var express = require('express');
var router = express.Router();

var EmpUtilization = require('../models/EmpUtilization.js');

/* Get all emplyee dashboard details */
router.get('/getAllEmployeeDashboardInfo', function(req, res, next) {
  EmpUtilization.find({}).populate('employeeId').exec(function (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({message : 'No Dashbaord details found'});
    else
		res.json(empUtilization);
  });
});

/* Get specific emplyee dashboard details */
router.get('/:id', function(req, res, next) {
  EmpUtilization.findById(req.params.id).populate('employeeId').exec(function (err, empUtilization) {
    if (err) 
		return next(err);
	if(!empUtilization)
		res.json({message : 'No Dashbaord details found for the given Employee'});
	else
		res.json(empUtilization);
  });
});

/* Get unutilized employee details */
router.get('/', function(req, res, next) {
  var yearValue =  req.query.year;
  console.log(yearValue);
  var monthTagName = 'mapping_dtls.months.' + req.query.month;
  console.log(monthTagName);
  EmpUtilization.find({'mapping_dtls.year' : yearValue}).where(monthTagName).ne('1.0').populate('employeeId').exec(function 
  (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({message : 'No Dashbaord details found for the given year and month'});
	else
		res.json(empUtilization);
  });
});



module.exports = router;