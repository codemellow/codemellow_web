
// var https = require("https");


// var sandbox=false;
// var SANDBOX_URL = 'www.sandbox.paypal.com';
// var REGULAR_URL = 'www.paypal.com';


// var basic_masspay_api_https_option;
// var basic_masspay_nvp;

// var basic_parallel_api_header;
// var basic_parallel_json;

// function init(filepath){

// }


// function from_nvp_to_json(nvp_str){
//   var nvp_arr=nvp_str.split("&");
//   var data={};
//   for(var i=0;i<nvp_arr.length;i++){
//     data[ decodeURIComponent(nvp_arr[i].split("=")[0]) ]=decodeURIComponent(nvp_arr[i].split("=")[1])
//   }
//   return data;  
// }



// ////////////////////////////////////////////////////////////////////////
// //masspay nvp version
// ////////////////////////////////////////////////////////////////////////

// //https://api-3t.sandbox.paypal.com/nvp 
// var basic_masspay_api_https_option={
//   hostname : 'api-3t.sandbox.paypal.com'
//   ,path : '/nvp'
//   ,method :  'POST'
// };

// var basic_masspay_nvp="";
// basic_masspay_nvp+="USER=rlagoaptl-facilitator_api1.nate.com"
// basic_masspay_nvp+="&PWD=1390784578"
// basic_masspay_nvp+="&SIGNATURE=AiPC9BjkCyDFQXbSkoZcgqH3hpacAyX0N0lmWDN56uNsgLi-DGIm6-Hj"
// basic_masspay_nvp+="&VERSION=90"
// basic_masspay_nvp+="&METHOD=MassPay"
// basic_masspay_nvp+="&RECEIVERTYPE=EmailAddress"
// basic_masspay_nvp+="&CURRENCYCODE=USD"
// //basic_masspay_nvp+"&L_EMAIL0=guest1@nate.com&L_AMT0=12.0"



// function call_masspay_api(pay_info_arr, callback){
//   var nvp=basic_masspay_nvp;
  
//   for(var i=0;i<pay_info_arr.length;i++){
//       nvp+="&L_EMAIL"+i+"="+pay_info_arr[i].email;
//       nvp+=  "&L_AMT"+i+"="+pay_info_arr[i].amt;
//   }

//   var pay_api_call_res="";

//   var https_option=basic_masspay_api_https_option;
//   https_option.headers={"Content-length" : nvp.length}
  
//   var req=https.request(https_option, function(res){
//       res.on('data', function(d) {
//           pay_api_call_res+=d;
//       });
//       res.on('end', function(d){
//           callback( pay_api_call_res );
//       })
    
//   });
//   console.log(nvp);
//   req.write(nvp)
//   req.end();


//   req.on('error', function(e){
//       console.error(e);
//   });

// }

// //example



// /*
// var pay_info_input=[];
// pay_info_input[0]={
//     email : 'guest1@nate.com'
//     ,amt : '1.2'
// }
// pay_info_input[1]={
//     email : 'simdj58@gmail.com'
//     ,amt : '2.1'
// }

// call_masspay_api(pay_info_input, function(data){
//     console.log('res');
//     console.log(data);
// });


// */





// function masspay_start(ipn_data, callback){
//   //db query by ipn data pay_key, trackingID





//   var pay_info_input=[];
//   pay_info_input[0]={
//     email : 'widianpear@gmail.com'
//     ,amt : '1.2'
//   }
//   pay_info_input[1]={
//     email : 'simdj58@gmail.com'
//     ,amt : '2.1'
//   }

//   call_masspay_api(pay_info_input, function(data){
//     console.log('masspay result');
//     console.log(data);
//   });
// }









// ////////////////////////////////////////////////////////////////////
// ///parallel pay 
// ////////////////////////////////////////////////////////////////////
// var basic_parallel_api_header = {};
// //important!!!
// basic_parallel_api_header["Content-Type"]="application/json";
// basic_parallel_api_header["X-PAYPAL-REQUEST-DATA-FORMAT"]="JSON";
// basic_parallel_api_header["X-PAYPAL-RESPONSE-DATA-FORMAT"]="JSON";



// basic_parallel_api_header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9-facilitator_api1.naver.com";
// basic_parallel_api_header["X-PAYPAL-SECURITY-PASSWORD"]="1394107169";
// basic_parallel_api_header["X-PAYPAL-SECURITY-SIGNATURE"]="AFcWxV21C7fd0v3bYYYRCpSSRl31ALoTmHEkRpADCodVQsyHThTSMRly";
// basic_parallel_api_header["X-PAYPAL-APPLICATION-ID"]="APP-80W284485P519543T";


// var parallel_api_https_option={
//   hostname : 'svcs.sandbox.paypal.com'
//   ,path : '/AdaptivePayments/Pay'
//   , method :  'POST'
//   , headers : basic_parallel_api_header
// };


// var basic_parallel_json={
//   "actionType":"PAY",
//   "currencyCode":"USD",
//   "receiverList":{
//     // "receiver":[
//     //   {
//     //     "amount":"1.00",
//     //     "email":"widian@naver.com"
//     //   }
//     // ]
//   },

//   "reverseAllParallelPaymentsOnError" : true,

//   //"trackingId" : "tracking_baby",

//   "ipnNotificationUrl":"http://115.145.178.162/ipn",
//   "returnUrl":"http://115.145.178.162/orders_list",
//   "cancelUrl":"http://www.example.com/failure.html",
//   "requestEnvelope":{
//     "errorLanguage":"en_US",
//     "detailLevel":"ReturnAll"
//   }
// }






// function call_parallel_pay_api(pay_info, callback){
//   var pay_req_body=JSON.stringify(pay_info);
//   var pay_api_call_res="";
//   var req=https.request(parallel_api_https_option, function(res){

//       res.on('data', function(d) {
//         process.stdout.write(d);
//         pay_api_call_res+=d;
//       });
//       res.on('end', function(d){
//         callback(JSON.parse(pay_api_call_res) );
//       })
      
//   });

//   req.write(pay_req_body)
//   req.end();



//   req.on('error', function(e){
//     callback(false);
//     console.error(e);
//   });

// }






// exports.ipn = function(req, res){
//    res.end();
    

//   verify_paypal_ipn(req, function(verify_data){
//     if(!verify_data){
//       console.log('invalid ipn');
//     }else{
//       var verify_data_obj=from_nvp_to_json(verify_data);
      
//       console.log('----------VALID IPN result--------');


//       if(verify_data_obj.transaction_type==='Adaptive+Payment+PAY'){
//         //parallel
//         var status=verify_data_obj.status;
//         if(status==='COMPLETED'){
//           console.log('[+] parallel compelete!!!!!')
//           console.log('[+] masspay start')
//           masspay_start(verify_data_obj, function(){});
//         }else{
//           console.log('[-] parallel not completed....');
          
//         }


//       }else if(verify_data_obj.txn_type==='masspay'){
//         //masspay
//         var status=verify_data_obj.payment_status;
//         if(status==='COMPLETED'){
//           console.log('[+] masspay compeleted')
//         }else if(status==='Processed'){
//           console.log('[+] masspay Processed, Paypal gogo?')
//         }else{
//           console.log('[-] masspay something wrong?')
//         }
//         ;

//       }else{
//         console.log('[-] no parallel, no masspay, then what?');
        
//       }

//       //save !!!!
//       console.log(verify_data_obj);
      
//     }
//   });
// }




// function verify_paypal_ipn(req, callback){
  

//   //important info!!!!!!!!!!!!!!!!!1
//   var ipn_raw_data=req.rawBody;
//   var verify_data='cmd=_notify-validate&'
//       verify_data+=ipn_raw_data;
  


//   var verify_paypal_ipn_https_option={
//     host: (req.body.test_ipn) ? SANDBOX_URL : REGULAR_URL,
//     method: 'POST',
//     path: '/cgi-bin/webscr',
//     headers: {'Content-Length': verify_data.length}
//   };



//   var verify_req= https.request(verify_paypal_ipn_https_option, function(verify_res){
//     var is_verified='';
//     verify_res.on('data', function(d){
//       is_verified+=d
//     });
//     verify_res.on('end', function(d){
//       if(callback){
//         if(is_verified=='VERIFIED'){
//           callback(ipn_raw_data);
//         }else{
//           callback(false);
//         }
//       }else{
//         callback(false);
//         console.error('callback after verify is needed!!!!!!!!!!!')
//       }

    
//     })
//   });
//   verify_req.write(verify_data)
//   verify_req.end();
//   //console.log(req.rawBody)
//   req=null;

  



// }

















// exports.pay_start=function(req, res){

//   //repository_id needed
//   //payer id needed
//   var buyer_id=req.body.buyer_id;
//   var repository_id=req.body.repository_id;
//   if(!buyer_id || !repository_id){
//     res.json(res_data);
//     res.end()
//     return false;
//   }


//   var req_pay_data=basic_parallel_json;
//   req_pay_data.receiverList.receiver=[];

//   //select statement from database
//   //after...
  
//   req_pay_data.receiverList.receiver.push({
//     amount: '1.00',
//     email : 'guest1@nate.com'
//   });
    
//   //optional.....
//   req_pay_data.trackingId=buyer_id+'/'+repository_id;




//   call_parallel_pay_api(req_pay_data, function(pay_api_res){
//     console.log(pay_api_res)
//     if(pay_api_res && pay_api_res.responseEnvelope.ack ==='Success'){
//       var payKey= pay_api_res.payKey;
//       var redirect_url="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+payKey
//       var timestamp=pay_api_res.responseEnvelope.timestamp;

//       //db_save


//       res_data=pay_api_res;
//       res_data.redirect_url=redirect_url;
      
//       res.json(res_data);
//     }else{
//       res.json(pay_api_res)
//     }
    
//     res.end();
//   });
 
// }
















