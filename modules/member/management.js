var mysql_handler = require("../mysql_handler/mysql_handler")
var crypto = require('crypto');
var settings = require('../../settings');
var nodemailer=require('nodemailer');
var randomstring = require('randomstring');
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",

    // admin's info
    auth: {
        user: "codmellow@gmail.com",
        pass: "ehowlsus14"
    }
});
// fix this
//mysql_handler.best_seller({start: '2013-12-21',end: '2014-06-04'});


exports.duplication_check = function(email, callback){
	mysql_handler.get_user_by_user_email(email, function(tmp, result){
		if(result){
			callback(false);
		}else{
			callback(true);
		}
	})
};
exports.edit_user_info = function(data, callback){
	data.passwd = crypto.createHmac('sha256',settings.data.hashkey).update(data.passwd).digest('binary');
	data.new_passwd = crypto.createHmac('sha256',settings.data.hashkey).update(data.new_passwd).digest('binary');
	mysql_handler.edit_user_info(data, function(err){
		if(err)
			callback({result: "err"});
		else
			callback({result: "success"});
	})
}
exports.member_join = function(user_obj, callback){
	var user = [];
	var crypted_password = crypto.createHmac('sha256',settings.data.hashkey).update(user_obj.pw).digest('binary');
	user.push(user_obj.email);
	user.push(crypted_password);
	user.push(user_obj.name);
	mysql_handler.insert_user(user, function(err, result){
		if(err){
				console.log(err);
				callback(true, result);
		}else{
			var verification_key = randomstring.generate(30);
			mysql_handler.insert_verification(result.insertId, crypto.createHmac('sha256',settings.data.hashkey).update(verification_key).digest('binary'), function(err, msg){
				if(!err){
					var mailOptions = {
						from: "Codemellow ✔ <dudbstjr70@gmail.com>", // sender address
						to: user_obj.email, // list of receivers
						subject: "[Codemellow] Your verification key", // Subject line
						text: "Your verification key is http://codemellow.net/verify_email/" + verification_key + "/" + result.insertId,
						html: "<b>Thank you</b>"+ " Your verification is <a href='http://codemellow.net/verify_email/" + verification_key + "/" + result.insertId + "'>http://codemellow.net/verify_email/" + verification_key + "/" + result.insertId + "</a>"
					}
					smtpTransport.sendMail(mailOptions, function(error){
						if(error){
							console.log(error);
							callback(true, "EMAIL_GENERATE_ERROR");
						}else{
							callback(false, result.insertId);
						}
						// if you don't want to use this transport object anymore, uncomment following line
						//smtpTransport.close(); // shut down the connection pool, no more messages
					});
				}else{
					callback(true, msg);
				}
			})	
		}
	})

}

exports.member_login = function(user_obj, callback){
	var user = [];
	var crypted_password = crypto.createHmac('sha256',settings.data.hashkey).update(user_obj.pw).digest('binary');

	user.push(user_obj.email);
	user.push(crypted_password);
	mysql_handler.login(user, function(result, data, verified){
		callback(result, data, verified);
	})
}

exports.member_project_list = function(user_id, callback){
	mysql_handler.get_user_project_list(user_id, function(err, data){
		if(err) console.log(err);
		callback(data);
	});
}
exports.find_password = function(email, callback){
	mysql_handler.get_user_by_user_email(email, function(err, result){
		if(!err){
			if(result){
				//var decryptedPassword = decipher.update(s.pw, 'base64', 'utf8');
				//decryptedPassword = decryptedPassword + decipher.final('utf8');
				var new_password = randomstring.generate(8);
				var mailOptions = {
					from: "Codemellow ✔ <dudbstjr70@gmail.com>", // sender address
					to: email, // list of receivers
					subject: "[Codemellow] Your password", // Subject line
					text: "Your new password is " + new_password, // plaintext body
					html: "<b>Thank you</b>"+ " Your new password is <i>" + new_password + "</i>" // html body
				}
				smtpTransport.sendMail(mailOptions, function(error, response){
					if(error){
						console.log(error);
						callback({err: true, result: "generate error"});
					}else{
						var pw = crypto.createHmac('sha256',settings.data.hashkey).update(new_password).digest('binary');
						mysql_handler.update_user_password(result.user_id, pw, function(){
							console.log("Message sent: " + response.message);
							callback({err: false, result: "success"});	
						})
					}
					// if you don't want to use this transport object anymore, uncomment following line
					//smtpTransport.close(); // shut down the connection pool, no more messages
				});
			}else{
				callback({err: true, result: "no matched user"});
			}
		}else{
			callback({err: true, result: "err"});
		}
	})
}

exports.verify_email = function(data, callback){
	var verify_key = crypto.createHmac('sha256',settings.data.hashkey).update(data.verify_key).digest('binary');
	var user_id =  data.user_id;

	mysql_handler.update_user_verification(verify_key, user_id, function(err){
		if(err){
			callback({result: "err"});
		}else{
			callback({result: "success"});
		}
	})
}

exports.send_verification_email = function(email, callback){
	mysql_handler.get_user_by_user_email(email, function(tmp, result){
		if(result){
			var verification_key = randomstring.generate(30);
			mysql_handler.insert_verification(result.user_id, crypto.createHmac('sha256',settings.data.hashkey).update(verification_key).digest('binary'), function(err){
				if(err == null){
					var mailOptions = {
						from: "Codemellow ✔ <codmellow@gmail.com>", // sender address
						to: email, // list of receivers
						subject: "[Codemellow] Your verification key", // Subject line
						text: "Your verification key is http://codemellow.net/verify_email/" + verification_key + "/" + result.user_id,
						html: "<b>Thank you</b>"+ " Your verification is <a href='http://codemellow.net/verify_email/" + verification_key + "/" + result.insertId + "'>http://codemellow.net/verify_email/" + verification_key + "/" + result.user_id + "</a>"
					}
					smtpTransport.sendMail(mailOptions, function(error, response){
						if(error){
							console.log(error);
							callback(true, "generate error");
						}else{
							callback(false, result.result_id);
						}
						// if you don't want to use this transport object anymore, uncomment following line
						//smtpTransport.close(); // shut down the connection pool, no more messages
					});
				}else{
					callback(true, "DB error");
				}
			})
		}else{
			callback(true, "No matched member");
		}
	})
}
exports.get_user_info = function(name, callback){
	var result = {}, target_user_id;
	mysql_handler.get_user_by_user_name(name, function(err, data){
		if(err){
			console.error(err);
			callback(err);
			return false;	
		}else if(!data){
			callback(true,{});
			return false;
		} 
		target_user_id = data.user_id;
		for( o in data){ result[o] = data[o]; }
		mysql_handler.get_dev_info(target_user_id, function(err, info){
			if(err){
				console.error(err);
				callback(err);
				return false;	
			} 
			for( o in info){ result[o] = info[o]; }
			mysql_handler.get_user_project_list(target_user_id, function(err, list){
				result.project_list = list;

				mysql_handler.get_user_contributing_project_list(target_user_id, function(err, contributing_list){
					result.contributing_list = contributing_list;
					callback(false, result);	
				});
				
			})
		})
	});
}