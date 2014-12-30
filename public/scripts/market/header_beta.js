var processing = false;
var doWork =  function() {
	processing = false;
}
var add_recent_vew = function(projectInfo){
  var recent_count = localStorage.getItem(const_localStorage_key.recent_count);
  var items = [];
  if(recent_count==null) recent_count=0;
  if(recent_count != 0){
    items = JSON.parse(localStorage.getItem(const_localStorage_key.recent_item));
    for(var i in items){
    	if(items[i].url==projectInfo.url) return;
    }
    if(recent_count == 15) delete items[0]; else recent_count++;
  }else recent_count++;
  items.push(projectInfo);
  localStorage.setItem(const_localStorage_key.recent_item, JSON.stringify(items));
  localStorage.setItem(const_localStorage_key.recent_count, recent_count);
}

$(document).ready(function(){
	//head
	{
		var before = -2, current_flag = false;

		$("#utility_content_wrapper").data('wrapper_type',-2)
		var find_target = function(code){
			switch(code){
				case -1: return "#utility_content_mypage";
				case 0: return "#utility_content_login";
				case 1: return "#utility_content_deal";
				case 2: return "#utility_content_notice";
				case 3: return "#utility_content_search";
				case 4: return "#utility_content_cart";
				case 5: return "#utility_content_interest";
				case 6: return "#utility_content_new_project";
			}
		}
		var load_function = function(code){
			var container = $("#utility_container");
			var content = $("#content");
			
			$("#utility_content_wrapper").data('wrapper_type',code)
			if(current_flag && before == code){
				$("#utility_content_wrapper").height("450px");
				//$("#utility_content_wrapper").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
					$("#register").text("Register");
					$("#information").addClass("hidden");
				//});
				
				container.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						container.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						container.addClass("hidden"); 
						var target = $(find_target(code));
						target.addClass("utility_menu")
						processing = false;
					}
				)
				container.removeClass("hidden");
				container.addClass("pt-page-moveToBottom");
				container.css("background-color", "transparent")
				content.height("100%");
				content.removeClass("pt-page-pullDown");
				content.addClass("pt-page-movetoOrigin");
				content.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						content.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						content.removeClass("pt-page-movetoOrigin");
						
					}
				)
				current_flag = false;
			}else if(before != code && current_flag){
				if(code != 6/* && code != 5*/){
					$("#utility_content_wrapper").height("450px");
					$("#utility_content_wrapper").unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
					$("#utility_content_wrapper").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
						if(code != 0){
							$("#register").text("Register");
							$("#information").addClass("hidden");	
						}
					});
				}else{
					$("#utility_content_wrapper").height("100%");
					$("#register").text("Register");
					$("#information").addClass("hidden");
				}
				var target = $(find_target(code)), before_target = $(find_target(before));
				if(before < code){
					target.removeClass("utility_menu");
					target.addClass("pt-page-moveFromRightFade");
					before_target.addClass("pt-page-rightfade");
					//left
				}else{
					target.removeClass("utility_menu");
					target.addClass("pt-page-moveFromLeftFade");
					before_target.addClass("pt-page-leftfade");
					//right
				}
				before_target.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						before_target.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						before_target.removeClass("pt-page-leftfade");
						before_target.removeClass("pt-page-rightfade");
						before_target.addClass("utility_menu");
					}
				)
				target.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						target.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						target.removeClass("pt-page-moveFromRightFade");
						target.removeClass("pt-page-moveFromLeftFade");
						processing = false;
					}
				)
			}else{
				var target = $(find_target(code))
				target.removeClass("utility_menu");
				//target.css("display", "inline-block");
				if(code == 6/* || code == 5*/){
					$("#utility_content_wrapper").removeClass("height_Strech_Animation")
					$("#utility_content_wrapper").height("calc(100% - 0px)");
					$("#utility_content_wrapper").addClass("height_Strech_Animation")
				}
				container.removeClass("hidden");
				container.css("top", $(document).scrollTop() + 50);
				container.removeClass("pt-page-moveToBottom");
				content.addClass("pt-page-pullDown");
				content.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						content.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						content.css('height', 'calc(100% - 450px)')
						container.css("background-color", "rgba(50, 50, 50, 0.8)")
						processing = false;
					}
				)
				
				current_flag = true;
			}
			before = code;
		}
		var header_icon_click_handle=function(e){
			$(this).parent().parent().find("a").css('z-index','-1');
			load_function(  parseInt($(this).data('load')) );
			setTimeout(function(){
				$("#mydeal").parent().parent().find("a").css('z-index','');
			},1000);
		}
		$("#mypage").on('click', header_icon_click_handle)
		$("#login").on('click', header_icon_click_handle)
		$("#mydeal").on('click', header_icon_click_handle)
		$("#notice").on('click', header_icon_click_handle)
		$("#search").on('click', header_icon_click_handle)
		$("#cart").on('click', header_icon_click_handle)
		$("#interest").on('click', header_icon_click_handle)
		$("#new_project").on('click', header_icon_click_handle)
		$('#search_input_box').keydown(function(e){
		  if(e.keyCode == 13){
		  	var postdata = {};
			  postdata.msg = $('#search_input_box').val();
			  postdata.page = 1;
			  if(postdata.msg != ""){
			    location.href = '/market/classic/'+postdata.msg+'/1'
			  }
		  }
		});
		$("#header_close").on('click', function(){
		  $("#header_input-userid").text();
		  $("#header_input-userpw").text();
		})
		$("#header_sign_in").on('click', function(){
		  $("#header_email").val($("#header_input-userid").val());
		  $("#header_pw").val($("#header_input-userpw").val());
		  $("#header_form").submit();
		})
		$("#header_input-userid,#header_input-userpw").keydown(function(e){
		  if(e.keyCode == 13){
		    $("#header_sign_in").click();
		  }
		})
	}
	//left sidebar
	{
		$("#trigger_sidemenu").on('click', function(){
			
			if(processing) return;
			processing = true;
			setTimeout('doWork()', 800);

			var sidebar = $("#left_sidebar");
			var content = $("#content, #header_container, #utility_content_wrapper");
			if(sidebar.hasClass("hidden")){
				sidebar.removeClass("hidden")
				sidebar.addClass("slidInAnimation");
				content.addClass("slidRightAnimation");
				sidebar.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						sidebar.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						sidebar.removeClass("slidInAnimation");
					}
				)
			}else{
				
				sidebar.addClass("slidOutAnimation");
				content.addClass("slidLeftAnimation");
				sidebar.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						sidebar.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						sidebar.addClass("hidden");
						sidebar.removeClass("slidOutAnimation");
						content.removeClass("slidRightAnimation");
						content.removeClass("slidLeftAnimation");
						
					}
				)
			}
		})
		$("#sidebar_content").click(function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		$("#left_sidebar").click(function(){
			$("#trigger_sidemenu").trigger("click");
		})
	}
	//register
	{
		//register
		$("#register").on('click', function(){
			if($("#information").hasClass("hidden")){
				$("#information").removeClass("hidden");
				$("#utility_content_wrapper").height("calc(100% - 0px)");
				$(this).text("Register now")
			}else{
				var birth = {date: $("#date>option:selected").val(), month:$("#month>option:selected"), year: $("#year>option:selected").val()}
				if($("#sex>option:selected").val()=="Title"){
					$("#sex").focus(); return;
				}
				if(birth.date == "dd" && birth.month == "mm" && birth.year == "yyyy"){
					$("#date").focus(); return;
				}else{
					birth = birth.year + "-" + birth.month + "-" + birth.date;
				}
				if($("#information>div>div.has-error").length == 0 
					&& $("#information>div>div.has-success").length == 6){
					global_loading();
					var postobj = {
						sex: $("#sex>option:selected").val(),
						name: $("#name").val(),
						surname: $("#surname").val(),
						email: $("#email").val(),
						pw: $("#password").val(),
						type: $("[name=optionsRadios]:checked").val(),
						birth: birth
					}
					$.post("/join", postobj, function(result){
						global_loading();
						if(result.err){
							alert(const_err_msg[result.msg]);
						}else{
							location.href = "/market/verification";
						}
					})
				}else{
					if($("#information>div>div.has-error").length == 0){
						alert("Please fill blank")	
					}else{
						$("#information>div>div.has-error")[0].focus();	
					}
					return;
				}
			}
			
		})
		$("#name").focusout(function(){
			if(/^[A-Za-z\s]*$/g.test($(this).val())){
				$(this).parent().addClass("has-success");
				$(this).parent().removeClass("has-error");
			}else{ /*has-warning */
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}
		})
		$("#surname").focusout(function(){
			if(/^[A-Za-z\s]*$/g.test($(this).val())){
				$(this).parent().addClass("has-success");
				$(this).parent().removeClass("has-error");
			}else{ /*has-warning */
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}
		})
		$("#email").focusout(function(){
			var self = $(this);
			if(/^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test($(this).val())){
				$.post("/duplicate_check", {email: self.val()}, function(result){
					//console.log(result);
					if(result){
						self.parent().addClass("has-success");
						self.parent().removeClass("has-error");
					}else{
						self.parent().addClass("has-error");
						self.parent().removeClass("has-success");
						self.val("duplicated")
					}
				});
			}else{ /*has-warning */
				self.parent().addClass("has-error");
				self.parent().removeClass("has-success");
			}
		})
		$("#confirm_email").focusout(function(){
			if(/^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test($(this).val())
				&& $(this).val()==$("#email").val()){
				$(this).parent().addClass("has-success");
				$(this).parent().removeClass("has-error");
			}else{ /*has-warning */
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}
		})
		/*$("#password").focusout(function(){
			var pw = $(this).val();
			if(/[!@#]+/.test(pw)&& /[0-9a-z]+/.test(pw) && pw.length >= 8){
				$(this).parent().addClass("has-success");
				$(this).parent().removeClass("has-error");
			}else{ has-warning
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}
		})*/
		$("#password").keyup(function(){
			var passwd = $(this).val();
			var score = 0;
			var email_regex = new RegExp($("#email").val().substr(0, $("#email").val().indexOf('@')),"i");
			if(passwd.search(email_regex) == -1 && passwd.indexOf($("#surname").val()) == -1)
				score += 25;
			if(/[!@#]+/.test(passwd)) score += 25;
			if(/[0-9a-z]+/.test(passwd)) score += 25;
			if(passwd.length >= 8) score += 25;
			$(this).parent().addClass("has-success");
			$(this).parent().removeClass("has-error");
			if(score <= 50){
				$("#power_of_password").removeClass("progress-bar-warning")
				$("#power_of_password").removeClass("progress-bar-success")
				$("#power_of_password").addClass("progress-bar-danger")
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}else if(score <= 75){
				$("#power_of_password").addClass("progress-bar-warning")
				$("#power_of_password").removeClass("progress-bar-success")
				$("#power_of_password").removeClass("progress-bar-danger")
			}else{
				$("#power_of_password").removeClass("progress-bar-warning")
				$("#power_of_password").addClass("progress-bar-success")
				$("#power_of_password").removeClass("progress-bar-danger")
			}
			$("#power_of_password").attr('aria-valuenow', score);
			$("#power_of_password").attr('aria-valuenow', score);
			$("#power_of_password").css('width', score+"%");
			
		})
		$("#confirm_password").focusout(function(){
			var pw = $(this).val();
			if(/[!@#]+/.test(pw)&& /[0-9a-z]+/.test(pw) && pw.length >= 8 && $("#password").val() == pw){
				$(this).parent().addClass("has-success");
				$(this).parent().removeClass("has-error");
			}else{ /*has-warning */
				$(this).parent().addClass("has-error");
				$(this).parent().removeClass("has-success");
			}
		})
		$("#find_password_email").keydown(function(e){
			if(e.keyCode == 13){
				$("#find_password_button").trigger("click");
			}
		})
		$("#find_password_button").on('click', function(){
			global_loading();
			var email = $("#find_password_email").val();
			$.post("/find_password", {email: email}, function(result){
				global_loading();
				alert(result.result);
			})
		})
	}
	//right sidebar
	{
		$("#recentview").on('click', function(){
			if(processing) return;
			processing = true;
			setTimeout('doWork()', 800);

			var sidebar = $("#right_sidebar");
			var content = $("#content, #header_container, #utility_content_wrapper");
			if(sidebar.hasClass("hidden")){
				sidebar.removeClass("hidden")
				sidebar.addClass("right_slidInAnimation");
				content.addClass("right_slidRightAnimation");
				load_right_sidebar();
			}else{
				sidebar.removeClass("right_slidInAnimation");
				content.removeClass("right_slidRightAnimation");
				sidebar.addClass("right_slidOutAnimation");
				content.addClass("right_slidLeftAnimation");
				sidebar.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
					function() {
						sidebar.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
						sidebar.addClass("hidden");
						sidebar.removeClass("right_slidOutAnimation");
						content.removeClass("right_slidLeftAnimation");
						
					}
				)
			}
		})
		$("#right_sidebar_content").on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		$("#right_sidebar").on("click", function(){
			$("#recentview").trigger("click");
		})
		$("#right_sidebar_content").hover(function(){}, function(){$(".hover ").addClass("hidden")})
	}


	
})
var cart_clear=function(){
	localStorage.removeItem(const_localStorage_key.cart_user_item);
	localStorage.removeItem(const_localStorage_key.cart_none_user_item);
}
var logout = function(){
	$.post("/main_logout", function(){
		global_user.status=const_user_code.NOTLOGIN;
		cart_clear()
  		location.href= "/market";
	})
}
var user_check_send_cart=function(callback){
	//var user_info= localStorage.getItem(const_localStorage_key.cart_user_info);
	if(global_user.status=const_user_code.LOGIN){
		var cart_none_user_item=JSON.parse(localStorage.getItem(const_localStorage_key.cart_none_user_item));
		var clength=cart_none_user_item?cart_none_user_item.length:0
		if(clength){
			var idlist=[]
			for(var i=0; i<clength;i++){
				idlist.push(cart_none_user_item[i].repository_id)
			}
			send_cart_items(idlist, callback);
		}
		else
			callback(true)
	}else{
		callback(false);
	}
}

var none_user_cart_clear=function(){
	localStorage.removeItem(const_localStorage_key.cart_none_user_item);
}
var send_cart_items=function(idlist,callback){
	var params={
		repository_id_list:idlist
	}
	$.ajax({
		type:"POST",
		url:"/ajax/cart/add/multiple",
		data:params,
		dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		success : function(data) {
				none_user_cart_clear();
				callback(data)
		},
		error : function(xhr, status, error) {
			callback(false)
		}
	})
}
var sign_in_check = function(){
	var postobj = {email: $("#login_email").val(), pw: $("#login_password").val()}
	if(postobj.email && postobj.pw && postobj.email!="" && postobj.pw!=""){
		global_loading();
		$.post("/main_login", postobj, function(result){
			global_loading();
			if(result.result){
				if(result.verified){
					global_user.status=const_user_code.LOGIN;
					user_check_send_cart(function(data){
						location.href = document.URL;
					})
				}else{
					location.href = "/market/verification"
				}
			}else{
				alert("login fail")
			}
		})	
	}
	return false;
}
var find_password = function(){
	$("#find_password_modal").removeClass("hidden");
}
var load_right_sidebar = function(){
	var entry_list = $("#right_sidebar_entry_list");
	var items = JSON.parse(localStorage.getItem(const_localStorage_key.recent_item));
	entry_list.find("li").remove();
	var element = "";
	for(var i in items){
		var str = "";
		str += '<div class="list-group-item right_sidebar_entry" index='+i+'>';
		str += '	<div class="row">'
		str += '		<div class="col-sm-4 recentview-center text-center">'
		str += '			<span class="glyphicon glyphicon-ok hidden cart-added-list"></span>'
		str += '			<img class="right_sidebar_hover_entry" src="/image/add_your_img.png">'
		str += '		</div>'
		str += '		<div class="col-sm-8 recentview-center recentview-content">'
		str += '			<div><h4 class="long_name_overflow recentview_user_name">'+items[i].user_name+'</h4></div>'
		str += '			<div><h3 class="long_name_overflow recentview_project_name">'+items[i].project_name+'</h3></div>'
		str += '		</div>'
		str += '	</div>'
		
		str += '	<div class="hover row hidden">'
		str += '		<div class="col-sm-4 recentview-center text-center">'
		str += '			<span class="glyphicon glyphicon-ok add-cart"></span>'
		str += '		</div>'
		str += '		<div class="col-sm-8 recentview-center text-center">'
		str += '			<div class="view-detail" index='+i+'><h4 class="recentview_viewDetail">View Detail</h4></div>'
		str += '		</div>'
		str += '	</div>'
		str += '</div>'
		element = str + element;
		//entry_list.prepend(str);
	}
	document.getElementById("right_sidebar_entry_list").innerHTML = element;
	$(".view-detail").on("click", function(e){
		var items = JSON.parse(localStorage.getItem(const_localStorage_key.recent_item));
		var projectInfo = items[$(this).attr('index')]; 
		text = 'project_modal';
		get_project_data(projectInfo);
		history.pushState(projectInfo, text, projectInfo.url);
		$("#project_desc_modal").modal();
	})
	$(".add-cart").on("click", function(e){
		var check_element = $(this).parent().parent().parent().find('.cart-added-list');
		if(check_element.hasClass('hidden')){
			$(this).css('color', "#e91e63");
			check_element.removeClass('hidden')
		}else{
			$(this).css('color', "#FFFFFF");
			check_element.addClass('hidden')
		}
	})

	$(".right_sidebar_hover_entry").mouseenter(function(){
		$(this).parent().parent().parent().find('.hover').removeClass('hidden')
	})
	$(".hover").mouseleave(function(){
		$(this).addClass('hidden')
	})


	global_function.long_name_hover_animation();
}