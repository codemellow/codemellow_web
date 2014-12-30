//1.license I bought
//2.license I'm selling




function ajax_get_buyer_license(callback){
	var buyer_license_req={};
	
}



// function ajax_get_buyer_progress_deal(callback){
// 	var buyer_progress_req={}
// 	buyer_progress_req.op='';
// 	buyer_progress_req.buyer_name=location.pathname.split("/")[1];
// 	buyer_progress_req.seller_name='';

// 	//progress condition
// 	buyer_progress_req.status_condition='( status = "NEGOTIATING" OR status = "DENIED" OR status = "ACCEPTED")'


// 	$.post('/ajax/deal/list', buyer_progress_req, function(buyer_deal_progress_arr){
// 		//global.deal_progress_arr=buyer_deal_progress_arr;
// 		buyer_deal_progress_arr.forEach(function(el){
// 			switch(el.status){
// 				case 'NEGOTIATING':
// 					el.deal_status='negotiating'
// 					break;
// 				case 'ACCEPTED':
// 					el.deal_status='accepted'
// 					break;
// 				case 'DENIED':
// 					el.deal_status='denied'
// 					break;
// 				default:
// 					el.deal_status='';
// 			}
// 		})

// 		if(typeof callback =='function') {
// 			callback(buyer_deal_progress_arr);
// 		}
		
	


// 	});

// }


// function ajax_get_seller_progress_deal(callback){
// 	// var list={};
// 	// //list.repository_name='simdj/pintos';
// 	// list.buyer_name='pcs';
// 	// list.status='NEGOTIATING';


// 	var seller_progress_req={}
// 	seller_progress_req.op='';
// 	seller_progress_req.buyer_name='';
// 	seller_progress_req.seller_name=location.pathname.split('/')[1];
// 	//seller_progress_req.status_condition='( status = "NEGOTIATING" OR status = "DENIED" OR status = "ACCEPTED")'
// 	seller_progress_req.status_condition='( status = "NEGOTIATING")'

// 	$.post('/ajax/deal/list', seller_progress_req, function(seller_deal_progress_arr){
// 		//global.deal_arr=deal_arr;
// 		console.log('seller_deal_progress_arr',seller_deal_progress_arr);

// 		seller_deal_progress_arr.forEach(function(el){
// 			el.deal_status='offered'
// 		})
// 		if(typeof callback =='function') {
// 			callback(seller_deal_progress_arr);
// 		}

		
		

		




// 	});

// }


// function ajax_get_progress_deal(callback){
// 	ajax_get_seller_progress_deal(function(seller_deal_progress_arr){
		
// 		global.deal_progress_arr=seller_deal_progress_arr;
		
// 		ajax_get_buyer_progress_deal(function(buyer_deal_progress_arr){

// 			global.deal_progress_arr=global.deal_progress_arr.concat(buyer_deal_progress_arr);

			

// 			global.deal_progress_arr.sort(function(a,b){
// 				return b.created_date>a.created_date;
// 			});

			

// 			if(typeof callback =='function') {
// 				callback();
// 			}

// 		});
// 	});
// }


// function listup_progress_card(){
// 	ajax_get_progress_deal(function(){
		
// 		//use [global.deal_progress_arr]
// 		global.deal_progress_arr.forEach(function(el){
// 			$("#deal_progress_list").append( html_progress_deal_card(el)  )	
// 		})
// 		refresh_progress_card();

// 	});

// }


// function refresh_progress_card(){


// 	$(".deal_progress_accepted").click(function(e){
// 		set_current_deal_info($(".deal_id", this).val(), global.deal_progress_arr);
// 		$("#modal_deal_accepted").modal();
// 	});



// 	$(".deal_progress_denied").click(function(e){
// 		set_current_deal_info($(".deal_id", this).val(), global.deal_progress_arr);
// 		$("#modal_deal_denied").modal();

// 	})


// 	$(".deal_progress_negotiating").click(function(e){
// 		set_current_deal_info($(".deal_id", this).val(), global.deal_progress_arr);
		
// 		$("#modal_deal_view_offer").modal();
// 	});


// 	$(".deal_progress_offered").click(function(e){
// 		set_current_deal_info($(".deal_id", this).val(), global.deal_progress_arr);
		
// 		$("#modal_deal_view_offered").modal();
// 	});




// 	$("#modal_deal_denied_redirect_url").val(location.pathname);

// 	$("#modal_deal_view_offered_redirect_url").val(location.pathname);

// }





// 	// for(var i=0;i<deal_arr.length;i++){
// 		// 	$("#deal_progress_list").append(make_deal_card_html(deal_arr[i], 'progress_card') )
			
// 		// }




// 	// for(var i=0;i<deal_progress_arr.length;i++){
// 		// 	$("#deal_progress_list").append(  html_progress_deal_card(deal_progress_arr[i])  )
// 		// }





		


		
// 		// modal_deal_view_offer_handle();
// 		// modal_deal_denied_handle();
// 		// modal_deal_accepted_handle();







// 		// $(".deal_progress_card").click(function(e){
// 		// 	var selected_deal_id= $(".deal_id", this).val();
// 		// 	for(var i=0;i<global.deal_arr.length;i++){
// 		// 		if(global.deal_arr[i].deal_id==selected_deal_id){
// 		// 			global.current_deal_info= global.deal_arr[i];
// 		// 			break;
// 		// 		}
// 		// 	}
// 		// 	$("#modal_deal_view_offered").modal();
// 		// });



		


// 		// $("#modal_deal_view_offered").on('show.bs.modal', function(e){
// 		// 	console.log('hi');
// 		// 	$("#modal_deal_view_offered_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
// 		// 	$("#modal_deal_view_offered_project").text(global.current_deal_info.repository_name.split('/')[1])
// 		// 	$("#modal_deal_view_offered_status").text(global.current_deal_info.status);

// 		// 	$("#modal_deal_view_offered_id").val(global.current_deal_info.deal_id);

// 		// 	$("#modal_deal_view_offered_purpose").val(global.current_deal_info.purpose)
// 		// 	$("#modal_deal_view_offered_explanation").val(global.current_deal_info.explanation)


// 		// 	var expiration_date=new Date(global.current_deal_info.expiration_date);
// 		// 	$("#modal_deal_view_offered_expiration_date").val(expiration_date.toISOString().slice(0,10))

// 		// 	$("#modal_deal_view_offered_price").val(global.current_deal_info.price)

// 		// 	$("#modal_deal_view_offered_seller_comment").val(global.current_deal_info.seller_comment)
// 		// });



// 		// $("#modal_deal_view_offered").on('hide.bs.modal', function(e){
// 		// 	$("#seller_comment_wrapper").css("display","none");
// 		// });











// function modal_deal_accepted_handle(){
// 	$("#modal_deal_accepted").on('show.bs.modal', function(e){
// 		$("#modal_deal_accepted_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
// 		$("#modal_deal_accepted_project").text(global.current_deal_info.repository_name.split('/')[1])
// 		$("#modal_deal_accepted_status").text(global.current_deal_info.status);

// 		$("#modal_deal_accepted_id").val(global.current_deal_info.deal_id);

// 		$("#modal_deal_accepted_purpose").val(global.current_deal_info.purpose)
// 		$("#modal_deal_accepted_explanation").val(global.current_deal_info.explanation)


// 		var expiration_date=new Date(global.current_deal_info.expiration_date);
// 		$("#modal_deal_accepted_expiration_date").val(expiration_date.toISOString().slice(0,10))

// 		$("#modal_deal_accepted_price").val(global.current_deal_info.price)

// 	});

// 	$("#modal_deal_accepted_pay").click(function(){
// 		$.post('/pay/url/get'
// 			, {deal_id : global.current_deal_info.deal_id} 
// 			,function(data){
// 				console.log(data);
// 				window.open(
// 				  data.pay_url,
// 				  '_blank' // <- This is what makes it open in a new window.
// 				);
// 			}
// 		);
// 		//global.current_deal_info.deal_id;
// 	})



// 	// $("#modal_deal_accepted").on('hide.bs.modal', function(e){
// 	// 	$("#seller_comment_wrapper").css("display","none");
// 	// });
		
// }



// function modal_deal_denied_handle(){


// 	$("#modal_deal_denied").on('show.bs.modal', function(e){
// 		$("#modal_deal_denied_redirect_url").val(location.pathname);
		
// 		$("#modal_deal_denied_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
// 		$("#modal_deal_denied_project").text(global.current_deal_info.repository_name.split('/')[1])
// 		$("#modal_deal_denied_status").text(global.current_deal_info.status);

// 		$("#modal_deal_denied_id").val(global.current_deal_info.deal_id);

// 		$("#modal_deal_denied_purpose").val(global.current_deal_info.purpose)
// 		$("#modal_deal_denied_explanation").val(global.current_deal_info.explanation)


// 		var expiration_date=new Date(global.current_deal_info.expiration_date);
// 		$("#modal_deal_denied_expiration_date").val(expiration_date.toISOString().slice(0,10))

// 		$("#modal_deal_denied_price").val(global.current_deal_info.price)

// 		$("#modal_deal_denied_seller_comment").val(global.current_deal_info.seller_comment)
// 	});



// 	$("#modal_deal_denied").on('hide.bs.modal', function(e){
// 		$("#seller_comment_wrapper").css("display","none");
// 	});





// 	$("#modal_deal_denied_reoffer_btn").click(function(e){
// 		$("#modal_deal_denied_status").val('NEGOTIATING');
// 		$("#modal_deal_denied_form").attr('action', '/ajax/deal/'+global.current_deal_info.deal_id+'/update');
// 		document.modal_deal_denied_form.submit();

// 	});



// 	$("#modal_deal_denied_cancel_btn").click(function(e){
// 		$("#modal_deal_denied_status").val('CANCELLED');
// 		$("#modal_deal_denied_form").attr('action', '/ajax/deal/'+global.current_deal_info.deal_id+'/update');
// 		document.modal_deal_denied_form.submit();
// 	});




// }



// function modal_deal_view_offer_handle(){
// 	$("#modal_deal_view_offer").on('show.bs.modal', function(e){
// 		$("#modal_deal_view_offer_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
// 		$("#modal_deal_view_offer_project").text(global.current_deal_info.repository_name.split('/')[1])
// 		$("#modal_deal_view_offer_status").text(global.current_deal_info.status);

// 		$("#modal_deal_view_offer_id").val(global.current_deal_info.deal_id);

// 		$("#modal_deal_view_offer_purpose").val(global.current_deal_info.purpose)
// 		$("#modal_deal_view_offer_explanation").val(global.current_deal_info.explanation)


// 		var expiration_date=new Date(global.current_deal_info.expiration_date);
// 		$("#modal_deal_view_offer_expiration_date").val(expiration_date.toISOString().slice(0,10))

// 		$("#modal_deal_view_offer_price").val(global.current_deal_info.price)

// 	});



// 	$("#modal_deal_view_offer").on('hide.bs.modal', function(e){
// 		$("#seller_comment_wrapper").css("display","none");
// 	});
		
// }


// function modal_deal_view_offered_handle(){


// 	$("#modal_deal_view_offered").on('show.bs.modal', function(e){
// 		$("#modal_deal_view_offered_maintainer").text(global.current_deal_info.repository_name.split('/')[0])
// 		$("#modal_deal_view_offered_project").text(global.current_deal_info.repository_name.split('/')[1])
// 		$("#modal_deal_view_offered_status").text(global.current_deal_info.status);

// 		$("#modal_deal_view_offered_id").val(global.current_deal_info.deal_id);

// 		$("#modal_deal_view_offered_purpose").val(global.current_deal_info.purpose)
// 		$("#modal_deal_view_offered_explanation").val(global.current_deal_info.explanation)


// 		var expiration_date=new Date(global.current_deal_info.expiration_date);
// 		$("#modal_deal_view_offered_expiration_date").val(expiration_date.toISOString().slice(0,10))

// 		$("#modal_deal_view_offered_price").val(global.current_deal_info.price)

// 		$("#modal_deal_view_offered_seller_comment").val(global.current_deal_info.seller_comment)
// 	});



// 	$("#modal_deal_view_offered").on('hide.bs.modal', function(e){
// 		$("#seller_comment_wrapper").css("display","none");
// 	});





// 	//modal deal_offered_view 
// 	$("#modal_deal_view_offered_accept_btn").click(function(e){

// 		$("#modal_deal_action_status").val('accept');	

// 		$("#modal_deal_view_offered_confirm_btn").text("Confirm accepting")
// 		$("#seller_comment_wrapper").css("display","");
// 	});


// 	$("#modal_deal_view_offered_deny_btn").click(function(e){

// 		$("#modal_deal_action_status").val('deny');

// 		$("#modal_deal_view_offered_confirm_btn").text("Confirm dening")

// 		$("#seller_comment_wrapper").css("display","");

// 	});



// 	$("#modal_deal_view_offered_confirm_btn").click(function(e){
			
// 		console.log('Confirm')

// 		var action_path='/ajax/deal/'+$("#modal_deal_view_offered_id").val()+'/'+$("#modal_deal_action_status").val();
// 		$("#modal_deal_view_offered_form").attr('action', action_path);
// 		document.modal_deal_view_offered_form.submit();
// 	});


	
// }

















// // function use!!!!!!!!!!!!
// listup_progress_card();

// modal_deal_accepted_handle();
// modal_deal_denied_handle();
// modal_deal_view_offer_handle();
// modal_deal_view_offered_handle();




// //progress deal sort
// $("#groupby_deal_all").click(function(e){
// 	$(".deal_progress_negotiating").css('display','');
// 	$(".deal_progress_accepted").css('display','');
// 	$(".deal_progress_denied").css('display','');
// 	$(".deal_progress_offered").css('display','');
// });
// $("#groupby_deal_offered").click(function(e){
// 	$(".deal_progress_negotiating").css('display','none');
// 	$(".deal_progress_accepted").css('display','none');
// 	$(".deal_progress_denied").css('display','none');
// 	$(".deal_progress_offered").css('display','');
// })
// $("#groupby_deal_negotiating").click(function(e){
// 	$(".deal_progress_negotiating").css('display','');
// 	$(".deal_progress_accepted").css('display','none');
// 	$(".deal_progress_denied").css('display','none');
// 	$(".deal_progress_offered").css('display','none');
// });

// $("#groupby_deal_accepted").click(function(e){
// 	$(".deal_progress_negotiating").css('display','none');
// 	$(".deal_progress_accepted").css('display','');
// 	$(".deal_progress_denied").css('display','none');
// 	$(".deal_progress_offered").css('display','none');
// });


// $("#groupby_deal_denied").click(function(e){
// 	$(".deal_progress_negotiating").css('display','none');
// 	$(".deal_progress_accepted").css('display','none');
// 	$(".deal_progress_denied").css('display','');
// 	$(".deal_progress_offered").css('display','none');

// });



