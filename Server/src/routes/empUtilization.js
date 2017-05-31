var express = require('express');
var router = express.Router();

var EmpUtilization = require('../models/EmpUtilization.js');

/* Get all employee utilization details */
router.get('/getAllEmployeeUtilization', function(req, res, next) {
  EmpUtilization.find(function (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({message : 'No records found'});
	else
		res.json(empUtilization);
  });
});

/* Get specific employee utilization details */
router.get('/:id', function(req, res, next) {
  EmpUtilization.findById(req.params.id, function (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({message : 'No details found for the Employee'});
	else
		res.json(empUtilization);
  });
});

/* Get employee utilization details for a given year */
router.get('/', function(req, res, next) {
  var yearValue = req.query.year;
  console.log(yearValue);
  EmpUtilization.find({'mapping_dtls.year' : yearValue} , {'mapping_dtls.$' : 1}, function (err, empUtilization) {
    if (err) return next(err);
	if(!empUtilization)
		res.json({message : 'No details found for the Employee'});
	else
		res.json(empUtilization);
  });
});

/* Create new Employee utilization entry */
router.post('/', function(req, res, next) {
  EmpUtilization.create(req.body, function (err, empUtilization) {
    if (err) return next(err);
    res.json({message : 'Employee Utilization record added Successfully'});
  });
});

/* Update existing Employee utilization entry */
router.put('/', function(req, res, next) {
  EmpUtilization.findOneAndUpdate({_id : req.body._id}, req.body, function (err, empUtilization) {
    if (err) return next(err);
    res.json({message : 'Employee Utilization record updated Successfully'});
  });
});

/* Delete an Employee utilization entry */
router.delete('/:id', function(req, res, next) {
  EmpUtilization.findByIdAndRemove(req.params.id, function (err, empUtilization) {
    if (err) return next(err);
    res.json({message : 'Employee Utilization record deleted Successfully'});
  });
});

module.exports = router;