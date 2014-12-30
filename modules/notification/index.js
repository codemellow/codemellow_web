var mysql_handler = require('../mysql_handler/mysql_handler');
var nodemailer=require('nodemailer');




function notice_email_alarm(user_name, note_id){
	
	//1. get email, agreement by user_name
	//2. get notice by note_id
	//3. send email

}

exports.create = function (req, res){
	mysql_handler.notice_create(req.body, function(data){
		res.json(data);
	});
}

exports.list = function (req, res){
	mysql_handler.notice_list(req.body, function(data){
		res.json(data);
	});
}

exports.read  = function(req,res){
	mysql_handler.notice_read(req.body, function(data){
		res.json(data);
	});
}
exports.update = function(req, res){
	mysql_handler.notice_update(req.body, function(data){
		res.json(data);
	})
}




exports.notice_deal_offer_create = function(deal_offer_create_result) {
	var deal_read_req={};
	deal_read_req.deal_id=deal_offer_create_result.insertId;

	mysql_handler.deal_read(deal_read_req, function(deal_info){
		if(!deal_info || !deal_info[0]){
			return false;
		}
		deal_info=deal_info[0];
		deal_info.msg_code=msg_code.deal_offer_create;	
		deal_info.offer_link='/'+deal_info.seller_name+'/seller/deal';	


		var notice_create_req={};
		notice_create_req.msg=making_msg(deal_info);
		notice_create_req.receiver_id=deal_info.seller_id;

		mysql_handler.notice_create(notice_create_req, function(data){
		});

	});





}

exports.notice_deal_offer_update = function(deal_offer_info,res_to_offer){
	var deal_read_req={};
	deal_read_req.deal_id=deal_offer_info.deal_id;

	mysql_handler.deal_read(deal_read_req, function(deal_info){
		if(!deal_info || !deal_info[0]){
			return false;
		}
		deal_info=deal_info[0];
		if(res_to_offer=='accept'){
			deal_info.msg_code=msg_code.deal_offer_accept;	
		}else {
			deal_info.msg_code=msg_code.deal_offer_deny;	
		}
		deal_info.offer_link='/'+deal_info.repository_name;
			


		var notice_create_req={};
		notice_create_req.msg=making_msg(deal_info);
		notice_create_req.receiver_id=deal_info.buyer_id;

		mysql_handler.notice_create(notice_create_req, function(data){
		});

	});
};


exports.notice_deal_complete = function(complete_deal_id){
	var deal_read_req={};
	deal_read_req.deal_id=complete_deal_id;

	mysql_handler.deal_read(deal_read_req, function(deal_info){
		if(!deal_info || !deal_info[0]){
			return false;
		}
		deal_info=deal_info[0];

		deal_info.msg_code=msg_code.deal_complete;


		var notice_create_req={};
		notice_create_req.msg=making_msg(deal_info);
		notice_create_req.receiver_id=deal_info.seller_id;

		mysql_handler.notice_create(notice_create_req, function(data){
		});

	});

};

var msg_code={
	'deal_offer_create' : 0,
	'deal_offer_accept' : 1,
	'deal_offer_deny' : 2,

	'deal_complete' : 3,
	'deal_cancel' : 4
}
function making_msg(params){
	var ret='';
	//console.log(params)

	switch(params.msg_code){
		case msg_code.deal_offer_create:

			ret='[Deal Offer] [buyer_name] offer for [repository_name] <br>[offer_link]';
			ret=ret.replace('[buyer_name]', params.buyer_name);
			ret=ret.replace('[repository_name]', params.repository_name);
			ret=ret.replace('[offer_link]', params.offer_link);
			break;
		case msg_code.deal_offer_accept:
			ret='[Deal Accepted] Your offer for [repository_name] is accepted <br>[offer_link]';
			//ret=ret.replace('[seller_name]', params.seller_name);
			ret=ret.replace('[repository_name]', params.repository_name);
			ret=ret.replace('[offer_link]', params.offer_link);
			break;
		case msg_code.deal_offer_deny:
			ret='[Deal Denied] Your offer for [repository_name] is denied <br>[offer_link]';
			//ret=ret.replace('[seller_name]', params.seller_name);
			ret=ret.replace('[repository_name]', params.repository_name);
			ret=ret.replace('[offer_link]', params.offer_link);
			break;
		case msg_code.deal_complete:
			ret='[Deal Completed] [buyer_name] completed paying for your license of [repository_name]';
			ret=ret.replace('[buyer_name]',params.buyer_name);
			ret=ret.replace('[repository_name]', params.repository_name);
			break;
		case msg_code.deal_cancel:
			break;
		

		default:
			break;
	}
	return ret;
}