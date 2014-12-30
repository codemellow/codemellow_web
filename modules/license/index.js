var mysql_handler = require('../mysql_handler/mysql_handler');



exports.list = function(req, res){
	mysql_handler.license_list(req.body, function(data){
		res.json(data);
	});
}


exports.cnt = function(req, res){
	mysql_handler.license_cnt(req.query, function(data){
		res.json(data);
	})
}

exports.read = function(req, res){
	mysql_handler.license_read(req.body, function(data){
		res.json(data);
	})
}