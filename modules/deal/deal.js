var mysql_handler = require('../mysql_handler/mysql_handler');
var notice = require('../notification');
var nodemailer=require('nodemailer');


var request = require('request');


function making_suggest_email_content(params){
	var c='';
	c+='Your Project : ' + params.deal_id;
	c+='<br>Offer Price : $'+params.offer_price ;
	c+='<br>Offer Expire Date : '+params.offer_expiration_date;
	c+='<br><br><br>';

	c+="Accept by clicking <a>this</a> ";
	c+="<br> Or Deny by clicking <a>this</a>"
	c+='<br>For more info, visit <a href="115.145.178.162/main">Codemellow</a>';
	return c;
}

function email_notify(our_email,our_pw, receiver_email, html_content){

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",

        // admin's info
        auth: {
            user: our_email//"simdj58@gmail.com",
            ,pass: our_pw//"92sustod"
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Notice <no-reply@gmail.com>", // sender address
        to: receiver_email, // list of receivers
        subject: "Deal Suggestion", // Subject line
        //text: html_content// // plaintext body
        html: html_content // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}






function view_deal_by_repository_id(params,callback){
  	if(typeof(callback) !== 'function') callback = function(data){return data};
  	/*
	
		SELECT * FROM cm_deal
		NATURAL JOIN cm_repository_release
		NATURAL JOIN cm_commit
		NATURAL JOIN cm_repository
		WHERE 
		      cm_commit.repository_id=?

  	*/
}

function view_deal_by_buyer_id(params,callback){
  	if(typeof(callback) !== 'function') callback = function(data){return data};

	/*
	
		SELECT * FROM cm_deal
		NATURAL JOIN cm_repository_release
		NATURAL JOIN cm_commit
		NATURAL JOIN cm_repository
		WHERE 
		      cm_commit.repository_id=?
		      AND buyer_id IN (
				SELECT user_id FROM cm_user WHERE user_id=?
		      )

  	*/

}

function view_deal_by_seller_id(params,callback){
  	if(typeof(callback) !== 'function') callback = function(data){return data};
	
	/*
	
		SELECT * FROM cm_deal
		NATURAL JOIN cm_repository_release
		NATURAL JOIN cm_commit
		NATURAL JOIN cm_repository
		WHERE 
		      cm_commit.repository_id=?
		      AND seller_id IN (
				SELECT user_id FROM cm_user WHERE user_id=?
		      )

  	*/  	
}



// (repo_name, buyer_name, expiration_date, price, purpose, explanation)
exports.ajax_offer = function(req, res){
	
	var params=req.body;

	//1. check

	//console.log(req);
	//2. db insert
	//var redirect_url='/'+params.buyer_name+'/buyer/deal'
	//res.redirect(redirect_url);
	mysql_handler.deal_offer(params, function(offer_create_result){
		//res.json(data);
		if(offer_create_result){
			if(params.redirect_url){
				res.redirect(params.redirect_url);
			}else{
				res.json(offer_create_result)
			}

			//deal noitice!!!!!
			notice.notice_deal_offer_create(offer_create_result);

		}else{
			res.json('insert nono')
		}
	});	

	//3. email notifiy

}


// (repo_name, buyer_name, expiration_date, price, purpose, explanation)
exports.ajax_update = function(req, res){
	
	var params=req.body;
	console.log(params)

	//1. check

	//console.log(req);
	//2. db insert
	//var redirect_url='/'+params.buyer_name+'/deal'
	//res.redirect(redirect_url);
	mysql_handler.deal_update(params, function(offer_update_result){
		//res.json(data);
		if(offer_update_result){
			if(params.redirect_url){
				res.redirect(params.redirect_url);
			}else{
				res.json(offer_update_result)
			}
			notice.notice_deal_offer_update(offer_update_result);
		}
		else
			res.json('update nono')
	});	

	//3. email notifiy

}

exports.ajax_list = function(req, res){
	var params = req.body;
	mysql_handler.deal_list(params, function(data){
		res.json(data);
	});
}



exports.ajax_read = function(req, res){
	var params  = req.params;
	mysql_handler.deal_read(params, function(data){
		res.json(data);
	})
}


exports.ajax_accept = function(req, res){
	var params = req.body;
	mysql_handler.deal_accept(params, function(data){
		

		if(params.redirect_url){
			res.redirect(params.redirect_url);
		}
		else{
			res.json(data)
		}

		notice.notice_deal_offer_update(params, 'accept');



	})
}

exports.ajax_deny = function(req, res){
	var params = req.body;
	mysql_handler.deal_deny(params, function(data){
		if(params.redirect_url){
			res.redirect(params.redirect_url);
		}
		else{
			res.json(data)
		}
		notice.notice_deal_offer_update(params, 'deny');
	})
}

exports.main_view = function(req, res){
	res.render('market/deal/deal.ejs', req.render_info);
	//res.json('deal hmm')
}




exports.cnt = function(req, res){
	mysql_handler.deal_cnt(req.query, function(data){
		res.json(data);
	});
}