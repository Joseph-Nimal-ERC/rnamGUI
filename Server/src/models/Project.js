var mongoose = require('mongoose');
var ProjectCollectionSchema = new mongoose.Schema({
  projName: String,
  probOfDeal: String,
  region: String,
  manager: String,
  Director: String,
  start_dt: String,
  end_dt: String,
  remarks : String,
  status: String,
  EGIStaffing: String
});

module.exports = mongoose.model('projectCollection', ProjectCollectionSchema);