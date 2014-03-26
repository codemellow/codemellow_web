var mysql_handler = require('../mysql_handler/mysql_handler');
var events = require('events');

module.exports = {

	project_name : null,

	init: function(project_name){
		this.project_name = project_name;
	},

	add_contributer: function(project_name, username){
		mysql_handler.insert_new_contributor(project_name, username);
	},

	evaluate: function(){

	}
}