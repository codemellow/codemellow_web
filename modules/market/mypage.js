
var mysql_handler = require('../mysql_handler/mysql_handler');

function get_puchased_license(){

};

exports.mypage_view = function(req, res){
	var self = this;

	res.render('market/mypage', req.render_info);
};