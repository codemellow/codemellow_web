var https = require("https");

var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';


var basic_parallel_api_header={};
var parallel_api_https_option={};
var basic_parallel_json={};

////////////////////////////////////////////////////////////////////
///parallel pay 
////////////////////////////////////////////////////////////////////
//important!!!
basic_parallel_api_header["Content-Type"]="application/json";
basic_parallel_api_header["X-PAYPAL-REQUEST-DATA-FORMAT"]="JSON";
basic_parallel_api_header["X-PAYPAL-RESPONSE-DATA-FORMAT"]="JSON";

//live
basic_parallel_api_header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9_api1.naver.com";
basic_parallel_api_header["X-PAYPAL-SECURITY-PASSWORD"]="SGL26E6TKK8F97ES";
basic_parallel_api_header["X-PAYPAL-SECURITY-SIGNATURE"]="ArCGQI3dfrSBfFjsoqz9MKA8JWSBA50aUKFc9r1iHpb9NAQrLs8y3vj9";
basic_parallel_api_header["X-PAYPAL-APPLICATION-ID"]="APP-5M020344MN7529537";


//live
parallel_api_https_option={
  hostname : 'svcs.paypal.com'
  ,path : '/AdaptivePayments/Pay'
  , method :  'POST'
  , headers : basic_parallel_api_header
};





// //sandbox
// basic_parallel_api_header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9-facilitator_api1.naver.com";
// basic_parallel_api_header["X-PAYPAL-SECURITY-PASSWORD"]="1394107169";
// basic_parallel_api_header["X-PAYPAL-SECURITY-SIGNATURE"]="AFcWxV21C7fd0v3bYYYRCpSSRl31ALoTmHEkRpADCodVQsyHThTSMRly";
// basic_parallel_api_header["X-PAYPAL-APPLICATION-ID"]="APP-80W284485P519543T";

// //sandbox
//  parallel_api_https_option={
//   hostname : 'svcs.sandbox.paypal.com'
//   ,path : '/AdaptivePayments/Pay'
//   , method :  'POST'
//   , headers : basic_parallel_api_header
// };










basic_parallel_json={
  "actionType":"PAY",
  "currencyCode":"USD",
  "receiverList":{
    // "receiver":[
    //   {
    //     "amount":"1.00",
    //     "email":"widian@naver.com"
    //   }
    // ]
  },

  "reverseAllParallelPaymentsOnError" : true,

  //"trackingId" : "tracking_baby",

  "ipnNotificationUrl":"http://115.145.211.130/ipn",
  "returnUrl":"http://115.145.211.130/orders_list",
  "cancelUrl":"http://www.example.com/failure.html",
  "requestEnvelope":{
    "errorLanguage":"en_US",
    "detailLevel":"ReturnAll"
  }
}



function parallel_pay(){
  this.parallel_api_https_option=parallel_api_https_option;
  this.basic_parallel_json=basic_parallel_json;

  this.init();
}

parallel_pay.prototype.init= function(filepath){

}


parallel_pay.prototype.from_nvp_to_json = function(nvp_str){
  var nvp_arr=nvp_str.split("&");
  var data={};
  for(var i=0;i<nvp_arr.length;i++){
    data[ decodeURIComponent(nvp_arr[i].split("=")[0]) ]=decodeURIComponent(nvp_arr[i].split("=")[1])
  }
  return data;  
}









parallel_pay.prototype.call_parallel_pay_api= function(pay_info, callback){
  var pay_req_body=JSON.stringify(pay_info);
  var pay_api_call_res="";
  var req=https.request(parallel_api_https_option, function(res){

      res.on('data', function(d) {
        //process.stdout.write(d);
        pay_api_call_res+=d;
      });
      res.on('end', function(d){
        callback(JSON.parse(pay_api_call_res) );
      })
      
  });

  req.write(pay_req_body)
  req.end();



  req.on('error', function(e){
    console.log('call_parallel_pay_api err');
    console.error(e);
    callback(false);
    
  });

}





module.exports = parallel_pay;