
var request = require('request');
var setting = require('../../settings');
exports.request_repo_create = function(repository_name, callback){
	request.post(
		setting.data.reposerver_origin+'repo_create',
		{form:{repository_name:repository_name}},
		function(err, res, body){
			if(err){
				callback(err)
			}else{
				if(res.statusCode==200){
					callback()
				}else{
					callback(404);
				}
			}
		}

	)
}

exports.request_left_file_contents = function(repository_name,commit_hash, start_line, end_line, file_name, callback){
	request.post(
		setting.data.reposerver_origin+'get_left_file_contents',
		{form:{repository_name:repository_name,commit_hash:commit_hash, start_line: start_line, end_line: end_line, file_name: file_name}},
		function(err, res, body){
			if(err){
				callback()
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback();
				}
			}
		}

	)
}

exports.request_commit_diff = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'commit_diff',
		{form: query},
		function(err, res, body){
			if(err){
				callback()
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback();
				}
			}
		}

	)
}

exports.request_view_file_code= function(query, callback){
	request.post(
		setting.data.reposerver_origin+'view/code',
		{form:query},
		function(err, res, body){
			if(err){
				callback()
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);

				}else{
					callback();
				}
			}
		}

	)
}

exports.request_get_readme_view= function(query, callback){
	request.post(
		setting.data.reposerver_origin+'view/readme',
		{form:query},
		function(err, res, body){
			if(err){
				callback()
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);

				}else{
					callback();
				}
			}
		}

	)
}


exports.request_view_dir= function(query, callback){
	var result = {
		status:false,
		data:null
	}
	request.post(
		setting.data.reposerver_origin+'view/dir',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					result.status = true;
					result.data = JSON.parse(body).data;
					callback(result);
				}else{
					result.status = true;
					result.data = []
					callback(result);
				}
			}
		}

	)
}

exports.history_of_file = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'history_of_file',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback([]);
				}
			}
		}

	)
}

/*exports.request_repo_create = function(req, res){

	request.post(
		'http://pig.codemellow.net',
		{repository_name:repository_name},
		function(err, res, body){
			if(err){
				callback(err)
			}else{

				if(res.statusCode==200){
					callback()
				}else{
					callback(404);
				}
			}
		}

	)
}*/




exports.request_repository_fork = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'fork',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback(false);
				}
			}
		}

	)
}

exports.request_repository_news = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'news',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback(false);
				}
			}
		}
	)
}

exports.request_repository_news_bulk = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'news_bulk',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback(false);
				}
			}
		}
	)
}

exports.request_repository_commit = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'commit',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body).data);
				}else{
					callback(false);
				}
			}
		}

	)
}

exports.request_repository_commit_count = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'commit/count',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body));
				}else{
					callback({status:false, data:null});
				}
			}
		}

	)	
}

exports.request_repository_branch_count = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'branch/count',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body));
				}else{
					callback({status:false, data:null});
				}
			}
		}

	)	
}

exports.request_repository_commit_list = function(query, callback){
	request.post(
		setting.data.reposerver_origin+'commit/list',
		{form:query},
		function(err, res, body){
			if(err){
				callback([])
			}else{
				if(res.statusCode==200){
					callback(JSON.parse(body));
				}else{
					callback({status:false, data:null});
				}
			}
		}

	)
}