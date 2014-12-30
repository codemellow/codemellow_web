

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	readURL(evt.dataTransfer);
	$('#image_input')[0].files = evt.dataTransfer.files;
}

function handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

var fileForm = $('#fileInputForm');
fileForm.on('dragover', handleDragOver, false);
fileForm.on('drop', handleFileSelect, false);
$("#form_new_project").submit( function(eventObj){
	if(global_user.status){
	    $(this).append('<input type="hidden" name="user_name" value="'+global_user.user_name+'"/>');               
	    return true;
	}else{
		global_function.login_alert();
		return false;
	}
});
var crop_img_url;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
			 $('#fileInputForm').attr('src', e.target.result);
			 $( '#fileInputForm' ).each( function () {
		        var image = $(this),
		            cropwidth = image.attr('cropwidth'),
		            cropheight = image.attr('cropheight'),
		            results = $('.results' );
		        image.cropbox( {width: cropwidth, height: cropheight, showControls: 'auto' } )
		            .on('cropbox', function( event, results, img ) {
		           crop_img_url= img.getDataURL();
		        });
		    });
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$('#image_input').on('change', function(){
	$('#image_input').css('height', '20px');
	$('#image_input').css('width', '20px');
	readURL(this);
});
$('#create_new_project').on('click',function(){
	$("#image_data_input").val(crop_img_url)
	$('#form_new_project').submit()
})

function new_project_image_change(){
	// console.log('kkokko');
}

$('.cropimage').each(function(){
	var image = $(this),
    cropwidth = image.attr('cropwidth'),
    cropheight = image.attr('cropheight');	
	image.cropbox({width: cropwidth, height: cropheight, showControls: 'auto' })
    	.on('cropbox', function( event, results, img ) {
    	crop_img_url= img.getDataURL();
    });
})