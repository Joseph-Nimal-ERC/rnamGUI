var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ProjUtilizationScehma = new mongoose.Schema({
  projName: String,
  need_Gap_dtls: [
  {
	 year: String,
	  months : {
		  Jan_Need : String,
		  Jan_Gap : String,
		  Feb_Need : String,
		  Feb_Gap : String,
		  Mar_Need : String,
		  Mar_Gap : String,
		  Apr_Need : String,
		  Apr_Gap : String,
		  Jun_Need : String,
		  Jun_Gap : String,
		  Jul_Need : String,
		  Jul_Gap : String,
		  Aug_Need : String,
		  Aug_Gap : String,
		  Sep_Need : String,
		  Sep_Gap : String,
		  Oct_Need : String,
		  Oct_Gap : String,
		  Nov_Need : String,
		  Nov_Gap : String,
		  Dec_Need: String,
		  Dec_Gap : String
		}
  }
  ],
  projId : {type : Schema.ObjectId, ref : 'projectCollection'}
});

module.exports = mongoose.model('projUtilizationCollection', ProjUtilizationScehma);