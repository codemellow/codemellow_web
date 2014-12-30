


module.exports = function () {
	return new Market();
};


function Market(){
}


Market.prototype.attention_view_contents = function(req, res){
	console.log('adadw');
	res.json('kkokko');
}