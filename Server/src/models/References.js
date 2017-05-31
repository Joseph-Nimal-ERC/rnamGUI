var mongoose = require('mongoose');
var references = new mongoose.Schema({
  region: String,
  managerList: Array,
  directorList: Array,
  egiLM: Array,
});

module.exports = mongoose.model('referenceSCollection', references);
