var mysql_handler = require('../mysql_handler/mysql_handler');
var nodemailer=require('nodemailer');






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


//input will be buyer_name, repository_name, release_version
exports.deal_start = function(req, res){
	var params=req.query || req.body;

	var buyer_name=params.buyer_name || '';
	var repository_name=params.repository_name || '';
	var release_version=params.release_version || '';
	if(!buyer_name || !repository_name || !release_version) {
		return false;
	}
	 mysql_handler.deal_start(params, function(data){
	 	console.log('deal_start', data);
	 });
//console.log(mysql_handler)
	res.end();
	/*
	query

	INSERT INTO cm_deal (release_id, seller_id, buyer_id)  
		SELECT * FROM
			(
				SELECT release_id	FROM cm_repository_release 	WHERE release_version='1.2'
				AND cm_repository_release.commit_id IN (
				    SELECT commit_id	FROM cm_commit	WHERE repository_id = (
				      SELECT repository_id 	FROM cm_repository where repository_name = 'simdj/pintos'
				    )
				) 
			) release_info,

			(
				SELECT maintainer_id
				FROM cm_repository
				WHERE repository_name='simdj/pintos'
			) maintainer_info,

			(	
				SELECT user_id FROM cm_user WHERE user_name='pcs'
			) buyer
	;

	*/

}

//input will be deal_id, offer_price, offer_expiration_date

exports.suggest_deal = function(req, res){
	var params=req.query || req.body;

	var deal_id=params.deal_id;
	var offer_price=params.offer_price;
	var offer_expiration_date=params.offer_expiration_date;

	if(!deal_id || !offer_price || !offer_expiration_date){
		return false;
	}

	mysql_handler.suggest_deal(params, function(data){
		console.log('suggest_deal', data);
		//if suggest is good -> email notice gogo
		if(data){
			email_notify('simdj58@gmail.com', '92sustod', 'tlaehdwls9@naver.com', making_suggest_email_content(params) );
		}
	});

	/*
	INSERT INTO cm_deal_log (deal_id, offer_price, offer_expiration_date)
	(?,?,?)
		
	*/




}












var deal_start_data={}
deal_start_data.release_version='1.1';
deal_start_data.repository_name='simdj/pintos'
deal_start_data.buyer_name='bbu'


//test
var offer_data={}
offer_data.deal_id=51
offer_data.offer_price='4000';
offer_data.offer_expiration_date='2016-01-01';


var create_data={}
create_data.release_version='1.1';
create_data.repository_name='simdj/pintos'
create_data.buyer_name='pcs'
//$.post('/deal/create', create_data, function(data){console.log(data);});

exports.create = function(req, res){

	var params=req.body || req.query;

	console.log(params)

	var release_version=params.release_version  || '' ;
	var repository_name=params.repository_name || '' ;
	var buyer_name=params.buyer_name || '';

	var param_arr=[];
	param_arr.push(release_version);
	param_arr.push(repository_name);
	param_arr.push(repository_name);
	param_arr.push(buyer_name);


	var get_repo_id="SELECT repository_id FROM cm_repository WHERE repository_name=?";
	var get_commit_id="SELECT commit_id FROM cm_commit WHERE repository_id=("+get_repo_id+")";
	var get_release_id="SELECT release_id FROM cm_repository_release "
	+"WHERE release_version=? AND cm_repository_release.commit_id IN ("+get_commit_id+")"


	var get_maintainer_id="SELECT maintainer_id FROM cm_repository WHERE repository_name=?"

	var get_buyer_id="SELECT user_id FROM cm_user WHERE user_name=?"

	var qs="INSERT INTO cm_deal (release_id, seller_id, buyer_id) "
	+	"SELECT * FROM ("+get_release_id+") release_info, ("+get_maintainer_id+") maintainer_info, ("+get_buyer_id+") buyer ;"



	//db connect start
	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err){
		if(err){
			console.log('deal create err', err);
			res.json(false);
		}else{
			res.json(true);
		}
		dbconn=null;
		//db connect end
	});



}














var deal_list_data={};

deal_list_data.repository_name='simdj/pintos';
deal_list_data.seller_name='simdj'

deal_list_data.buyer_name='pcs';




//$.get('/deal/list', deal_list_data, function(data){console.log(data)})

//input will be repository_name, release_version
exports.list = function(req, res){


	var params=req.query;
	console.log(params)


	//var release_version=params.release_version  || '' ;
	var repository_name=params.repository_name || '' ;
	var buyer_name=params.buyer_name || '';
	var seller_name=params.seller_name || '';


	var get_repo_id="SELECT repository_id FROM cm_repository WHERE repository_name=?";
	// var get_commit_id="SELECT commit_id FROM cm_commit WHERE repository_id=("+get_repo_id+")";
	// var get_release_id="SELECT release_id FROM cm_repository_release "
	// 					+"WHERE release_version=? AND cm_repository_release.commit_id IN ("+get_commit_id+")"

	var get_user_id="SELECT user_id FROM cm_user WHERE user_name=?"



	var query_style=0;
	var param_arr=[];

	if(  repository_name ){
		query_style+=1;
		param_arr.push(repository_name);
	}
	if(buyer_name){
		query_style+=2;
		param_arr.push(buyer_name);
	}
	if(seller_name){
		query_style+=4;
		param_arr.push(seller_name);
	}


	var qs='';

	//0 -> every deal (not confined by any repo or buyer)
	//1 -> deal by repo
	//2 -> deal by buyer
	//3 -> deal by repo,buyer

	//4 -> deal by seller
	//5 -> deal by seller, repo

	//6 -> deal by buyer, seller
	//7 -> deal by buyer, repo, seller


	switch(query_style){
		
		case 1:
			qs = "SELECT * FROM cm_deal WHERE repository_id IN ("+get_repo_id+")";
			break;
		case 2:
			qs = "SELECT * FROM cm_deal WHERE buyer_id IN ("+get_user_id+")";
			break;
		case 3:
			qs = "SELECT * FROM cm_deal WHERE repository_id IN ("+get_repo_id+") AND buyer_id IN ("+get_user_id+")";
			break;


		case 4:
			qs = "SELECT * FROM cm_deal WHERE seller_id IN ("+get_user_id+")";
			break;
		case 5:
			qs = "SELECT * FROM cm_deal WHERE repository_id IN ("+get_repo_id+") AND seller_id IN ("+get_user_id+")";
			break;

		// case 6:
		// 	qs = "SELECT * FROM cm_deal WHERE buyer_id IN ("+get_user_id+") AND seller_id IN ("+get_user_id+")";
		// 	break;
		// case 7:
		// 	qs = "SELECT * FROM cm_deal WHERE repository_id IN ("+get_repo_id+") AND seller_id IN ("+get_user_id+")";
		// 	break;


		case 0:
		default:		
			qs = "SELECT * FROM cm_deal";
			break;
	}
	
	//console.log(qs);

	//db connect start
	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err,data){
		if(err){
			console.log('deal list err', err);
			res.json([]);
		}else{
			res.json(data);
		}
		dbconn=null;
		//db connect end
	});
}




//input will be deal_id

var deal_read_data={};
deal_read_data.deal_id=51


//$.get('/deal/view', deal_read_data, function(data){console.log(data)})
exports.view = function(req, res){
	var params=req.query || req.body;

	console.log(params);
	var deal_id=params.deal_id  || '' ;

	var param_arr=[];
	param_arr.push(deal_id);

	var qs = "SELECT * FROM cm_deal_log WHERE deal_id=?";

	//db connect start
	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err,data){
		if(err){
			//console.log('review create err', err);
			res.json(false);
		}else{
			res.json(data);
		}
		dbconn=null;
		//db connect end
	});

}




//input will be deal_id, offer_price, offer_expiration_date

var offer_data={}
offer_data.deal_id=51
offer_data.offer_expiration_date='2016-01-01';
offer_data.offer_price='4000';
offer_data.purpose='for dev';
offer_data.detail='for development';
//$.get('/deal/offer', offer_data, function(data){console.log(data);})
exports.offer = function(req, res){
	var params= req.body;
	if(params=={}) params=req.query;
	console.log(params)

	var deal_id=params.deal_id;
	var offer_price=params.offer_price;
	var offer_expiration_date=params.offer_expiration_date;

	var param_arr=[];
	param_arr.push(deal_id);
	param_arr.push(offer_price);
	param_arr.push(offer_expiration_date);




	var qs='INSERT INTO cm_deal_log (deal_id, offer_price, offer_expiration_date) VALUES (?,?,?)'

	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err){
		console.log('err', err);
		if(!err){
			//email_notify('simdj58@gmail.com', '92sustod', 'tlaehdwls9@naver.com', making_suggest_email_content(params) );
			//res.json(true);
			res.redirect('market/deal_list', req.render_info);

		}else{
			res.json(false);
		}
		dbconn=null;
	})


}


exports.cancel = function(req, res){
	res.end();
}



//input will be deal_log_id
var accept_data={}
accept_data.deal_log_id=14;
//$.get('/deal/accept', accept_data, function(data){console.log(data);} );
exports.accept = function(req, res){
	var params=req.query || req.body;

	var deal_log_id=params.deal_log_id;

	var param_arr=[];
	param_arr.push(deal_log_id);



	var qs="UPDATE cm_deal_log "
		+" SET suggest_status='ACCEPTED' "
		+" WHERE deal_log_id=? "

	

	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err){
		console.log('err', err);
		if(!err){
			//email_notify('simdj58@gmail.com', '92sustod', 'tlaehdwls9@naver.com', making_suggest_email_content(params) );
			res.json(true);
		}else{
			res.json(false);
		}
		dbconn=null;
	});
}



//input will be deal_log_id
var deny_data={}
deny_data.deal_log_id=14;
deny_data.seller_comment='We want much money';
//$.get('/deal/deny', deny_data, function(data){console.log(data);} );
exports.deny = function(req, res){
	var params=req.query || req.body;

	var deal_log_id=params.deal_log_id;

	var param_arr=[];
	param_arr.push(deal_log_id);



	var qs="UPDATE cm_deal_log "
		+" SET suggest_status='DENIED' "
		+" WHERE deal_log_id=? "

	

	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err){
		console.log('err', err);
		if(!err){
			//email_notify('simdj58@gmail.com', '92sustod', 'tlaehdwls9@naver.com', making_suggest_email_content(params) );
			res.json(true);
		}else{
			res.json(false);
		}
		dbconn=null;
	});
}







exports.deal_interface_offer = function(req, res){
	var deal_id=(req.query ? req.query.deal_id : '')
	req.render_info.deal_id=deal_id;

	//db read 
	//deal id -> repo, release

	res.render('market/deal/buyer/deal_offer', req.render_info);
}
exports.deal_interface_list = function(req, res){
	res.render('market/deal/deal_list', req.render_info);
}


// localhost/deal/interface/start
exports.deal_interface_start = function(req, res){
	var repository= ( req.query ? req.query.repository : '');
	var release_version = ( req.query ? req.query.release_version : '');

	req.render_info.repository=repository;
	req.render_info.release_version = release_version;

	res.render('market/deal/buyer/deal_start', req.render_info);
}

exports.deal_log_interface_list = function(req, res){
	var deal_id=(req.query ? req.query.deal_id : '')
	req.render_info.deal_id=deal_id;

	//db read 
	//deal id -> repo, release

	res.render('market/deal/deal_log_list', req.render_info);
}