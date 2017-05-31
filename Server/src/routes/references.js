var express = require('express');
var router = express.Router();

var References = require('../models/References.js');

/* Get all References utilization details */
router.get('/references', function(req, res, next) {
  References.find(function (err, References) {
    if (err) return next(err);
    res.json(References);
  });
});

module.exports = router;