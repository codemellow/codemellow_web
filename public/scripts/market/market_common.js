

const_success_msg={
	ADD_CRAT_COMPLETE:"Add cart complete! check out cart list",
	UPLOAD_IMG_COMPLETE:"Upload image complete!",
	EMAIL_VERIFICATION_COMPLETE: "Thanks. Verification is completed"
};

const_err_msg={
	SERVER_ERR:"Server error occur",
	DATABASE_ERR:"Database error occur",
	NETWORK_ERR:"Network error",
	SENDDATA_ERR:"Wrong data sended",
	DUPLICATED_EMAIL_ERR:"Duplicate e-mail",
	ALEADY_IN_CART_ERR:"Already in cart",
	CONTACT_INFO:"codmellow@gmail.com",
	NOTFOUND_404_ERR_MSG:"404 not found.",
	CONTACT_PERSIST_ERR_MSG:"Please contact the server's administration if this problem persists.",
	EMAIL_GENERATE_ERROR: "Cannot generate email",
	NO_EXIST_PROJECT_ERR:"There's no such projects",
	NEED_SESSION:"Need a Session"
};

const_err_code={
	SERVER_ERR:1,
	DATABASE_ERR:2,
	NETWORK_ERR:3,
	NETWORK_ERR:4,
	DATA_ERR:5
};

const_user_code={
	NOTLOGIN:0,
	LOGIN:1
};

const_mypage_index_code = {
	PROFILE:1,
	MYPROJECT:2,
	GRAPH:3,
	LOGOUT:4
}

const_localStorage_key={
	recent_count: "recent_count",
	recent_item: "recent_item",
	cart_user_item:"cart_user_item",
	cart_none_user_item:"cart_none_user_item",
	cart_user_info:"cart_user_info"
};

global_user={
	status:const_user_code.NOTLOGIN,
	user_name:undefined,
	user_type : 'Buyer'
};
global_mysql={};

global_deal={
	deal_progress_arr : [],
	selected_deal_arr : []
};
global_repository={
	current_repository_info : {}
}
global_loading = function(){
	if($("#loading").hasClass("hidden")){
		$("#loading").removeClass("hidden")
	}else{
		$("#loading").addClass("hidden")
	}
}

global_function ={
	is_login : function(){
		if(global_user.status!==const_user_code.LOGIN){
			return false;	
		}
		return true;
	},

	require_login : function (){
		if(!global_function.is_login()){
			global_function.login_alert();
			return false;	
		}
		return true;
	},
	login_alert : function(e){
		// $("#alert_modal_title").text('Login Alert')
		// $("#alert_modal_message").text('Login plz');
		// $("#alert_modal_ok_btn").text("Go to Login");
		// $("#alert_modal_ok_btn").off('click');
		// $("#alert_modal_ok_btn").on('click', function(e){
		// 	$(".modal").modal('hide');
		// 	if(	$("#utility_content_login").hasClass("utility_menu") ){
		// 		$("#login").click();
		// 	}
		// });
		// $("#alert_modal").modal('show');
		alert("Login Please")
	},

	register_alert :function(e){
		// $("#alert_modal_title").text('Register Alert')
		// $("#alert_modal_message").text('Register plz');
		// $("#alert_modal_ok_btn").text("Go to Register");
		// $("#alert_modal_ok_btn").off('click');
		// $("#alert_modal_ok_btn").on('click', function(e){
		// 	$(".modal").modal('hide');
		// 	if(	$("#utility_content_login").hasClass("utility_menu") ){
		// 		$("#login").click();
		// 	}
		// });
		// $("#alert_modal").modal('show');
		alert("Register Please");
	},

	register_paypal_id : function(e){
		// $("#alert_modal_title").text('Paypal Alert')
		// $("#alert_modal_message").text('Register your Paypal info to receive money');
		// $("#alert_modal_ok_btn").text("Go to Register Paypal info");
		// $("#alert_modal_ok_btn").off('click');
		// $("#alert_modal_ok_btn").on('click', function(e){
		// 	$(".modal").modal('hide');
		// 	if(global_user.status){
		// 		location.href='/'+global_user.user_name+'/edit';
		// 	}
		// });
		// $("#alert_modal").modal('show');
		alert("Register your Paypal info to receive money");
	},


	fill_every_input_alert : function(e){
		// $("#alert_modal_title").text('Fill Every Input')
		// $("#alert_modal_message").text('Fill Every Input');
		// $("#alert_modal_ok_btn").text("Ok");
		// $("#alert_modal_ok_btn").off('click');
		// $("#alert_modal_ok_btn").on('click', function(e){
		// 	$("#alert_modal").modal('hide');
		// });
		// $("#alert_modal").modal('show');
		alert("Fill Every Input");
	},


	long_name_hover_animation:function(){
        var long_name_animateright=function(){
          $(this).animate({scrollLeft:this.scrollWidth-$(this).width()}, (this.scrollWidth-$(this).width())*15);
          $(this).one('mouseleave',long_name_animateleft)
        }
        var long_name_animateleft=function(){
          $(this).animate({scrollLeft:0}, (this.scrollWidth-$(this).width())*15);
          $(this).one('mouseover',long_name_animateright)
        }
        $('.long_name_overflow').one('mouseover',long_name_animateright)
        $('.long_name_overflow').one('mouseleave',long_name_animateleft)
    },
	hover_custom:function(hoverfunc,leavefunc,jquerytarget){
        var hoverfunc_new=function(){
          hoverfunc();
          $(this).one('mouseleave',leavefunc_new)
        }
        var leavefunc_new=function(){
          leavefunc();
          $(this).one('mouseover',hoverfunc_new)
        }
        jquerytarget.one('mouseover',hoverfunc_new)
        jquerytarget.one('mouseleave',leavefunc_new)
    },

    capitalize_first_letter : function(str){
    	var a=str.split(' ');
    	for(var i=0;i<a.length;i++){
    		a[i]=a[i][0] ? a[i][0].toUpperCase()+a[i].substr(1) : a[i];
    	}
    	return a.join(' ');
    },

    //var data=[{repository_id:10, amount : 20}];
    //global_function.donate_now(data);
   	donate_now : function(donate_list){
   		if( global_function.require_login() ){
   			var donate_req={};
	    	donate_req.donate_list=donate_list;

	    	donate_req.donor_id=global_user.user_id;

	    	// [  {repository_id : 1, amount : 100 }, {repository_id : 2, amount : 200 } ] 

	    	$.post('/donate/req', donate_req, function(res){
	    		console.log(res);
	    		window.open(res.pay_url);
	    	})	
   		}
   		
   	},
   	
   	//global_function.deal_now($("#project_desc_modal_deal_offer_form"));
   	deal_now : function(which_form){

   		//which_form <-- $('#modal_deal_offer_form')

   		if( global_function.require_login() ){
			which_form.find("input[name='repository_id']").val(global_repository.current_repository_info.repository_id);
			which_form.find("input[name='seller_id']").val(global_repository.current_repository_info.maintainer_id);
			which_form.find("input[name='buyer_id']").val(global_user.user_id);
			which_form.find("input[name='buyer_name']").val(global_user.user_name);

			var offer_form_data = which_form.serializeArray(); 
			var fd=new FormData();

			offer_form_data.forEach(function(input){
				fd.append(input.name,input.value);
			});

			console.log(offer_form_data);
			for(var i=0;i<offer_form_data.length;i++){
				if(!offer_form_data[i].value){
				  global_function.fill_every_input_alert();
				  return false;
				}
			}

			$.ajax({
				url: '/'+global_repository.current_repository_info.repository_name+'/deal/offer',
				data: fd,
				contentType: false,
				processData: false,
				type: 'POST',
				success: function(data){
				    console.log('offer res', data);
				    mydeal_buyer();
				    global_function.view_deal_header('progress');
				}
			});






   		}
   	},

   	view_deal_header : function(which){
   		$(".modal").modal('hide');
		if(	$("#utility_content_deal").hasClass("utility_menu") ){
			$("#mydeal").click();
			if(which=='progress'){
				$('div[data-target="in_progress_deal"]').click();
			}
		}
   	}



}

