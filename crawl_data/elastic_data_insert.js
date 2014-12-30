/*
**************************
@author Park, ChunSeong
@created 2014-03-27
This Document is protected
**************************
*/
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
});

var lazy = require("lazy"),fs  = require("fs");
var async=require('async');
var emitter=require('events').EventEmitter;
var evt=new emitter()
var count=0;
var MAX=0;
var filename='./total.txt';
var index_in=0;
var water=[]
var line_arr=[]
var obj_arr=[]
var number=0;
var how_many=0;
var util = require('util'),
    exec = require('child_process').exec,
    child;
evt.on('plus',function(){
	count++;
	//console.log(count)
	if(count==MAX){
		if(obj_arr.length!=0){
			(function(obj_arr){
					water.push(function(cb){
						client.bulk({
							body:obj_arr
						},function(err,response){
							console.log(err)
							number++;

							cb();
						});
					})	
			})(obj_arr);
			obj_arr=[];
		}
		async.waterfall(water,function(){

		console.log("finish"+count+"how_many:"+number)
		});
	}
})
child = exec('wc -l '+filename,
  function (error, stdout, stderr) {
    MAX=parseInt(stdout.split(' ')[0])
    console.log(MAX)
    new lazy(fs.createReadStream(filename)).lines.forEach(function(line){
	  	try{
			var object=JSON.parse(line);
			var project_name=object.project_name;
			var repository_name='codemellow/'+project_name;
			var project_category=object.project_category;
			var project_language=object.project_language;
			var repository_description=project_category.concat(project_language);
			repository_description=repository_description.join(',')
			obj_arr.push({
				index:{_index: 'repository', _type: 'cm_repository',_id:number}
			})
			obj_arr.push({repository_name:repository_name,project_name:project_name,repository_description:repository_description
				,create_date: new Date(),
		        last_commit_date:new Date(),
		        commit_count:0,
		        release_count:0,
		        contributor_count:0,
		        issue_count:0,
		        view_count:0,
		        review_count:0,
		        review_point:0,
		        repository_like_count:0,
		        project_name_suggest: {
		          input: [
		            project_name
		          ],
		          output:repository_name
		        }


			})
			number++;
			if(number%40000==0){
				for(var i=0;i<1;i++){
					(function(obj_arr){
						water.push(function(cb){
							client.bulk({
								body:obj_arr
							},function(err,response){
								console.log(err)
								
								cb();
							});
						})	
					})(obj_arr);
				}
					obj_arr=[];
				
			}
		}catch(e){
			console.log(line.toString())
			console.log(e)
			
		}
		
		evt.emit('plus')
	});
});
