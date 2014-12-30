window.requestAnimFrame = function(callback){
	window.setTimeout(callback, 30);
};

var visualController = {
  _cacheElement : {

  },

  _data : {
  	circleObjArray : [],
  	circleArray : []
  },

  _ajaxURL : {
      commit_count : "/ajax/{{repository}}/commit/count",
      branch_count : "/ajax/{{repository}}/branch/count",
      contributor_count : "/ajax/{{repository}}/contributor/count"
  },

  init: function(){

	this._ajaxURL.commit_count = this._ajaxURL.commit_count.replace("{{repository}}", this.getValue("repository_name"));
	this._ajaxURL.branch_count = this._ajaxURL.branch_count.replace("{{repository}}", this.getValue("repository_name"));
  this._ajaxURL.contributor_count = this._ajaxURL.contributor_count.replace("{{repository}}", this.getValue("repository_name"));

	this.getAjaxData();
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
  	this._cacheElement.canvas = document.getElementById('myCanvas');
  	this._cacheElement.incomeTxt = $('#income-txt');
  },

  setData : function(){
	this.setValue("context", this._cacheElement.canvas.getContext('2d'));
  },

  setEventHandler : function(){
  	var self = this;

  	$('#never_see_btn_container').on('click', function(){
  		localStorage.setItem("skip", true);
  		location.href = "/"+self.getValue("repository_name")+'/dir/master';
  	})
  },	

  setDefault : function(){
  	this.makeCircleObject('commit', 'rgba(10, 175, 173, 1)', 0);
  	this.makeCircleObject('branch', 'rgba(165, 232, 247, 1)', 0);
  	this.makeCircleObject('release', 'rgba(107, 196, 58, 1)', 0);
  	this.makeCircleObject('contributor', 'rgba(244, 225, 146, 1)', 0);
  	this.makeCircleObject('income', 'rgba(255, 255, 255, 1)', 0);
  	this.setOrbit(300, 400);
  	window.requestAnimFrame(animLoop);
  },

  setOrbit : function(innerRadius, outerRadius){
  	var radius = (innerRadius + outerRadius) / 2;
  	var canvasSize = outerRadius+50;
  	var orbit = {
  		radius : innerRadius,
  		canvasSize : canvasSize,
  		gab : outerRadius - innerRadius
  	}

  	this.setValue("orbit", orbit);
  	this.setCanvas(canvasSize*2, canvasSize*2);
  	this.setCircleArray();
  },

  setCanvas : function(width, height){
  	this._cacheElement.canvas.width = width;
  	this._cacheElement.canvas.height = height;
  	this._cacheElement.incomeTxt.css('top', height/2 - 45)
  },

  makeCircleObject : function(name, color, number){
  	var circleObj = {
  		name : name,
  		color : color,
  		number :  Math.floor(Math.log(1+number)*20)
  	}

  	var circleObjArray = this.getValue("circleObjArray");
  	circleObjArray.push(circleObj);
  	this.setValue("circleObjArray", circleObjArray);
  },

  setCircleObject : function(name, color, number){
  	var circleObjArray = this.getValue("circleObjArray");
  	var i=0;
  	for(i=0;i<circleObjArray.length;i++){
  		if(circleObjArray[i].name == name){
  			if(number)
	  			circleObjArray[i].number = number;
	  		if(color)
	  			circleObjArray[i].color = color;
  		}
  	}
  	this.setValue("circleObjArray", circleObjArray);
  },

  getCircleObject : function(name){
  	var circleArray = this.getValue("circleArray");
  	var i=0;
  	for(i=0;i<circleArray.length;i++){
  		if(circleArray[i].name == name){
  			return circleArray[i];
  		}
  	}
  	return null;
  },

  setCircleArray : function(){
  	var circleArray = [];
  	var circleObjArray = this.getValue("circleObjArray");
  	var orbit = this.getValue("orbit");
  	var i, j;

  	for(i=0;i<circleObjArray.length;i++){
  		for(j=0;j<circleObjArray[i].number;j++){
	 		var personalRadius = orbit.radius + orbit.gab * Math.random();/*getRandomArbitrary(-1, 1)*/
			var centerX =  this.getRandom(orbit.canvasSize - personalRadius, orbit.canvasSize + personalRadius);
			var centerY = Math.sqrt(personalRadius * personalRadius - ((centerX-orbit.canvasSize) * (centerX-orbit.canvasSize)))+orbit.canvasSize;
			if(this.getRandom(0, 1) > 0.5){
				centerY = centerY - 2 * (centerY - orbit.canvasSize);
			}
			var radius = this.getRandom(2, 10);
			var velocity = Math.PI/180 * this.getRandom(0.1, 1);
			var circle = {
				centerX : centerX,
				centerY : centerY,
				cos : Math.cos(velocity),
				sin : Math.sin(velocity),
				radius : radius,
				name : circleObjArray[i].name,
				color : circleObjArray[i].color
			}
			circleArray.push(circle); 			
  		}
  	}

  	this.setValue("circleArray", circleArray);
  },

  rotateLoop : function(){
  	var context = this.getValue("context");
  	var canvas = this._cacheElement.canvas;
  	var circleArray = this.getValue("circleArray");
  	var orbit = this.getValue("orbit");

	context.clearRect(0, 0, canvas.width, canvas.height);

	for(i in circleArray){
		var diffX = orbit.canvasSize - circleArray[i].centerX;
		var diffY = orbit.canvasSize - circleArray[i].centerY;

		circleArray[i].centerX = orbit.canvasSize - (diffX * circleArray[i].cos + diffY * circleArray[i].sin);
		circleArray[i].centerY = orbit.canvasSize - (diffY * circleArray[i].cos - diffX * circleArray[i].sin);
		
		var radius = circleArray[i].radius;
		context.beginPath();
		context.arc(circleArray[i].centerX, circleArray[i].centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = circleArray[i].color;
		context.fill();
		context.lineWidth = 1;
		context.closePath();
	}
  },

  getRandom : function(min, max){
	return Math.random() * (max - min) + min;
  },

	getAjaxData: function(){
		var self = this;
		$.post(this._ajaxURL.commit_count, function(result){
			if(result.status){
				self.setValue('commitCount', parseInt(result.data));
				$('.info_value.commits').text(result.data);
				self.setCircleObject('commit', null, Math.floor(Math.log(1+parseInt(result.data))*20));
				self.setCircleArray();
			}else{
				alert(result.errmsg);
			}
		});

		$.post(this._ajaxURL.branch_count, function(result){
			if(result.status){
				self.setValue('branchCount', parseInt(result.data));
				$('.info_value.branches').text(result.data);
				self.setCircleObject('branch', null, Math.floor(Math.log(1+parseInt(result.data))*20));
				self.setCircleArray();

			}else{
				alert(result.errmsg);
			}
		})
		$('.info_value.releases').text('0');
    $.post(this._ajaxURL.contributor_count, function(result){
      if(result.status){
        self.setValue('contributorCount', parseInt(result.data));
        $('.info_value.contributors').text(result.data);
        self.setCircleObject('contributor', null, Math.floor(Math.log(1+parseInt(result.data))*20));
        self.setCircleArray();
      }else{
        alert(result.errmsg);
      }
    });
		$('info_value.income').text('0');
		$('#income-amount').text('$ 0');
	}
}

var animLoop = function(){
	window.requestAnimFrame(animLoop);
	visualController.rotateLoop();  
};
