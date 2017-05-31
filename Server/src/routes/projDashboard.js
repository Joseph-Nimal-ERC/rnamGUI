var express = require('express');
var router = express.Router();

var ProjUtilization = require('../models/ProjUtilization.js');

/* Get all project dashboard details */
router.get('/getAllProjectDashboardInfo', function(req, res, next) {
  ProjUtilization.find({}).populate('projId').exec(function (err, projUtilization) {
    if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No records found'});
    else
		res.json(projUtilization);
  });
});

/* Get specific project dashboard details */
router.get('/:id', function(req, res, next) {
  ProjUtilization.findById(req.params.id).populate('projId').exec(function (err, projUtilization) {
    if (err) 
		return next(err);
	if(!projUtilization)
		res.json({message : 'No details found for the project'});
	else
		res.json(projUtilization);
  });
});

/* Get unutilized project details for a month*/
router.get('/', function(req, res, next) {
  var yearValue = req.query.year;
  var monthValue4Need = 'need_Gap_dtls.months.' + req.query.month + '_Need';
  var monthValue4Gap = 'need_Gap_dtls.months.' + req.query.month + '_Gap';
  ProjUtilization.find().where('need_Gap_dtls.year').equals(yearValue).where(monthValue4Need).equals("").where(monthValue4Gap).equals("").populate('projId').exec(function (err, projUtilization) {
    if (err) return next(err);
	if(!projUtilization)
		res.json({message : 'No records found for the given year and month'});
	else
		res.json(projUtilization);
  });
});



module.exports = router;