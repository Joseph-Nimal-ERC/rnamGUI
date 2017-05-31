var express = require('express');
var router = express.Router();

var Tasks = require('../models/Tasks.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Tasks.find(function (err, tasks) {
	console.log('Inside get - START');
	console.log(tasks);
	
    if (err) return next(err);
	res.json(tasks);
	console.log('Inside get - END');
  });
});

router.get('/getTask/:projectId', function(req, res, next) {
  Tasks.findById(req.params.projectId,function (err, tasks) {
	console.log('Inside get - START');
    if (err) return next(err);
	console.log(err);
	res.json(tasks);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Tasks.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;