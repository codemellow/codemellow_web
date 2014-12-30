var global={
	deal_progress_arr : [],
	deal_complete_arr : [],
	current_deal_info:{}
}

function set_current_deal_info(selected_deal_id, which_deal_arr){
	var len = which_deal_arr.length;
	for(var i=0;i<len;i++){
		if(which_deal_arr[i].deal_id == selected_deal_id){
			global.current_deal_info = which_deal_arr[i];
			break;
		}
	}

}






// function html_progress_deal_card(deal_info){
// 	var ret="";
// 	ret ="<div class='deal_info_wrapper col-lg-2 col-md-3 col-sm-4 col-xs-6 deal_progress_"+deal_info.status+"' style='margin-bottom:10px'>"
		
// 		+	"<div class='deal_info deal_progress_card' style='padding:4px;background-color:lightgray'>"
// 		+       "<input class='deal_id' type='text' value='"+deal_info.deal_id+"' style='display:none'>"
// 		+		"<img src='/l1.jpg' class='  ' style='width:100%'>"
				
// 		+		"<div class='deal_repo_info' style='background-color:white'>"
// 		+			"<div class='maintainer_name'>"+(deal_info.repository_name).split('/')[0]+"</div>"
// 		+			"<div class='repo_name'><strong>"+(deal_info.repository_name).split('/').pop()+"</strong></div>"
// 		+			"<div class='price'>$ "+deal_info.price+"</div>"
					
// 		+			"<div class='deal_status text-center row'>"
// 		+				"<div class='deal_status_display col-xs-8 col-xs-offset-2' style=' background-color:lightskyblue;color:white'>"+deal_info.status+"</div>"
// 		+			"</div>"
// 		+		"</div>"

// 		+	"</div>"
// 		+"</div>";

// 	return ret;
// }


// function html_completed_deal_card(deal_info){
// 	var ret="";
// 	ret ="<div class='deal_info_wrapper col-lg-2 col-md-3 col-sm-4 col-xs-6 deal_completed_"+deal_info.status+"' style='margin-bottom:10px'>"
		
// 		+	"<div class='deal_info deal_completed_card' style='padding:4px;background-color:lightgray'>"
// 		+       "<input class='deal_id' type='text' value='"+deal_info.deal_id+"' style='display:none'>"
// 		+		"<img src='/l1.jpg' class='  ' style='width:100%'>"
				
// 		+		"<div class='deal_repo_info' style='background-color:white'>"
// 		+			"<div class='maintainer_name'>"+(deal_info.repository_name).split('/')[0]+"</div>"
// 		+			"<div class='repo_name'><strong>"+(deal_info.repository_name).split('/').pop()+"</strong></div>"
// 		+			"<div class='price'>$ "+deal_info.price+"</div>"
					
// 		+			"<div class='deal_status text-center row'>"
// 		+				"<div class='deal_status_display col-xs-8 col-xs-offset-2' style=' background-color:lightskyblue;color:white'>"+deal_info.status+"</div>"
// 		+			"</div>"
// 		+		"</div>"

// 		+	"</div>"
// 		+"</div>";

// 	return ret;
// }



// $("#progress_deal_all").click(function(e){
// 	$(".deal_progress_NEGOTIATING").css('display','');
// 	$(".deal_progress_ACCEPTED").css('display','');
// 	$(".deal_progress_DENIED").css('display','');
// });

// $("#progress_deal_negotiate").click(function(e){
// 	$(".deal_progress_NEGOTIATING").css('display','');
// 	$(".deal_progress_ACCEPTED").css('display','none');
// 	$(".deal_progress_DENIED").css('display','none');
// });

// $("#progress_deal_accept").click(function(e){
// 	$(".deal_progress_NEGOTIATING").css('display','none');
// 	$(".deal_progress_ACCEPTED").css('display','');
// 	$(".deal_progress_DENIED").css('display','none');
// });


// $("#progress_deal_deny").click(function(e){
// 	$(".deal_progress_NEGOTIATING").css('display','none');
// 	$(".deal_progress_ACCEPTED").css('display','none');
// 	$(".deal_progress_DENIED").css('display','');

// });







function html_progress_deal_card(deal_info){
	var ret="";
	ret ="<div class='deal_info_wrapper col-lg-2 col-md-3 col-sm-4 col-xs-6 deal_progress_"+deal_info.deal_status+"' style='margin-bottom:10px'>"
		
		+	"<div class='deal_info deal_progress_card' style='padding:4px;background-color:lightgray'>"
		+       "<input class='deal_id' type='text' value='"+deal_info.deal_id+"' style='display:none'>"
		+		"<img src='/l1.jpg' class='  ' style='width:100%'>"
				
		+		"<div class='deal_repo_info' style='background-color:white'>"
		+			"<div class='maintainer_name'>"+(deal_info.repository_name).split('/')[0]+"</div>"
		+			"<div class='repo_name'><strong>"+(deal_info.repository_name).split('/').pop()+"</strong></div>"
		+			"<div class='price'>$ "+deal_info.price+"</div>"
					
		+			"<div class='deal_status text-center row'>"
		+				"<div class='deal_status_display col-xs-8 col-xs-offset-2' style=' background-color:lightskyblue;color:white'>"
		+					deal_info.deal_status
		+				"</div>"
		+			"</div>"
		+		"</div>"

		+	"</div>"
		+"</div>";

	return ret;
}




function html_complete_deal_card(deal_info){
	var ret="";
	ret ="<div class='deal_info_wrapper col-lg-2 col-md-3 col-sm-4 col-xs-6 deal_complete_"+deal_info.deal_status+"' style='margin-bottom:10px'>"
		
		+	"<div class='deal_info deal_complete_card' style='padding:4px;background-color:lightgray'>"
		+       "<input class='deal_id' type='text' value='"+deal_info.deal_id+"' style='display:none'>"
		+		"<img src='/l1.jpg' class='  ' style='width:100%'>"
				
		+		"<div class='deal_repo_info' style='background-color:white'>"
		+			"<div class='maintainer_name'>"+(deal_info.repository_name).split('/')[0]+"</div>"
		+			"<div class='repo_name'><strong>"+(deal_info.repository_name).split('/').pop()+"</strong></div>"
		+			"<div class='price'>$ "+deal_info.price+"</div>"
					
		+			"<div class='deal_status text-center row'>"
		+				"<div class='deal_status_display col-xs-8 col-xs-offset-2' style=' background-color:lightskyblue;color:white'>"
		+					deal_info.deal_status
		+				"</div>"
		+			"</div>"
		+		"</div>"

		+	"</div>"
		+"</div>";

	return ret;
}