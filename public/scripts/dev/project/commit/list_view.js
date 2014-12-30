var commitViewController = {
	_header : null,

	_cacheElement : {

	},

	_ajaxURL : {
		commitList : "/ajax/{{repository}}/commit/list"
	},

	_data : {
		CONST_DATE : ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		commitArray: []
	},
	_template : {
		commitList : ""
	           +'<li class="commit_content">'
                    +'<div class="row no_margin commit_list">'
                      +'<div class="pull-left img_and_msg">'
                        +'<img class="pull-left commiter_img" src="/image/sample_user_img2.png" alt="..." style="height:40px;width:40px">'
                        +'<a class="commit_msg" href="{{hash_url}}">'
                          +'<h4>{{commit_msg}}</h4>'
                          +'<h5>{{author}} authored {{date}}</h5>'
                        +'</a>'
                      +'</div>'
                      +'<div class="pull-right option_btn">'
                        +'<button class="btn btn-default clone_hash"><i class="fa fa-clipboard"></i></button>'
                        +'<button class="btn btn-default commit_hash">{{short_hash}}</button>'
                        +'<button class="btn btn-default commit_evaluation" data-index={{index}}>E</button>'
                      +'</div>'
                    +'</div>'
                    +'{{evaluation}}'
                  +'</li>',
           commitBody : ""
                  +'<div class="commit_container">'
                    +'<ul class="nav no_padding_left_right">{{content}}'
                    +'</ul>'
                  +'</div>',
		commitDate : ""
		        +'<div class="commit_date">'
                    +'{{commit_date}}'
                  +'</div>',
          commitEvaluation: ""
					+'<div class="row no_margin">'
						+'<div class="evaluation_container">'
							+'{{header}}{{body}}'
						+'</div>'
					+'</div>',
          commitEvaluationHeader : ""
                            +'<div class="evaluation_header">'
                              +'<div class="row no_margin evaluation_progress_bar">'
                                +'<div class="progress pull-left progress_content">'
                                  +'<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: {{progress}}%">'
                                  +'</div>'
                                +'</div>'
                                +'<div class="pull-right progress_text">{{progress}}% Completed</div>'
                              +'</div>'
                              +'<div class="row no_margin commit_info_bar">'
                                +'<div class="pull-left authored_info">'
                                  +'<span>SimDJ</span> authored 8 days ago'
                                +'</div>                                '
                                +'<div class="pull-right commit_info">{{commit_info}}</div>'
                              +'</div>'
                              +'<div class="row no_margin point_info_bar">'
                                +'<span class="evaluation_point_name">Min Point</span><span class="evaluation_point">{{minPoint}}p</span>'
                                +'<span class="evaluation_point_name">Max Point</span><span class="evaluation_point">{{maxPoint}}p</span>'
                                +'<span class="evaluation_point_name">Average Point</span><span class="evaluation_point">{{avePoint}}p</span>'
                              +'</div>'
                            +'</div>'
                            +'<hr>',
          commitEvaluationBody : ""
                            +'<div class="evaluation_body">'
                              +'<div class="commit_description">{{description}}</div>'
                              +'<ul class="nav no_padding_left_right">'
                              	+'{{evaluation_list}}'
                                +'<li class="evaluation_content my_evaluation_content">'
                                  +'<div class="row no_margin">'
                                    +'<div class="pull-left img_and_msg">'
                                      +'<img class="pull-left evaluation_img" src="/image/sample_user_img2.png" alt="..." style="height:40px;width:40px">'
                                      +'<input type="text" class="form-control" placeholder="Evaluation Point"></input>'
                                      +'<textarea class="form-control" rows="4" placeholder="Evaluation Message"></textarea>'
                                      +'<a class="evaluate" data-index={{index}}><i class="fa fa-check"></i></a>'
                                    +'</div>'
                                  +'</div>'
                                +'</li>'
                              +'</ul>'
                            +'</div>',
          evaluationList : ""
	                    +'<li class="evaluation_content">'
	                      +'<div class="row no_margin">'
	                        +'<div class="pull-left img_and_msg">'
	                          +'<img class="pull-left evaluation_img" src="/image/sample_user_img2.png" alt="..." style="height:40px;width:40px">'
	                          +'<a class="evaluation_msg" href="#">'
	                            +'<h4>{{evaluation_msg}}</h4>'
	                            +'<h5>{{author}} evaluated {{date}}</h5>'
	                          +'</a>'
	                        +'</div>'
	                      +'</div>'
	                    +'</li>'
	},

	init: function(){
		this._header = projectHeaderController;

		this._ajaxURL.commitList = this._ajaxURL.commitList.replace('{{repository}}', this.getValue("repository_name"));
		this.setElement();
		this.setData();
		this.setEventHandler();

		this.setDefaults();
		this.getCommits();
	},

	setValue : function(key, value){
		this._data[key] = value;
	},

	getValue : function(key){
		return this._data[key];
	},

	setElement : function(){
		this._cacheElement.newerBtn = $('#newer_page')[0];
		this._cacheElement.olderBtn = $('#older_page')[0];
		this._cacheElement.commit_list = $('#project_commit_list')[0];
	},

	setData : function(){
		var page = getURLParameter("page") ? getURLParameter("page") : 1
		this.setValue("page", parseInt(page));
	},

	setEventHandler : function(){
		this.pageMover();
	},

	pageMover : function(){
		var self = this;
		$('#newer_page').on('click', function(){
			location.href = location.pathname + '?page='+(self.getValue("page")-1);
		})

		$('#older_page').on('click', function(){
			location.href = location.pathname + '?page='+(self.getValue("page")+1);				
		})
	},

	setDefaults : function() {
		var newerBtn = this._cacheElement.newerBtn;
		var olderBtn = this._cacheElement.olderBtn;
		var page = this.getValue("page");

		if(page >1){
			newerBtn.disabled = false;
		}
	},

	getCommits : function(){
		var self = this;

		var postData = {
			page : this.getValue("page")
		}

		$.post(this._ajaxURL.commitList, postData, function(result){
			if(result.status){
				self.commitParser(result.data);
			}else{
				alert(result.errmsg);
			}
		})
	},

	commitParser : function(commitData){
		var parseData;
		var commitLineArray = commitData.split('\n');
		var commitData = {
			hash : null,
			date : null,
			relative_date : null,
			author : null,
			commit_msg : null
		}
		var commitArray = this.getValue("commitArray");

		for(var i=0;i<commitLineArray.length;i++){
			if(commitLineArray[i] =="")
				continue;
			commitData = {};
			parseData = commitLineArray[i].split(" ");

			commitData.hash = parseData[0];
			commitData.author = parseData[1];
			commitData.date = parseData[2];
			commitData.commit_msg = parseData.slice(6).join(" ");
			commitData.relative_date = parseData.splice(3,3).join(" ");
			commitArray.push(commitData);
		}

		this.setValue("commitArray", commitArray);
		this.setCommitDOM();
	},

	setCommitDOM : function(){
		var _DATE = this._template.commitDate;
		var _BODY = this._template.commitBody;
		var _LIST = this._template.commitList;

		var DOM = "";
		var li_DOM = "";
		var cmArray = this.getValue("commitArray");
		var date = "";
		var hash_url = "/"+this.getValue("repository_name")+'/commit/master/{{hash}}/';

		for(var i=0;i<cmArray.length;i++){

			if(cmArray[i].date != date){
				if(i!=0){
					DOM+=_BODY.replace("{{content}}", li_DOM);
					li_DOM="";
				}
				date = cmArray[i].date;				
				var temp = this.parseDate(date);
				DOM+=_DATE.replace("{{commit_date}}", temp);
			}
			
			li_DOM+=_LIST.replace("{{commit_msg}}", cmArray[i].commit_msg).replace("{{author}}", cmArray[i].author).replace("{{date}}", cmArray[i].relative_date).replace("{{commit_hash}}", cmArray[i].hash).replace("{{short_hash}}", cmArray[i].hash.substring(0,7)).replace('{{hash_url}}',hash_url.replace("{{hash}}",cmArray[i].hash)).replace("{{index}}", i).replace("{{evaluation}}","");
		}
		DOM+=_BODY.replace("{{content}}", li_DOM);;
		this._cacheElement.commit_list.innerHTML = DOM;

		this.setCommitData();
	},

	setCommitData : function(){
		this._cacheElement.commit_list_li = $('#project_commit_list .commit_content');
		this.commitDataEventBinding();
	},

	parseDate : function(iso_date){
		var CONST_DATE = this.getValue("CONST_DATE");
		var parseData = iso_date.split("-");
		var temp = "Commit on " + CONST_DATE[parseInt(parseData[1])]+' '+parseData[2]+', '+parseData[0];
		return temp;
	},

	commitDataEventBinding : function(){
		var self = this;
		var listDOM = this._cacheElement.commit_list_li;

		$('.commit_evaluation').off();
		$('.commit_evaluation').on('click', function(e){
			var index = $(this).data('index');
			var li_dom = $(self._cacheElement.commit_list_li[index]);
			var eval = li_dom.find('.evaluation_container');

			if(li_dom.hasClass("active")){
				li_dom.removeClass("active");
			}else{
				if(eval.length == 0){
					self.setEvaluationDOM(li_dom, index);					
				}
				li_dom.addClass("active");
			}
		});
		$('.img_and_msg .evaluate').on('click', function(e){
			var siblings = $(this).siblings();
			var evalObj = {
				index: $(this).data('index'),
				point: siblings[1].value,
				comment: siblings[2].value
			}

			self.evaluate(evalObj);
		})
	},

	setEvaluationDOM : function(listObj, index){
		var _HEADER = this._template.commitEvaluationHeader;
		var _BODY = this._template.commitEvaluationBody;
		var _LIST = this._template.evaluationList;
		var _EVAL = this._template.commitEvaluation;

		var headerDOM;
		var bodyDOM;
		var listDOM;
		var evalDOM;

		headerDOM = _HEADER.replace(/{{progress}}/g, 60).replace("{{minPoint}}", 50).replace("{{maxPoint}}", 100).replace("{{avePoint}}", 910).replace("{{commit_info}}", "hello");
		listDOM = _LIST.replace("{{evaluation_msg}}", "this is good commit").replace("{{author}}", "simdj").replace("{{date}}", "8 days ago");
		bodyDOM = _BODY.replace("{{evaluation_list}}", listDOM).replace("{{description}}", "Mellow your code.").replace("{{index}}", index);
		evalDOM = _EVAL.replace("{{header}}", headerDOM).replace("{{body}}", bodyDOM);

		listObj.append(evalDOM);
		this.setCommitData();
	},

	evaluate : function(evalObj){
		console.log(evalObj);
	}
}
