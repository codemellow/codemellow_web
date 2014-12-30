$('#mypage').on('click',function(){
	get_myprofile();
	$(".mypage_content").addClass("hidden");
	$('#mypage_bottom_content').addClass("hidden");
})

$(".mypage_category").on('click',function(e){

	var content = $('#mypage_content_'+this.dataset.target);
	var isClosed = content.hasClass("hidden");

	if(isClosed && this.dataset.target == 'profile'){
		get_myprofile();
	}
	if(isClosed && this.dataset.target == 'myproject'){
		$('#mypage_project_list')[0].innerHTML = "";
		get_myproject_list();
	}

	$(".mypage_content").addClass("hidden");

	if(isClosed){
		content.removeClass("hidden");
		$('#mypage_bottom_content').removeClass("hidden");
		$("#utility_content_wrapper").addClass("height_Strech_Animation")
		$("#utility_content_wrapper").height("calc(100% - 0px)");
	}else{
		$('#mypage_bottom_content').addClass("hidden");
		$("#utility_content_wrapper").removeClass("height_Strech_Animation")
		$("#utility_content_wrapper").height("450px");
	}
})

$(".profile_edit").on('click',function(e){

	var content = $('#profile_content_'+this.dataset.target);
	
	var icon_image = $(content.parent().siblings().last()[0].children);

	if(icon_image.hasClass('glyphicon-pencil')){
		icon_image.removeClass('glyphicon-pencil');
		icon_image.addClass('glyphicon-floppy-disk');

		content.prop("readonly", false);
		content.focus();
		content.select();
	}else{
		icon_image.removeClass('glyphicon-floppy-disk');
		icon_image.addClass('glyphicon-pencil');
		content.prop("readonly", true);
		save_myprofile(this.dataset.target, content[0].value);
	}
})

function push_project_list_DOM(project_info){
	var templete = ""
	+"<a href='/market/[repository_name]'>"
	+	"<div class='col-xs-12 col-sm-6 col-md-4 small_project_entry repository_list_card mypage_project_card' data-toggle='modal' data-target='#project_desc_modal'> "
	+		"<div class='col-xs-3'><img src='[project_img_url]' class='mypage_project_image'/></div> "
	+		"<div class='col-xs-9'>"
	+			"<div class='col-xs-12'>[repo_maintainer]</div> "
	+			"<div class='col-xs-12'>[repo_project]</div> "
	+		"</div>"
	+	"</div>"
	+"</a>";

    var repo_img = project_info.thumbnail_url ? project_info.thumbnail_url : '/image/add_your_img.png';
	var repo_maintainer= '<div class="repository_list_card_maintainer">'+project_info.repository_name.split('/')[0]+'</div>'
	var repo_project= 	'<div class="repository_list_card_project_name">'+project_info.repository_name.split('/')[1]+'</div>'

	var list_DOM = $('#mypage_project_list')[0];
	list_DOM.innerHTML += templete.replace('[project_img_url]', repo_img).replace('[repository_name]', project_info.repository_name).replace('[repo_maintainer]',repo_maintainer).replace('[repo_project]',repo_project);
}

function add_event_listener(){
	$('.small_project_entry').on('click', function(event){
		var text;
		event.preventDefault();
		text = 'project_modal';
		projectInfo.state = "project_modal";

		projectInfo.url = this.parentElement.getAttribute('href');
		projectInfo.user_name = projectInfo.url.split('/')[2];
		projectInfo.project_name = projectInfo.url.split('/')[3];  
		projectInfo.repository_name = projectInfo.user_name + '/' + projectInfo.project_name;

		get_project_data(projectInfo);

		history.pushState(projectInfo, text, projectInfo.url);
		add_recent_vew(projectInfo);		
	});
}

function set_myprofile(profile_data){
	$('#profile_content_sns')[0].value = profile_data.sns_id ? profile_data.sns_id : "";
	$('#profile_content_website')[0].value = profile_data.homepage ? profile_data.homepage : "";
	$('#profile_content_paypal')[0].value = profile_data.paypal_id ? profile_data.paypal_id : "";
	var profile_image = profile_data.profile_image_url ? profile_data.profile_image_url : "/image/add_your_img.png";
	$('.mypage_my_image').attr('src', profile_image); 
}

function get_myprofile(){
	$.post("/ajax/get_myprofile", function(profile_data){
		if(profile_data){
			set_myprofile(profile_data);
		}else{
			alert('GET USER PROFILE Error!');
		}
	})	
}

function save_myprofile(target, value){
	var post_data = {
		target: target,
		value: value
	}
	$.post("/ajax/save_user_info", post_data, function(res){
		if(res){
			alert('Edit Success');
		}else{
			alert('Save Error!')
		}
	})
}

function get_myproject_list(){
	$.post("/get_project_list", function(project_list){
		project_list.forEach(function(project_info){
			push_project_list_DOM(project_info);
		});
		add_event_listener();
	})
}