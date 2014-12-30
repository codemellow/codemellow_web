var errMsg = {
	ERR_LOGIN_REQUEST: 'Login please',
	ERR_SAVE_USER_INFO: 'Fail to save user Information',
	ERR_GET_USER_INFO: 'Fail to get user Information'
}

var basic_handler = function(errCode, res){
	console.log(errMsg[errCode]);
	res.json(false);
}

exports.basic_handler = basic_handler;
