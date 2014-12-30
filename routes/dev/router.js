var router_dev = require('./dev');
var previous_handler = require('../previous_handler');

module.exports = init;
function init(app) {
	app.get('/dev', previous_handler.check_session, router_dev.dev_index);	
	app.get('/dev/search', router_dev.dev_search);
	app.post('/dev/login', router_dev.dev_login);
	app.get('/dev/logout', router_dev.dev_logout);
	app.get('/login', function(req, res){
		if(req.session && req.session.user){
			res.redirect("/dev");
		}else{
			res.render('login');
		}
	})

	app.get('/dev/search/advanced', router_dev.advanced_search);
	app.get('/dev/classic/:search',  previous_handler.check_session, router_dev.classic_search)
	app.get('/dev/classic/:search/:page',  previous_handler.check_session, router_dev.classic_search)

	app.get('/ajax/autocomplete_user', router_dev.autocomplete_user)
	// app.get('/dev/reco/user', router_dev.user_collaborative_filtering);
	// app.get('/dev/reco/repo', router_dev.repo_collaborative_filtering);

	app.get('/dev/recommend', router_dev.recommend);
	app.get('/dev/new_project',previous_handler.check_session,  router_dev.new_project);
	// app.get('/ajax/repository/contributor', router_dev.ajax_repository_contributor)
	// app.get('/ajax/repository/contributor/update', router_dev.ajax_repository_contributor_update)



	app.get('/only_maintainer', previous_handler.check_session, previous_handler.only_maintainer, function(req,res){
		res.json('I am Maintainer');
	})
	app.get('/only_inspector', previous_handler.check_session, previous_handler.only_inspector, function(req,res){
		res.json('I am inspector');
	})
	app.get('/only_contributor', previous_handler.check_session, previous_handler.only_contributor, function(req,res){
		res.json('I am contributor');
	})

	//console.log(app.routes.get)

	app.get('/dev/:user', previous_handler.check_session, router_dev.dev_mypage);

	app.get('/:user/:project/', function(req, res){res.redirect(req.url+'/visualization')});
	app.get('/:user/:project', function(req, res){res.redirect(req.url+'/visualization')});
	app.get('/:user/:project/dir/', function(req, res){res.redirect(req.url+'master/')});
	app.get('/:user/:project/dir', function(req, res){res.redirect(req.url+'/master/')});
	app.get('/:user/:project/setting',previous_handler.check_session, previous_handler.only_maintainer, router_dev.project_setting) ;
	app.get('/:user/:project/contributor', previous_handler.check_session, previous_handler.need_session,   router_dev.repository_contributor);
	app.post('/:user/:project/contributor/insert', previous_handler.check_session, router_dev.repository_contributor_insert);
	app.post('/:user/:project/contributor/update', previous_handler.check_session, previous_handler.need_session,  previous_handler.only_inspector, router_dev.repository_contributor_update);

	app.get('/:user/:project/dir/:branch',  previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.project_dir_view);
	app.get('/:user/:project/dir/:branch/*', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.project_dir_view);

	app.get('/:user/:project/code/:branch/*', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo,  router_dev.project_code_view);
	app.get('/:user/:project/code/:branch/:hash/*', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo,  function(req, res){  res.json({path : req.param(0)});});

	app.get('/:user/:project/commits/:branch', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_commit_view);
	app.get('/:user/:project/commits/', function(req, res){res.redirect(req.url + 'master')});
	app.get('/:user/:project/commits', function(req, res){res.redirect(req.url + '/master')});
	app.get('/:user/:project/commit/:branch/:hash', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, previous_handler.url_parsing, router_dev.project_view_commit);
	app.get('/:user/:project/commits/:branch/:file/:page', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, previous_handler.url_parsing, router_dev.project_history_of_file);

	app.get('/:user/:project/edit/readme', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, previous_handler.url_parsing, router_dev.project_edit_readme);
	app.get('/:user/:project/edit/:branch/*', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, previous_handler.url_parsing, router_dev.project_edit_code);

	app.get('/:user/:project/visualization', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.project_visualization);
	app.get('/:user/:project/fork', previous_handler.need_session, previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_fork);
	app.get('/:user/:project/pull', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.pullRequest_view);
	app.get('/:user/:project/issue', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.issue_view);
	app.get('/:user/:project/milestone', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.milestone_view);

	app.post('/ajax/repository/code/view', previous_handler.check_session, router_dev.ajax_view_code);
	app.post('/ajax/repository/readme/view', previous_handler.check_session, router_dev.ajax_readme_view);
	app.post('/ajax/:user/:project/commit', previous_handler.need_session, previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_commit);
	app.post('/ajax/:user/:project/commit/list', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_commit_list);
	app.post('/ajax/:user/:project/commit/count', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_commit_count);
	app.post('/ajax/:user/:project/branch/count', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_branch_count);
	app.post('/ajax/:user/:project/contributor/count', previous_handler.check_session, previous_handler.store_repository_name_to_renderinfo, router_dev.repository_contributor_count);
	app.post('/autocomplete_project', router_dev.autocomplete_project);
	app.post('/get_left_file_contents', previous_handler.check_session, router_dev.get_left_file_contents);
	app.get('/ajax/dev/:user/info', previous_handler.check_session, router_dev.dev_user_info);
	app.get('/:user/:project/news', router_dev.repository_news);
	app.post('/news/bulk', router_dev.repository_news_bulk)
	

	app.get("/404page", router_dev.error_page);
}