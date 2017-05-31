var mongoose = require('mongoose');
var TasksSchema = new mongoose.Schema({
  projects: String,
  prob_of_deal: String,
  rnam_manager: String,
  rnam_director: String,
  status_desc: String,
  status: String,
  egi_staffing: String,
  start_date: String,
  end_date: String
});

module.exports = mongoose.model('TestInventoryCollection1', TasksSchema);