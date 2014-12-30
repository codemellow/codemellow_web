/*
**************************
@author Park, ChunSeong
@created 2014-03-27
This Document is protected
**************************
*/
var socket_limit=0;
var neo4j = require('neo4j');
var db;
var sleep = require('sleep');
switch(process.env.NODE_ENV){
  case 'dev':
	db = new neo4j.GraphDatabase('http://localhost:7474');
	console.log(":ASDASD")
  	break;
  case 'pro':
  db = new neo4j.GraphDatabase('database.codemellow.net:7474');
  	break;
  default:
  db = new neo4j.GraphDatabase('http://localhost:7474');
  console.log(":ASDASD")
  	break;
}

var lazy = require("lazy"),fs  = require("fs");
var async=require('async');
var emitter=require('events').EventEmitter;
var evt=new emitter()
var count=0;
var MAX=0;
var filename='./bsd.txt';
//console.log(evt)



var index_in=0;
var water=[]
var line_arr=[]

var util = require('util'),
    exec = require('child_process').exec,
    child;
evt.on('plus',function(){
	count++;
	//console.log(count)
	if(count==MAX){
		async.waterfall(water);
		console.log("finish"+count)
	}
})
child = exec('wc -l '+filename,
  function (error, stdout, stderr) {
    MAX=parseInt(stdout.split(' ')[0])
    console.log(MAX)
    new lazy(fs.createReadStream(filename)).lines.forEach(function(line){
	  	line_arr.unshift(line);
		water.push(function(cb){
			//console.log(line)
			var line=line_arr.pop()
			try{
				//console.log(line.toString())
				var object=JSON.parse(line);
			}catch(e){
				console.log(line.toString())
				console.log(e)
				cb();
				return ;
			}
			var project_name=object.project_name;
			var project_license=object.project_license; //array
			var project_name=object.project_name;
			var project_category=object.project_category;
			var project_language=object.project_language;
			project_category.concat(project_language);
			var project_down=object.project_down;
			var project_create_query = 'MERGE (t:Project {name: {project_name}}) ON CREATE SET t.down={project_down} RETURN t'
			var param1={
				project_name:project_name,
				project_down:project_down
				
			};

			db.query(project_create_query, param1, function (err, results) {
				if (err) throw err;
				//console.log(results)

				var in_call_func=function(index){
					var param2={
						project_category:project_category[index]
					};
					
					var query1 =
					  'MERGE (t:Tag {name: {project_category}}) ON CREATE SET t.count=0 ON MATCH SET t.count=t.count+1 RETURN t'
					var query2 =
					  'MATCH (n:Tag), (p:Project) WHERE n.name={project_category} AND p.name={project_name} CREATE (n)-[r:TAGGING]->(p) RETURN r'
					db.query(query1, param2, function (err, results) {
					  if (err) throw err;
					  //console.log("asd",results)
						var param3={
							project_category:project_category[index],
							project_name:project_name
						};
						//console.log(param3)
					  	db.query(query2, param3, function (err2, results2) {
						  if (err2) throw err2;
						  cb();
						  //console.log("asd2",results2)
						});
					});
				}
				if(project_category.length>0){
					for(var i in project_category){
						in_call_func(i);
					}
				}else cb();
			});
		})
		evt.emit('plus')

	});

});
