var CreateNewProjectController = {
	_cacheElement : {
		fileForm : null,
		formNewProject : null
	},

	_data : {
		user_name : null,
		crop_img_url : null
	},

	init: function(){
		this.setElement();
		this.setEventHandler();
	},

	setValue : function(key, value){
		this._data[key] = value;
	},

	getValue : function(key){
		return this._data[key];
	},

	setElement : function(){
		this._cacheElement.fileForm = $('#fileInputForm');
		this._cacheElement.formNewProject = $("#form_new_project");
	},
	setEventHandler : function(){
		var self=this;
		self._cacheElement.fileForm.on('dragover', self.handleDragOver, false);
		self._cacheElement.fileForm.on('drop', self.handleFileSelect, false);
		self._cacheElement.formNewProject.submit( function(eventObj){
			var name = self.getValue("user_name");
			if(name!="false" && name !=null){
			    $(this).append('<input type="hidden" name="user_name" value="'+name+'"/>');               
			    return true;
			}else{
				location.href="/login_please";
				return false;
			}
		});
		$('#image_input').on('change', function(){
			$('#image_input').css('height', '20px');
			$('#image_input').css('width', '20px');
			self.readURL(this);
		});
		$('#create_new_project').on('click',function(){
			$("#image_data_input").val(self._data.crop_img_url)
			$('#form_new_project').submit()
		})
		$('.cropimage').each(function(){
			var image = $(this),
		    cropwidth = image.attr('cropwidth'),
		    cropheight = image.attr('cropheight');	
			image.cropbox({width: cropwidth, height: cropheight, showControls: 'auto' })
		    	.on('cropbox', function( event, results, img ) {
		    	self._data.crop_img_url= img.getDataURL();
		    });
		})
	},
	handleFileSelect : function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		CreateNewProjectController.readURL(evt.dataTransfer);
		$('#image_input')[0].files = evt.dataTransfer.files;
	},
	handleDragOver : function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	},
	readURL : function(input){
		var self=this
		if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
				self._cacheElement.fileForm.attr('src', e.target.result);
				self._cacheElement.fileForm.each( function () {
			        var image = $(this),
			            cropwidth = image.attr('cropwidth'),
			            cropheight = image.attr('cropheight'),
			            results = $('.results' );
			        image.cropbox( {width: cropwidth, height: cropheight, showControls: 'auto' } )
			            .on('cropbox', function( event, results, img ) {
			           self._data.crop_img_url= img.getDataURL();
			        });
			    });
	        }
	        reader.readAsDataURL(input.files[0]);
	    }	
	}
}