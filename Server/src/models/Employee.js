var mongoose = require('mongoose');
var EmployeeScehma = new mongoose.Schema({
  signum: String,
  name: String,
  jobStage: String,
  role: String,
  location: String,
  teamName: String,
  pool: String,
  expDetails: 
  {
	  Tot_exp : String,
	  EOC_exp : String,
	  ECM_exp : String,
	  HO_month : String
  }
  
});

module.exports = mongoose.model('employeeCollection', EmployeeScehma);