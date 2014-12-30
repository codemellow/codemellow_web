var milestoneController = {
	_header : null,

	_cacheElement : {

	},

	_ajaxURL : {
	},

	_data : {

	},
	_template : {

	},

	init: function(){
		this._header = projectHeaderController;

		this.setElement();
		this.setData();
		this.setEventHandler();

		this.setDefaults();
	},

	setValue : function(key, value){
		this._data[key] = value;
	},

	getValue : function(key){
		return this._data[key];
	},

	setElement : function(){
	},

	setData : function(){

	},

	setEventHandler : function(){
	},

	setDefaults : function() {
	}
}
