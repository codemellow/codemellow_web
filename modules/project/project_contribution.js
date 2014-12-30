var mysql_handler = require('../mysql_handler/mysql_handler');
var neo4j_handler = require('../neo4j_handler/neo4j_handler');
var events = require('events');


module.exports = {

	// repository_name : null,

	// init: function(repository_name){
	// 	this.repository_name = repository_name;
	// },

	// add_contributer: function(repository_name, username){
	// 	mysql_handler.insert_new_contributor(repository_name, username);
	// },

	// evaluation: function(req, res){

	// 	if(!req.body.event_type){
	// 		console.log('err\n');
	// 		res.end();
	// 		return false;
	// 	}

	// 	switch(req.body.event_type){
	// 		case 'seed_point' : {
	// 			var msg = {};
	// 			msg.seed_point = req.body.seed_point;
	// 			msg.commit_id = req.body.commit_id;
	// 			this.set_seed_point(msg, function(){
	// 			});
	// 		}
	// 		break;
	// 		case 'commit_point' : {
	// 			var msg = {};
	// 			msg.commit_point = req.body.commit_point;
	// 			msg.commit_id = req.body.commit_id;
	// 			msg.repository_name = req.body.repository_name;
	// 			msg.username = req.body.username;
	// 			this.set_commit_point(msg, function(){

	// 			});				
	// 		}
	// 	}

	// 	res.end();
	// },


	// set_seed_point: function(msg, callback){
	// 	mysql_handler.update_commit_info(msg.commit_id, 'seed_point',msg.seed_point);
	// 	mysql_handler.update_commit_info(msg.commit_id, 'evaluation_point',msg.seed_point);

	// 	if(callback){
	// 		callback();
	// 	}
	// },

	// set_commit_point: function(msg, callback){
	// 	mysql_handler.insert_new_evaluation(msg.repository_name, msg.commit_id, msg.username, msg.commit_point);		

	// 	var repository_info = mysql_handler.get_repository_info_by_name(msg.repository_name);
	// 	var commiter_info = mysql_handler.get_contributor_info_by_name(msg.repository_name, msg.username);
	// 	var commit_info = mysql_handler.get_commit_info_by_id(msg.repository_name, msg.commit_id);

	// 	if(!repository_info || commiter_info){
	// 		console.log('commit point evaluate error\n');
	// 		return false;
	// 	}

	// 	var contribute_point = commiter_info.contribute_point;
	// 	// var ci_ptp = commit_info.progress_total_point == 0 ? 1 : commit_info.progress_total_point;
	// 	var progress_point = commit_info.progress_point;
	// 	var repository_point = repository_info.repository_point == 0 ? 1 : repository_info.repository_point;

	// 	var before_evaulation = progress_point/repository_point;
	// 	var evaluation_point = commiter_info.evaluation_point;
	// 	//alpha : give advantage point for early evalutor
	// 	//beta : give advantage point for low percent contributer
	// 	//gamma : reduce constant
	// 	var before_progress = Math.floor(progress_point/repository_point);

	// 	var alpha = (1+(repository_point-progress_point)/(repository_point));
	// 	var beta = (1+(contribute_point)/(repository_point));
	// 	var gamma = 0.001;

	// 	var evaluation_point = (contribute_point*msg.commit_point + progress_point*evaluation_point)/(contribute_point+progress_point);
	// 	var thanks_point = msg.commit_point * alpha * beta * gamma;

	// 	//33.3%
	// 	// var c_contribute_point = Math.min(repository_point/3, contribute_point);
	// 	// var gap = contribute_point-c_contribute_point;
	// 	// ci_ptp = ci_ptp - gap;
	// 	// progress_point = progress_point + c_contribute_point;

	// 	var contribute_point += thanks_point;
	// 	var progress_point += contribute_point; 
	// 	var repository_point += thanks_point;

	// 	var after_progress = Math.floor(progress_point/repository_point);

	// 	if(before_progress != after_progress && after_progress < 10) set_limited_point(evaluation_point);

	// 	mysql_handler.update_contributor_info(msg.repository_name, msg.username, 'contribute_point', contribute_point);
	// 	mysql_handler.update_repository_info_by_name(msg.repository_name, 'repository_point',repository_point);
	// 	mysql_handler.update_for_evaluation(msg.repository_name, msg.username, msg.commit_point);
	// 	mysql_handler.update_commit_info(msg.commit_id, 'progress_point', progress_point);
	// 	mysql_handler.update_commit_info(msg.commit_id, 'evaluation_point',evaluation_point);

	// 	// mysql_handler.update_commit_info(msg.commit_id, 'progress_total_point', ci_ptp);

	// 	if(callback){
	// 		callback();
	// 	}
	// },

	// set_limited_point: function(evaluation_point){
	// 	mysql_handler.update_commit_info(msg.commit_id, 'limited_point',evaluation_point/10); //10 is default. It can change.
	// },

	// localhost/yys/graph/contributor
	get_contributor_info : function(req, res){
		
		var params={};
		params.repository_name=req.params.user+'/'+req.params.project;
		params.user_id=req.session.user.id;
		mysql_handler.get_contributor_info(params, function(rows){
			res.json(rows);
		});
	},



	// only_inspector
	// var uc={};
	// uc.user_id=1;
	// uc.how_to_update='inspector'
	// $.post('/yys/graph/contributor/update', uc, function(d){console.log(d)})
	update_contributor_info : function(req, res){
		var params=req.body;

		params.repository_name=req.params.user+'/'+req.params.project;
		//updater_id <-- check 
		//user_id 				// id_to_be_updated
		//repository_id
		//how_to_update 'contributor', 'inspector'
		
		params.update_key='level';
		if(params.how_to_update==='inspector'){
			params.update_value=1;
		}else{
			params.update_value=0;
		}

		mysql_handler.update_contributor_info(params, function(ret){
			res.json(ret);
		})
	},


	// only_inspector
	// var ic={};
	// ic.user_name='Aol;
	// $.post('/simdj/asdf/contributor/insert', ic, function(d){console.log(d)})
	insert_contributor_info : function(req, res){
		var params=req.body;

		params.repository_name=req.params.user+'/'+req.params.project;
		
		mysql_handler.get_repository_info_by_name(params.repository_name, function(repo_info){
			mysql_handler.get_user_by_user_name(params.user_name, function(err, user_info){
				if(repo_info && user_info){
					var neo4j_param={
						user_info : {},	repo_info : {}
					};
					neo4j_param.user_info.user_name=user_info.user_name;
					neo4j_param.user_info.user_id=user_info.user_id;
					neo4j_param.repo_info.repository_name=repo_info.repository_name;
					neo4j_param.repo_info.repository_id=repo_info.repository_id;

					mysql_handler.insert_contributor_info(params, function(ret){
						res.json(ret);
						//neo4j gogo
						if(ret){
							neo4j_handler.insert_paticipate_relation(neo4j_param, function(err, data){
							})
						}
					})
					
				}else{
					res.json(false);
				}
			});
			
		});




		
	}

}
