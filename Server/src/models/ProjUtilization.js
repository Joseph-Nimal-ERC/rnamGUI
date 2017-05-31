var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ProjUtilizationScehma = new mongoose.Schema({
  projName: String,
  need_Gap_dtls: [
  {
	 year: Number,
	  months : {
		  Jan_Need : Number,
		  Jan_Gap : Number,
		  Feb_Need : Number,
		  Feb_Gap : Number,
		  Mar_Need : Number,
		  Mar_Gap : Number,
		  Apr_Need : Number,
		  Apr_Gap : Number,
		  Jun_Need : Number,
		  Jun_Gap : Number,
		  Jul_Need : Number,
		  Jul_Gap : Number,
		  Aug_Need : Number,
		  Aug_Gap : Number,
		  Sep_Need : Number,
		  Sep_Gap : Number,
		  Oct_Need : Number,
		  Oct_Gap : Number,
		  Nov_Need : Number,
		  Nov_Gap : Number,
		  Dec_Need: Number,
		  Dec_Gap : Number
		}
  }
  ],
  projId : {type : Schema.ObjectId, ref : 'projectCollection'}
});

module.exports = mongoose.model('projUtilizationCollection', ProjUtilizationScehma);