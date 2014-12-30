var mysql_handler = require('../mysql_handler/mysql_handler');


exports.project_list = function(req, res){

  mysql_handler.maintaining_list_by_user_id(req.query, function(d){
  	res.json(d);
  });
}

exports.sales = function(req, res){

  mysql_handler.sales_by_user_id(req.query, function(d){
  	res.json(d);
  });
}



exports.monthly_sales = function(req, res){

  mysql_handler.monthly_sales_by_user_id(req.query, function(d){
  	res.json(d);
  });
}
