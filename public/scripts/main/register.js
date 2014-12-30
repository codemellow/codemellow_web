$(document).ready(function(){
	var check_1 = false;
	var check_2 = false;
	var check_3 = false;
	var check_4 = false;
	var check_5 = false;
	var check_6 = false;

	$("#client_email").focusout(function(){
		var obj = {email: $(this).val()};
		var result = $(this);
		if(result.val()=="") return;
		if(/^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test(obj.email)){
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			$.post("/duplicate_check", obj, function(res){
				if(res){
					result.removeClass("alert-danger")
					result.addClass("alert-success")
					check_1 = true;
				}else{
					result.val('')
					result.attr('placeholder', 'duplicated')
					result.removeClass("alert-success")
					result.addClass("alert-danger")
					check_1 = false;
				}
			})
		}else{
			result.val('')
			result.attr('placeholder', 'use email form')
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			check_1 = false;
		}
	});
	$("#client_email_check").focusout(function(){
		var result = $(this);
		if(result.val()=="") return;
		if($("#client_email").val() != $(this).val()){
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			result.val('')
			result.attr('placeholder', 'different')
			check_5 = false;
		}else{
			result.removeClass("alert-danger")
			result.addClass("alert-success")
			check_5 = true;
		}
	});
	$("#client_name").focusout(function(){
		var obj = {nickname: $(this).val()};
		var result = $(this);
		if(result.val()=="") return;
		if(/^[A-Za-z\s]*$/g.test(obj.nickname)){
			result.removeClass("alert-danger")
			result.addClass("alert-success")
			check_3 = true;
		}else{
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			result.val('')
			result.attr('placeholder', 'use only english');
			check_3 = false;
		}
	});
	$("#client_password").focusout(function(){
		var pw = $(this).val();
		var result = $(this);
		if(result.val()=="") return;
		/*if(/[!@#]+/.test(pw)&& /[0-9a-z]+/.test(pw) && pw.length >= 8){
			result.removeClass("alert-danger")
			result.addClass("alert-success")
			check_2 = true;
		}else{
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			result.val('')
			result.attr('placeholder', 'not accepted');
			check_2 = false;
		}*/
		result.removeClass("alert-danger")
		result.addClass("alert-success")
		check_2 = true;
	})
	$("#client_password_check").focusout(function(){
		var result = $(this);
		if(result.val()=="") return;
		if($("#client_password").val() != $(this).val()){
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			result.val('')
			result.attr('placeholder', 'different');
			check_4 = false;
		}else{
			result.removeClass("alert-danger")
			result.addClass("alert-success")
			check_4 = true;
		}
	})
	$("#client_phone").focusout(function(){
		var result = $(this);
		if(result.val()=="") return;
		if(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(result.val())){
			result.removeClass("alert-danger")
			result.addClass("alert-success")
			check_6 = true;
		}else{
			result.removeClass("alert-success")
			result.addClass("alert-danger")
			result.val('')
			result.attr('placeholder', 'not accepted');
			check_6 = false;
		}
	})
	$("#register").click(function(){
		if(check_1 && check_2 && check_3 && check_4 && check_5 && check_6){
			var obj = {email: $("#join_email").val(), pw: $("#join_pw").val(), name: $("#join_name").val()};
			/*$("#join_email").val('');
			$("#join_email").siblings().removeClass("alert-success");
			$("#join_pw").val('');
			$("#join_pw").siblings().removeClass("alert-success");
			$("#join_pw_check").val('');
			$("#join_pw_check").siblings().removeClass("alert-success");
			$("#join_name").val('');
			$("#join_name").siblings().removeClass("alert-success");*/
			$("#register_form").submit();
		}
	})
})