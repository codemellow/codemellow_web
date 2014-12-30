var global={};











//req, res, callback are optional!!
global.repo_handle = require('repo_err_handle');


exports.handle = function(params, req, res, callback){

	switch(params.category){
		case 'basic':

			break;
		case 'git':
			break;
		case 'repo':
			break;
		case 'deal':
			break;
		case 'pay'
			break;
		default:
			break;
	}


}

function basic_err_handle(params, req, res, callback){
	switch(params.cause){
		case 'too few args':
			res.end(false);
			break;
		case 'undefined mode':
			res.end(undefined);
			break;
		case 'no data':
			res.end(null);
			break;
		case '404':
			res.status(404);
			break;

		default:
			break;
	}
}

