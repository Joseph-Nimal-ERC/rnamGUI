var express = require('express');
var router = express.Router();

var EmpUtilization = require('../models/EmpUtilization.js');

/* Get all employee utilization details */
router.get('/', function(req, res, next) {
  EmpUtilization.find(function (err, employee) {
    if (err) return next(err);
    res.json(EmpUtilization);
  });
});

/* Get specific employee utilization details */
router.get('/:id', function(req, res, next) {
 console.log('Inside');
  EmpUtilization.findById(req.params.id, function (err, employee) {
    if (err) return next(err);
    res.json(EmpUtilization);
  });
});

/* Get specific employee and utilization details */
router.get('/getEmpAndUtilization/:id', function(req, res, next) {
	console.log('Inside getEmpAndUtilization');
  EmpUtilization.findById(req.params.id).populate('employeeId').exec(function (err, employee) {
	  console.log('Inside getEmpAndUtilization findById');
    if (err) return next(err);
    res.json(EmpUtilization);
  });
});

/* Create new Employee utilization entry */
router.post('/', function(req, res, next) {
  EmpUtilization.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json({message : 'Employee Utilization record added Successfully'});
  });
});

/* Delete an Employee utilization entry */
router.delete('/:id', function(req, res, next) {
  EmpUtilization.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json({message : 'Employee Utilization record deleted Successfully'});
  });
});

module.exports = router;