$("document").ready(function(){
	$("#sign_in_bt").click(function(){
		var email = $("#input-userid");
		var password = $("#input-userpw");
		var obj = {email: email.val(), pw: password.val()}
		if(!email.val()){
			make_alert("please fill in blanks");
			$("#login_alert").show();
			//alert("please fill in blanks");
			email.focus();
			return;
		}
		if(!password.val()){
			make_alert("please fill in blanks");
			password.focus();
			return;
		}
		$("#header_email").val(email.val());
      	$("#header_pw").val(password.val());
		$("#header_form").submit();
	});
	$("#input-userid").keypress(function(data){
		if(data.keyCode == 13){
			$("#sign_in_bt").click();
		}
	})
	$("#input-userpw").keypress(function(data){
		if(data.keyCode == 13){
			$("#sign_in_bt").click();	
		}
	})
	var make_alert = function(msg){
		$("#login_alert").remove();
		str = "";
		str += "<div id='login_alert' class='alert main-alert alert-dismissable row-margin'>";
		str += "	<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
		str += "	<strong>Warning!</strong> " + msg;
		str += "</div>";
		$("#info_container").append(str);
	}

	$("#find_pw_send_bt").click(function(){
		var email = $("#find_pw_email").val();
		$.post("/find_password", {email:email}, function(result){
			console.log(result);
		})
	})
});