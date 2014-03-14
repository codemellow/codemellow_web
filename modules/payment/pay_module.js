
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


