var express = require('express');
var router = express.Router();

var Employee = require('../models/Employee.js');

/* Get all employee details */
router.get('/', function(req, res, next) {
  Employee.find(function (err, employee) {
    if (err) return next(err);
	if(!employee)
		res.json({message : 'No records found'});
    else
		res.json(employee);
  });
});

/* Get specific employee details */
router.get('/:id', function(req, res, next) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) return next(err);
    if(!employee)
		res.json({message : 'No details found for the Employee'});
    else
		res.json(employee);
  });
});

/* Create new Employee entry */
router.post('/', function(req, res, next) {
  Employee.create(req.body, function (err, employee) {
    if (err) return next(err);
    res.json({message : 'Employee record added Successfully'});
  });
});

/* Update existing Employee entry */
router.put('/', function(req, res, next) {
  Employee.findOneAndUpdate({_id : req.body._id}, req.body, function (err, employee) {
    if (err) return next(err);
    res.json({message : 'Employee record updated Successfully'});
  });
});

/* Delete an Employee entry */
router.delete('/:id', function(req, res, next) {
  Employee.findByIdAndRemove(req.params.id, function (err, employee) {
    if (err) return next(err);
    res.json({message : 'Employee record deleted Successfully'});
  });
});

module.exports = router;