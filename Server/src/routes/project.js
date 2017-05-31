var express = require('express');
var router = express.Router();

var Project = require('../models/Project.js');

/* Get all project details */
router.get('/', function(req, res, next) {
  Project.find(function (err, project) {
    if (err) return next(err);
    res.json(project);
  });
});

/* Get specific project details */
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, project) {
    if (err) return next(err);
    res.json(project);
  });
});

/* Create new project entry */
router.post('/', function(req, res, next) {
  Project.create(req.body, function (err, project) {
    if (err) return next(err);
    res.json({message : 'Project record added Successfully'});
  });
});

/* Update existing project entry */
router.put('/', function(req, res, next) {
  Project.findOneAndUpdate({_id : req.body._id}, req.body, function (err, project) {
    if (err) return next(err);
    res.json({message : 'Project record updated Successfully'});
  });
});

/* Delete a project entry */
router.delete('/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json({message : 'Project record deleted Successfully'});
  });
});

module.exports = router;