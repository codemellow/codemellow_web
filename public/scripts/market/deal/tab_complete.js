//1.buyer
//1-1. buyer do complete?? -> license
//1-2. buyer do cancel!

//2. seller
//2-1. completed by buyer including pay
//2-2. cancelled by buyer






function ajax_get_buyer_complete_deal(callback){
	var buyer_complete_req={}
	buyer_complete_req.op='';
	buyer_complete_req.buyer_name=location.pathname.split("/")[1];
	buyer_complete_req.seller_name='';

	//complete condition
	buyer_complete_req.status_condition='( status = "COMPLETED" OR status = "CANCELLED" )'


	$.post('/ajax/deal/list', buyer_complete_req, function(buyer_deal_complete_arr){
		//global.deal_complete_arr=buyer_deal_complete_arr;
		buyer_deal_complete_arr.forEach(function(el){
			switch(el.status){
				case 'COMPLETED':
					el.deal_status='completed'
					break;
				case 'CANCELLED':
					el.deal_status='cancelled'
					break;
				default:
					el.deal_status='';
			}
		})

		if(typeof callback =='function') {
			callback(buyer_deal_complete_arr);
		}
		

	});
}

function ajax_get_seller_complete_deal(callback){
	

	var seller_complete_req={}
	seller_complete_req.op='';
	seller_complete_req.buyer_name='';
	seller_complete_req.seller_name=location.pathname.split('/')[1];
	//seller_complete_req.status_condition='( status = "NEGOTIATING" OR status = "DENIED" OR status = "ACCEPTED")'
	seller_complete_req.status_condition='( status = "COMPLETED" OR status = "CANCELLED" )'

	$.post('/ajax/deal/list', seller_complete_req, function(seller_deal_complete_arr){
		//global.deal_arr=deal_arr;
		seller_deal_complete_arr.forEach(function(el){
			switch(el.status){
				case 'COMPLETED':
					el.deal_status='completed'
					break;
				case 'CANCELLED':
					el.deal_status='cancelled'
					break;
				default:
					el.deal_status='';
			}
		})
		if(typeof callback =='function') {
			callback(seller_deal_complete_arr);
		}

	});
}




function ajax_get_complete_deal(callback){
	ajax_get_buyer_complete_deal(function(seller_deal_complete_arr){
		
		global.deal_complete_arr=seller_deal_complete_arr;
		
		ajax_get_seller_complete_deal(function(buyer_deal_complete_arr){

			global.deal_complete_arr=global.deal_complete_arr.concat(buyer_deal_complete_arr);

			global.deal_complete_arr.sort(function(a,b){
				return b.created_date - a.created_date;
			});

			if(typeof callback =='function') {
				callback();
			}

		});
	});
}


function listup_complete_card(){
	ajax_get_complete_deal(function(){
		
		//use [global.deal_complete_arr]
		global.deal_complete_arr.forEach(function(el){

			$("#deal_complete_list").append( html_complete_deal_card(el)  )	
		})
		refresh_complete_card();

	});

}

function refresh_complete_card(){
	$("#modal_deal_reoffer_redirect_url").val(location.pathname);

	$(".deal_complete_completed").click(function(e){
		console.log('COMPLETED modal')
		set_current_deal_info($(".deal_id", this).val(), global.deal_complete_arr);
		$("#modal_deal_completed").modal();
	});

	$(".deal_complete_cancelled").click(function(e){
		console.log('CANCELLED modal')
		set_current_deal_info($(".deal_id", this).val(), global.deal_complete_arr);
		$("#modal_deal_cancelled").modal();
	});




	$("#modal_deal_completed").on('show.bs.modal', function(e){
		$("#modal_deal_completed_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
		$("#modal_deal_completed_project").text(global.current_deal_info.repository_name.split('/')[1])
		$("#modal_deal_completed_status").text(global.current_deal_info.status);

		$("#modal_deal_completed_purpose").text(global.current_deal_info.purpose)
		$("#modal_deal_completed_explanation").text(global.current_deal_info.explanation)
		$("#modal_deal_completed_expiration_date").text(global.current_deal_info.expiration_date)
		$("#modal_deal_completed_price").text(global.current_deal_info.price)
	});

	$("#modal_deal_cancelled").on('show.bs.modal', function(e){
		$("#modal_deal_cancelled_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
		$("#modal_deal_cancelled_project").text(global.current_deal_info.repository_name.split('/')[1])
		$("#modal_deal_cancelled_status").text(global.current_deal_info.status);

		$("#modal_deal_cancelled_purpose").text(global.current_deal_info.purpose)
		$("#modal_deal_cancelled_explanation").text(global.current_deal_info.explanation)
		$("#modal_deal_cancelled_expiration_date").text(global.current_deal_info.expiration_date)
		$("#modal_deal_cancelled_price").text(global.current_deal_info.price)
	});

}



listup_complete_card();