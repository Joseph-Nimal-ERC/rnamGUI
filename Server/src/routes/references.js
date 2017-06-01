var express = require('express');
var router = express.Router();

var References = require('../models/References.js');

/* Get all References utilization details */
router.get('/', function(req, res, next) {
  References.find(function (err, references) {
    if (err) return next(err);
    res.json(references);
  });
});

router.post	('/', function(req, res, next) {
  References.create(req.body,function (err, references) {
    if (err) return next(err);
    res.json({message : 'References record(s) added Successfully'});
  });
});

module.exports = router;