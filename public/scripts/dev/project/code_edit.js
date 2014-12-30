var editorController = {
	_cacheElement : {
		preview : null,
		codeViewer : null
	},

	_ajaxURL : {
		codeView : "/ajax/repository/code/view",
		readmeView : "/ajax/repository/readme/view",
		commit : "/ajax/{{repository}}/commit"
	},

	_data : {
		editor: null,
		file_path: null,
		file_name: null,
		repository_name: null,
		code: null
	},

	init : function(){
		var self = this;

		this._ajaxURL.commit = this._ajaxURL.commit.replace('{{repository}}', this.getValue("repository_name"));

		this.setElement();
		this.setData();
		this.setEventHandler();

      	this.getCode(this._ajaxURL.codeView, function(data){
			self.setValue('code', data);
			self.setCode();
		});
	},

	setValue : function(key, value){
		this._data[key] = value;
	},

	getValue : function(key){
		return this._data[key];
	},

	setElement : function() {
		this._cacheElement.previewTab = $("#preview_tab");
		this._cacheElement.codeViewer = $('#code_viewer')[0]
		this._cacheElement.preview = $("#code_preview");
		this._cacheElement.commit_change = $('#commit_change')[0];
		this._cacheElement.commit_message = $('.project_commit_title input');
		this._cacheElement.commit_comment = $('.project_commit_comment textarea');
	},

	setData : function() {
		var temp = this._data.file_path.split("/");
		this._data.file_name = temp.pop();

		console.log(temp);
		$('.file_path').text(temp.join(" / ") + " / ");
		$('.file_name').attr('value', this._data.file_name);

		this._data.editor = CodeMirror.fromTextArea(this._cacheElement.codeViewer, {
	        	lineNumbers: true,
	        	mode: "text/html"
      	});
	},

	setEventHandler : function() {
		this.defaultEvents();
		this.editorEvents();
		this.previewEvents();
	},

	defaultEvents : function(){
		var self = this;

		$('.clone_file_name').on('click', function(){
			var text = self.getValue("file_name");

			if(window.clipboardData){  
				window.clipboardData.setData('text', text);
			}  else {                     
				window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);  
			}			
		})
	},

	editorEvents : function(){
		var self = this;
		var commit_change = this._cacheElement.commit_change;
		var editor = this.getValue("editor");

		editor.on('change', function(e){
			if(self.getValue('code') == e.getValue()){
				commit_change.disabled = true;
			}else{
				commit_change.disabled = false;				
			}
		})

		$('#commit_change').on('click', function(){
			self.commit();
		})

		$('#commit_cancel').on('click', function(){
			location.href = '/'+self.getValue('repository_name')+'/code/master/'+self.getValue('file_path');
		})
	},

	previewEvents : function(){
		var self = this;
		var previewTab = this._cacheElement.previewTab;
		var preview = this._cacheElement.preview;

		previewTab.on("click",function(e){
			e.preventDefault()
			if($(this).attr("id")=="preview_tab"){
				self.getCode(self._ajaxURL.readmeView, function(data){
					preview.html(data);
				});
			}
		});
	},

	commit : function(){
		var self = this;
		var code = this.getValue("editor").getValue();
		var commit_message = this._cacheElement.commit_message.val()=="" ? "Update " + this.getValue("file_name") : this._cacheElement.commit_message.val()
		var commit_comment = this._cacheElement.commit_comment.val()=="" ? "Add optional extended description" : this._cacheElement.commit_comment.val();

		if(this.getValue('code') == code){
			alert('Code doesn`t change.');
			return;
		}

		var postData = {
			code : code,
			message : commit_message,
			comment : commit_comment,
			file_path : this.getValue('file_path')
		};

		$.post(this._ajaxURL.commit, postData, function(result){
			if(result.status){
				location.href = '/'+self.getValue('repository_name')+'/code/master/'+self.getValue('file_path');
			}else if(result.errmsg=="login error"){
				location.href = result.return_url + location.pathname;				
			}else{
				alert(result.errmsg);
			}
		});
	},

	getCode : function(ajaxURL, callback){
		var self = this;
		var editor = this.getValue("editor");

		var postData = {
			file_path : this.getValue("file_path"),
			repository_name : this.getValue("repository_name"),
			highlight : false,
			code_data : editor.getValue()
		}

		$.post(ajaxURL, postData, callback);
	},

	setCode : function() {
		var editor = this.getValue('editor');
		var code = this.getValue('code');
		editor.setValue(code);
	}
}
