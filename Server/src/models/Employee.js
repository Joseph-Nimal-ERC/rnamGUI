var mongoose = require('mongoose');
var EmployeeScehma = new mongoose.Schema({
  signum: String,
  name: String,
  personnelNo: String,
  type: String,
  jobStage: String,
  role: String,
  businessArea : String,
  product : String,
  location: String,
  teamName: String,
  egiLineManager : String,
  pool: String,  
  mapping_dtls: [ 
  {
                year: Number,
                projId : {type : Schema.ObjectId, ref : 'projectCollection'},
                status : String,
				CU: String,
                months : 
                  {
                                  Jan : Number,
                                  Feb : Number,
                                  Mar : Number,
                                  Apr : Number,
								  May : Number,
                                  Jun : Number,
                                  Jul : Number,
                                  Aug : Number,
                                  Sep : Number,
                                  Oct : Number,
                                  Nov : Number,
                                  Dec : Number
                  }
  }]
});

module.exports = mongoose.model('employeeCollection', EmployeeScehma);

