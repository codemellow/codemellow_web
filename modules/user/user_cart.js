
var mysql_handler = require('../mysql_handler/mysql_handler');


exports.add_cart = function(req, res){
	var user_id=req.session.user.id;
	var repository_id=req.body.repository_id;
	mysql_handler.is_exist_cart(user_id,repository_id,function(data){
		if(!data){
			mysql_handler.add_cart(user_id,repository_id,function(data1){
				if(data1){
					res.json(data1);
				}
				else{
					res.json(null)
				}
			})
		}
		else{
			res.json(null)
		}
		
	})
	
};
exports.add_cart_multiple = function(req, res){
	var user_id=req.session.user.id;
	var repository_id_list=req.body.repository_id_list;
	mysql_handler.add_cart_multiple(user_id,repository_id_list,function(data1){
		if(data1){
			res.json(data1);
		}
		else{
			res.json(null)
		}
	})
	
};

exports.delete_cart = function(req, res){
	var user_id=req.session.user.id;
	var repository_id=req.body.repository_id;
	mysql_handler.delete_cart (user_id,repository_id,function(data){
		if(data){
			res.json(data);
		}
		else{
			res.json(null)
		}
		
	})
};


exports.get_cart_list = function(req, res){
	var user_id=req.session.user.id;
	mysql_handler.get_cart_list(user_id,function(data){
		if(data){
			res.json(data);
		}else{
			//there's no data
			res.json(null);
		}
	})
};