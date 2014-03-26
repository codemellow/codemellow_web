
/*
 * GET home page.
 */

var path = require('path');
var fs= require('fs')
var project=require('../modules/project/project');
//var mysql_handler=require('../mysql_handler/mysql_handler');
var elastic_search_handler=require('../modules/elastic_search_handler/elastic_search_handler');

var payment=require("../modules/payment/pay_module");


exports.error_404 = function(req,res){
  res.writeHead(404);
  res.end();
};

exports.robots_txt = function(req, res){
  fs.readFile(path.resolve(__dirname,'..','views')+'/robots.txt', function(error, data){
	if(error){
		console.log(error);
		res.writeHead(404);
	}else{
		res.writeHead(200, {'Content-Type':'text/plain'});
	}
	res.end(data);
  });
};


exports.market_index = function(req, res){
  fs.readFile(path.resolve(__dirname,'..','views')+'/market_main.html', function(error, data){
  	if(error)
  		console.log(error)
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end(data)
  })
};

exports.dev_index = function(req, res){
  fs.readFile(path.resolve(__dirname,'..','views')+'/dev_main.html', function(error, data){
  	if(error)
  		console.log(error)
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end(data)
  })
};
exports.elastic_code_search = function(req, res){
  elastic_search_handler.code_search(req,res);
};
exports.make_project = function(req, res){
  project.make_project(req,res);
};

exports.show_project = function(req, res){
  project.show_project(req, res);
}



//payment start
exports.pay_start = function(req, res){
  payment.pay_start(req, res);
}

exports.ipn = function(req, res){
  payment.ipn(req, res);
}
//payment end