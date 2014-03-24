
var https = require("https");




////////////////////////////////////////////////////////////////////////
//masspay nvp version
////////////////////////////////////////////////////////////////////////

//https://api-3t.sandbox.paypal.com/nvp 
var masspay_api_https_option={
  hostname : 'api-3t.sandbox.paypal.com'
  ,path : '/nvp'
  ,method :  'POST'
};

var basic_nvp="";
basic_nvp+="USER=rlagoaptl-facilitator_api1.nate.com"
basic_nvp+="&PWD=1390784578"
basic_nvp+="&SIGNATURE=AiPC9BjkCyDFQXbSkoZcgqH3hpacAyX0N0lmWDN56uNsgLi-DGIm6-Hj"
basic_nvp+="&VERSION=90"
basic_nvp+="&METHOD=MassPay"
basic_nvp+="&RECEIVERTYPE=EmailAddress"
basic_nvp+="&CURRENCYCODE=USD"
//basic_nvp+"&L_EMAIL0=guest1@nate.com&L_AMT0=12.0"



exports.call_masspay_api = function(pay_info_arr, callback){
    var nvp=basic_nvp;
    
    for(var i=0;i<pay_info_arr.length;i++){
        nvp+="&L_EMAIL"+i+"="+pay_info_arr[i].email;
        nvp+=  "&L_AMT"+i+"="+pay_info_arr[i].amt;
    }

    var pay_api_call_res="";

    var https_option=masspay_api_https_option;
    https_option.headers={"Content-length" : nvp.length}
    
    var req=https.request(https_option, function(res){
        res.on('data', function(d) {
            pay_api_call_res+=d;
        });
        res.on('end', function(d){
            callback( pay_api_call_res );
        })
      
    });
    console.log(nvp);
    req.write(nvp)
    req.end();


    req.on('error', function(e){
        console.error(e);
    });

}

//example
/*

var pay_info_input=[];
pay_info_input[0]={
    email : 'guest1@nate.com'
    ,amt : '1.2'
}
pay_info_input[1]={
    email : 'guest2@nate.com'
    ,amt : '2.1'
}

call_masspay_api(pay_info_input, function(data){
    console.log('res');
    console.log(data);
});



*/














////////////////////////////////////////////////////////////////////
///parallel pay 
////////////////////////////////////////////////////////////////////
var parallel_api_header = {};
//important!!!
parallel_api_header["Content-Type"]="application/json";
parallel_api_header["X-PAYPAL-REQUEST-DATA-FORMAT"]="JSON";
parallel_api_header["X-PAYPAL-RESPONSE-DATA-FORMAT"]="JSON";



parallel_api_header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9-facilitator_api1.naver.com";
parallel_api_header["X-PAYPAL-SECURITY-PASSWORD"]="1394107169";
parallel_api_header["X-PAYPAL-SECURITY-SIGNATURE"]="AFcWxV21C7fd0v3bYYYRCpSSRl31ALoTmHEkRpADCodVQsyHThTSMRly";
parallel_api_header["X-PAYPAL-APPLICATION-ID"]="APP-80W284485P519543T";


var parallel_api_https_option={
  hostname : 'svcs.sandbox.paypal.com'
  ,path : '/AdaptivePayments/Pay'
  , method :  'POST'
  , headers : parallel_api_header
};




var call_parallel_pay_api = function(pay_info, callback){
  var pay_req_body=JSON.stringify(pay_info);
  var pay_api_call_res="";
  var req=https.request(parallel_api_https_option, function(res){

      res.on('data', function(d) {
        process.stdout.write(d);
        pay_api_call_res+=d;
      });
      res.on('end', function(d){
        callback(JSON.parse(pay_api_call_res) );
      })
      
  });

  req.write(pay_req_body)
  req.end();



  req.on('error', function(e){
    console.error(e);
  });

}


/*

//example about how to use
var pay_data={
  "actionType":"PAY",
  "currencyCode":"USD",
  "receiverList":{
    "receiver":[
      {
        "amount":"10.00",
        "email":"user1@naver.com"
      }
    ]
  },
  "notify_url":"http://115.145.178.162/ipn",
  "returnUrl":"http://115.145.178.162/",
  "cancelUrl":"http://www.example.com/failure.html",
  "requestEnvelope":{
    "errorLanguage":"en_US",
    "detailLevel":"ReturnAll"
  }
}





call_parallel_pay_api(pay_data, function(res){
  console.log(res);
  var payKey= res.payKey;
  var real_pay_url="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+payKey
  console.log(real_pay_url)
})
*/





exports.paypal_ipn = function(req, res){
   res.end();
    

  verify_paypal_ipn(req, function(is_verified){
    console.log('in callback')
    console.log(is_verified)
  });
}



/*
{ payment_request_date: 'Mon Mar 24 03:38:59 PDT 2014',
  return_url: 'http://www.example.com/success.html',
  fees_payer: 'EACHRECEIVER',
  ipn_notification_url: 'http://115.145.178.162/ipn',
  sender_email: 'rlagoaptl-facilitator@nate.com',
  verify_sign: 'AQU0e5vuZCvSg-XJploSa.sGUDlpACKlTCQU-ABDDYYHMp3VgFFj-WuN',
  test_ipn: '1',
  transaction: 
   { '0].id_for_sender_tx': '1HA87606GJ1742235',
     '0].receive': 'guest1@nate.com',
     '0].is_primary_receive': 'false',
     '0].i': '2GY91770XW8940032',
     '0].statu': 'Completed',
     '0].paymentTyp': 'SERVICE',
     '0].status_for_sender_tx': 'Completed',
     '0].pending_reaso': 'NONE',
     '0].amoun': 'USD 1.00' },
  cancel_url: 'http://www.example.com/failure.html',
  pay_key: 'AP-36425499Y4278472D',
  action_type: 'PAY',
  transaction_type: 'Adaptive Payment PAY',
  status: 'COMPLETED',
  log_default_shipping_address_in_transaction: 'false',
  charset: 'windows-1252',
  notify_version: 'UNVERSIONED',
  reverse_all_parallel_payments_on_error: 'false' }

*/
var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';
var verify_paypal_ipn = function(req, callback){
  
  var ipn_raw_data=req.rawBody;

  var verify_data='cmd=_notify-validate&'
  verify_data+=ipn_raw_data;
  


  var verify_paypal_ipn_https_option={
     host: (req.body.test_ipn) ? SANDBOX_URL : REGULAR_URL,
    method: 'POST',
    path: '/cgi-bin/webscr',
    headers: {'Content-Length': verify_data.length}
  };



  var verify_req= https.request(verify_paypal_ipn_https_option, function(verify_res){
    var is_verified='';
    verify_res.on('data', function(d){
      is_verified+=d
    });
    verify_res.on('end', function(d){
      
      console.log('is_verified---------------------------------------------')
      console.log(is_verified)
      if(callback)callback(is_verified);

    
    })
  });
  verify_req.write(verify_data)
  verify_req.end();
  console.log(req.rawBody)
  req=null;

  



}











var pay_data={
  "actionType":"PAY",
  "currencyCode":"USD",
  "receiverList":{
    "receiver":[
      {
        "amount":"1.00",
        "email":"widian@naver.com"
      }
    ]
  },

  "reverseAllParallelPaymentsOnError" : true,

  "trackingId" : "tracking_baby",

  "ipnNotificationUrl":"http://115.145.178.162/ipn",
  "returnUrl":"http://www.example.com/success.html",
  "cancelUrl":"http://www.example.com/failure.html",
  "requestEnvelope":{
    "errorLanguage":"en_US",
    "detailLevel":"ReturnAll"
  }
}
exports.pay_start=function(req, res){

  call_parallel_pay_api(pay_data, function(pay_api_res){
    console.log(pay_api_res);
    var payKey= pay_api_res.payKey;
    var real_pay_url="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+payKey
    console.log(real_pay_url);
    res.render('index', { title: real_pay_url });
  })
}