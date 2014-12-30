$(document).ready(function(){
	$("#resent_email").on("keydown", function(e){
		if(e.keyCode == 13){
			$("#resent_button").trigger("click");
		}
	})
	$("#resent_button").on("click", function(){
		var email = $("#resent_email").val();
		$.post("/resent_email", {email: email}, function(result){
			if(result.err){
				alert(result.msg)
			}else{
				alert("Success")
			}
		})
	})
	$("#link_to_main").on('click', function(){
		location.href='/market';
	})
})