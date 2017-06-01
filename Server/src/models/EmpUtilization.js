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
	year: Number,
	projId : {type : Schema.ObjectId, ref : 'projectCollection'},
	status : String,
	  months : 
	  {
		  Jan : Number,
		  Feb : Number,
		  Mar : Number,
		  Apr : Number,
		  Jun : Number,
		  Jul : Number,
		  Aug : Number,
		  Sep : Number,
		  Oct : Number,
		  Nov : Number,
		  Dec : Number
	  }
  }
  ],
  employeeId : {type : Schema.ObjectId, ref : 'employeeCollection'}
});

module.exports = mongoose.model('empUtilizationCollection', EmpUtilizationScehma);