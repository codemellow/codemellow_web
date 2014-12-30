var mysql_handler = require('../mysql_handler/mysql_handler');
var payment=require("../payment/pay_module");

exports.req = function(req, res){
	payment.donate_req(req,res);
}


exports.insert = function(req, res){
	mysql_handler.donate_insert(req.body, function(data){
		res.json(data);
	});
}




exports.update = function(req, res){
	mysql_handler.donate_update(req.body, function(data){
		res.json(data);
	})
}



exports.list = function(req, res){
	mysql_handler.donate_list(req.body, function(data){
		res.json(data);
	})
}


exports.get_info = function(req, res){
	mysql_handler.get_donate_info(req.query, function(data){
		res.json(data);
	})
}