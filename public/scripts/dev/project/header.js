var getURLParameter = function(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var projectHeaderController = {
	_cacheElement : {
		fork_btn: null,
		star_btn: null
	},

	_ajaxURL : {
		commit_count : "/ajax/{{repository}}/commit/count",
		branch_count : "/ajax/{{repository}}/branch/count",
		contributor_count : "/ajax/{{repository}}/contributor/count"
	},

	_data : {
		cloneURL : null,
		repository_name : null
	},

	init: function(){

		this._ajaxURL.commit_count = this._ajaxURL.commit_count.replace("{{repository}}", this.getValue("repository_name"));
		this._ajaxURL.branch_count = this._ajaxURL.branch_count.replace("{{repository}}", this.getValue("repository_name"));
		this._ajaxURL.contributor_count = this._ajaxURL.contributor_count.replace("{{repository}}", this.getValue("repository_name"));

		this.setElement();
		this.setData();
		this.setEventHandler();

		this.getAjaxData();
	},

  	setValue : function(key, value){
    		this._data[key] = value;
  	},

  	getValue : function(key){
    		return this._data[key];
  	},

	setElement : function(){
		this._cacheElement.fork_btn = $('#project_header_fork');
		this._cacheElement.star_btn = $('#project_header_star');
	},

	setData : function(){
		this._data.cloneURL = $('.clone_url_text').text();
		var className = location.pathname.split('/')[3];
		if(className == 'commits')
			className = "commit";
		else if(className == 'dir')
			className = 'code';

		$('.header_'+className+'_btn').css('color', 'black');

	},

	setEventHandler : function(){
		this.setStarEvent();
		this.cloneURLEvent();
	},

	setStarEvent: function(){
		var _btn = this._cacheElement.star_btn;
	},

	cloneURLEvent: function(){
		var self = this;
		$('.clone_url_icon').on('click', function(){
			var text = self._data.cloneURL;
			if(window.clipboardData){  
				window.clipboardData.setData('text', text);
			}  else {                     
				window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);  
			}			
		})
	},

	getAjaxData: function(){
		var self = this;
		$.post(this._ajaxURL.commit_count, function(result){
			if(result.status){
				self.setValue('commitCount', parseInt(result.data));
				var temp = $('#older_page')[0];
				if(temp){
					var page = getURLParameter("page") ? getURLParameter("page") : 1
					if(result.data > page*20){
						temp.disabled = false
					}
				}
				$('.category_commits').text(result.data);
			}else{
				alert(result.errmsg);
			}
		});

		$.post(this._ajaxURL.branch_count, function(result){
			if(result.status){
				self.setValue('branchCount', parseInt(result.data));
				$('.category_branchs').text(result.data);
			}else{
				alert(result.errmsg);
			}
		})
		$('.category_releases').text('0');
		$.post(this._ajaxURL.contributor_count, function(result){
			if(result.status){
				self.setValue('contributorCount', parseInt(result.data));
				$('.category_contributors').text(result.data);
			}else{
				alert(result.errmsg);
			}
		});
		$('.category_income').text('0');
	}
}

var setLocalStorage = function(){
	localStorage.setItem('skip', null);
	location.href = "/"+projectHeaderController.getValue("repository_name")+"/visualization";
}