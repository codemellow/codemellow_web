
var mysql_handler = require('../mysql_handler/mysql_handler');

function get_puchased_license(){

};

exports.user_info_page_view = function(req, res){
	var self = this;

	res.render('user/user_info_page', req.render_info);
};