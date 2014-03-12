
var https = require("https");

var header = {};
//important!!!
header["Content-Type"]="application/json";
header["X-PAYPAL-REQUEST-DATA-FORMAT"]="JSON";
header["X-PAYPAL-RESPONSE-DATA-FORMAT"]="JSON";



header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9-facilitator_api1.naver.com";
header["X-PAYPAL-SECURITY-PASSWORD"]="1394107169";
header["X-PAYPAL-SECURITY-SIGNATURE"]="AFcWxV21C7fd0v3bYYYRCpSSRl31ALoTmHEkRpADCodVQsyHThTSMRly";
header["X-PAYPAL-APPLICATION-ID"]="APP-80W284485P519543T";


var https_option={
  hostname : 'svcs.sandbox.paypal.com'
  ,path : '/AdaptivePayments/Pay'
  , method :  'POST'
  //, port : 443
  , headers : header
};






var request_pay = function(pay_info, callback){
  var pay_req_body=JSON.stringify(pay_info);
  var pay_api_call_res="";
  var req=https.request(https_option, function(res){

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
  "returnUrl":"http://www.example.com/success.html",
  "cancelUrl":"http://www.example.com/failure.html",
  "requestEnvelope":{
    "errorLanguage":"en_US",
    "detailLevel":"ReturnAll"
  }
}





request_pay(pay_data, function(res){
  console.log(res);
  var payKey= res.payKey;
  var real_pay_url="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+payKey
})
*/