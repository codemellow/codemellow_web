/*
**************************
@author Park, ChunSeong
@created 2014-03-24
This Document is protected
**************************
*/


var neo4j = require('neo4j');
var db;
switch(process.env.NODE_ENV){
  case 'dev':
	db = new neo4j.GraphDatabase('http://localhost:7474');
  	break;
  case 'pro':
  db = new neo4j.GraphDatabase('database.codemellow.net:7474');
  	break;
  default:
  db = new neo4j.GraphDatabase('database.codemellow.net:7474');
  	break;
}
exports.insert_project_node = function(project_name,callback){
  var node = db.createNode({"project": project_name});
  node.save(function(err,node){
      callback(err,node);
  });
};
exports.insert_tag_node = function(tag_name,callback){
  var node = db.createNode({"tag": tag_name});
  node.save(function(err,node){
      callback(err,node);
  });
};
exports.insert_project_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.insert_tag_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.insert_project_project_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_project_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_tag_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_project_project_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
