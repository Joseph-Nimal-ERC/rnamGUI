var mongoose = require('mongoose');
Schema = mongoose.Schema;
var EmpUtilizationScehma = new mongoose.Schema({
  signum: String,
  name: String,
  approvedbyRNAMOSS: String,
  CU: String,
  location: String,
  status: String,
  mapping_dtls: [ 
  {
	year: String,
	  months : 
	  {
		  Jan : String,
		  Feb : String,
		  Mar : String,
		  Apr : String,
		  Jun : String,
		  Jul : String,
		  Aug : String,
		  Sep : String,
		  Oct : String,
		  Nov : String,
		  Dec : String
	  }
  }
  ],
  employeeId : {type : Schema.ObjectId, ref : 'employeeCollection'}
});

module.exports = mongoose.model('empUtilizationCollection', EmpUtilizationScehma);