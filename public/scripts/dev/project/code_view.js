var codeViewController = {
	_cacheElement : {
		directory_file : null,
		code_file : null
	},

	_data : {
		file_path : null,
		repository_name : null,
		codeData : null
	},


	init: function(){
		this.setElement();
		this.setData();
		this.setEventHandler();

		this.setDefault();
	},

	setValue : function(key, value){
		this._data[key] = value;
	},

	getValue : function(key){
		return this._data[key];
	},

	setElement : function(){
		this._cacheElement.directory_file = $('.directory_file');
		this._cacheElement.code_file = $('.code_file');
	},

	setData : function(){
		var temp = this._data.file_path.split("/");
		this._data.file_name = temp.pop();

		$('.file_path').text(temp.join(" / ") + " / ");
		$('.file_name').text(this._data.file_name);
	},

	setEventHandler : function(){
	},

	setDefault : function(){
		this.getCodeData();
	},

	getCodeData : function(){
		var self = this;

		var postData = {
			file_path : this._data.file_path,
			repository_name : this._data.repository_name,
			highlight : false
		}
		var filetype=postData.file_path.split('.').pop()
		switch(filetype){
		    case 'textile':
		    case 'md':
		    case 'mediawiki':
		    	postData.highlight=true
				$.post("/ajax/repository/code/view", postData, function(data){
					$("#code_viewer").addClass('markdown-body')
					self._data.codeData = data;
					$("#code_viewer").append(data);
				});
				break;
			default:
				$.post("/ajax/repository/code/view", postData, function(data){
					self._data.codeData = data;
					$("#code_viewer").removeClass('markdown-body')
					var temp  = '<pre><code>{{content}}</code></pre>'
					temp = temp.replace('{{content}}', data);
					$("#code_viewer").append(temp);
					self.preNumbering();
				});	
		}	
	},

	preNumbering : function() {
		var pre = $('#code_viewer pre');
		var pl = pre.length;

		for (var i = 0; i < pl; i++) {
			pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
			var num = pre[i].innerHTML.split(/\n/).length;
			for (var j = 0; j < num; j++) {
				var line_num = pre[i].getElementsByTagName('span')[0];
				line_num.innerHTML += '<span>' + (j + 1) + '</span>';
			}
		}		
	}
}
