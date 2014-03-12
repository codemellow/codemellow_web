
/*
 * GET home page.
 */
var project=require('../modules/project/project');
//var mysql_handler=require('../mysql_handler/mysql_handler');
var elastic_search_handler=require('../modules/elastic_search_handler/elastic_search_handler');



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.elastic_code_search = function(req, res){
  elastic_search_handler.code_search(req,res);
};
exports.make_project = function(req, res){
  project.make_project(req,res);
};