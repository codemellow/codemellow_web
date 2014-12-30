var router_market = require('./market');
var previous_handler = require('../previous_handler');

module.exports = init;
function init(app) {

	//old main
	//app.get('/', router_market.main_beta);   // Hide our site

	app.get('/', router_market.new_main);

	app.get('/robots.txt', router_market.robots_txt);
	app.get('/main', router_market.main_beta);
	app.get('/main_beta', router_market.main_beta);

	app.get('/search/code', router_market.elastic_code_search);
	app.get('/search_result', router_market.search_result);

	app.get('/register', router_market.register)
	app.get('/verify_email/:verify_key/:user_id', previous_handler.check_session, router_market.verify_email);

	// 1. market
	app.get('/market', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo,router_market.market_main_beta);
	app.get('/market/main_beta', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.market_main_beta);
	app.get('/market/classic', previous_handler.check_session, router_market.classic_search);
	app.get('/market/classic/:search', previous_handler.check_session, router_market.classic_search);
	app.get('/market/classic/:search/:page', previous_handler.check_session, router_market.classic_search);
	app.get('/market/graph', router_market.graph_search);
	app.get('/market/easy', router_market.easy_search);
	app.get('/market/verification', previous_handler.check_session, router_market.verification);
	//deal CRUD


	app.get('/deal/list',   router_market.deal_list);
	app.get('/deal/view', router_market.deal_view);
	app.post('/deal/offer', router_market.deal_offer);
	app.get('/deal/cancel',  router_market.deal_cancel)



	// 2. user

	app.get('/:user/monthly_sales', previous_handler.check_session, router_market.user_monthly_sales)
	app.get('/:user/sales', previous_handler.check_session, router_market.user_sales)
	app.get('/:user/project_list', previous_handler.check_session, router_market.user_project_list);
	app.get('/:user/edit', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.edit_user_info);
	app.get('/:user/deal', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.user_deal);
	app.get('/:user/deal/cnt', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.deal_cnt);
	app.post('/:user/license', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.license_list);
	app.get('/:user/license/cnt', previous_handler.check_session, previous_handler.store_user_name_to_renderinfo, router_market.license_cnt);


	// 3. user/project

	app.get('/market/:user/:project', previous_handler.check_session, previous_handler.direct_view, previous_handler.store_repository_name_to_renderinfo, router_market.projectView);



	app.post('/sales/statistics', router_market.sales_statistics);
	app.post('/notice/create', router_market.notice_create);
	app.post('/notice/list', router_market.notice_list);
	app.post('/notice/read', router_market.notice_read);
	app.post('/notice/update', router_market.notice_update)
	app.post('/duplicate_check', router_market.main_duplicate_check);
	app.post('/join', router_market.main_join);
	app.post('/main_login', router_market.main_login);
	app.post('/main_logout', router_market.main_logout);
	app.post('/find_password', router_market.find_password);
	app.post('/edit_user_info', router_market.post_edit_user_info);
	app.post('/resent_email', router_market.resent_email);

	app.post('/pay/req', router_market.pay_req);

	app.post('/ipn', router_market.ipn);

	app.post('/donate/req', router_market.donate_req);
	app.post('/donate/insert', router_market.donate_insert);
	app.post('/donate/update', router_market.donate_update);
	app.post('/donate/list', router_market.donate_list);


	app.post('/:user/:project/deal/offer', router_market.ajax_deal_offer);

	app.post('/project/like', router_market.project_like);
	app.post('/project/like/cancel', router_market.project_like_cancel);
	app.post('/project/like/list', router_market.project_like_list);
	app.post('/get_project_list', previous_handler.check_session, router_market.get_project_list);

	app.post('/ajax/deal/list', router_market.ajax_deal_list);


	app.post('/ajax/deal/:deal_id', router_market.ajax_deal_read);
	app.post('/ajax/deal/:deal_id/update', router_market.ajax_deal_update);
	app.post('/ajax/deal/:deal_id/accept', router_market.ajax_deal_accept);
	app.post('/ajax/deal/:deal_id/deny', router_market.ajax_deal_deny);

	app.post('/ajax/license/read', router_market.ajax_license_read);


	app.post('/ajax/cart/get/list', router_market.ajax_get_cart_list);
	app.post('/ajax/cart/add', router_market.ajax_add_cart);
	app.post('/ajax/cart/delete', router_market.ajax_delete_cart);
	app.post('/ajax/cart/add/multiple', router_market.ajax_add_cart_multiple);

	app.post('/ajax/repositoryinfo', router_market.ajax_get_repository_info_by_id);

	app.post('/ajax/:user/:project/donate_info', router_market.ajax_donate_info)

	app.post('/ajax/:user/:project/detail', router_market.ajax_get_project_detail);
	app.post('/ajax/:user/:project/review/put', router_market.ajax_put_project_review);
	app.post('/ajax/save_user_info', router_market.ajax_save_user_info);
	app.post('/ajax/get_myprofile', router_market.ajax_get_myprofile);

}