var https = require("https");

var mysql_handler = require('../mysql_handler/mysql_handler');
var notice = require('../notification');

var parallel_pay = new ( require('./parallel_pay')   )() ;

var settings = require('../../settings'); //Simple Setting Infos


var sandbox=false;
var SANDBOX_URL = 'www.sandbox.paypal.com';
var REGULAR_URL = 'www.paypal.com';




var our_domain=settings.data.webserver_origin;

console.log('our domain : ', our_domain)
function init(filepath){
  //my api credential  setting
  var basic_parallel_api_header = {};
  //important!!!
  basic_parallel_api_header["Content-Type"]="application/json";
  basic_parallel_api_header["X-PAYPAL-REQUEST-DATA-FORMAT"]="JSON";
  basic_parallel_api_header["X-PAYPAL-RESPONSE-DATA-FORMAT"]="JSON";



  basic_parallel_api_header["X-PAYPAL-SECURITY-USERID"]="tlaehdwls9_api1.naver.com";
  basic_parallel_api_header["X-PAYPAL-SECURITY-PASSWORD"]="SGL26E6TKK8F97ES";
  basic_parallel_api_header["X-PAYPAL-SECURITY-SIGNATURE"]="ArCGQI3dfrSBfFjsoqz9MKA8JWSBA50aUKFc9r1iHpb9NAQrLs8y3vj9";
  basic_parallel_api_header["X-PAYPAL-APPLICATION-ID"]="APP-5M020344MN7529537";


  var parallel_api_https_option={
    hostname : 'svcs.paypal.com'
    ,path : '/AdaptivePayments/Pay'
    , method :  'POST'
    , headers : basic_parallel_api_header
  };


  var basic_parallel_json={
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

    "ipnNotificationUrl":"http://115.145.178.162/ipn",
    "returnUrl":"http://115.145.178.162/orders_list",
    "cancelUrl":"http://www.example.com/failure.html",
    "requestEnvelope":{
      "errorLanguage":"en_US",
      "detailLevel":"ReturnAll"
    }
  }


}


function from_nvp_to_json(nvp_str){
  var nvp_arr=nvp_str.split("&");
  var data={};
  for(var i=0;i<nvp_arr.length;i++){
    data[ decodeURIComponent(nvp_arr[i].split("=")[0]) ]=decodeURIComponent(nvp_arr[i].split("=")[1])
  }
  return data;  
}








































//when buyer click pay button, dynamically create pay_url
exports.pay_req = function(req, res){

  //1. get sellers' info ex) [{amount,paypal id}, {}, {} ]
  //2. activate paypal url 
  //3. update cm_payment several rows 

  //(4. end & wait until buyer pay)
  console.log('-------------------pay req init---------')


  var params=req.body;
  var buyer_id=params.buyer_id;
  var buyer_name=params.buyer_name
  var deal_id_arr=params.deal_id_arr;
  var sandbox=params.sandbox || 1;


  

  mysql_handler.get_pay_bill_by_deal_id(params, function(receiver_list){
    console.log(receiver_list);
    if(!receiver_list){
      res.json(false);
      return false;
    }



    var pay_param={};
    pay_param.buyer_name=buyer_name;
    pay_param.receiver_list=receiver_list;
    pay_param.sandbox=sandbox;


    paypal_url_req(pay_param, function(paypal_url_result){
      if(!paypal_url_result.code){
        res.json(paypal_url_result);
        return false;
      }

      var pay_key=paypal_url_result.pay_key;
      var pay_url=paypal_url_result.pay_url;


      var payment_insert_req={};
      payment_insert_req.receiver_list=receiver_list;
      payment_insert_req.pay_key=pay_key;
      payment_insert_req.pay_url=pay_url;
      mysql_handler.payment_insert_deal_id_arr(payment_insert_req, function(d){});


      res.json(paypal_url_result);
    })

  });

    



}


// var donate_req_data={};
// donate_req_data.donor_id=1;
// donate_req_data.donate_list=[{repository_id:10,donate_amount:1}, {repository_id:12,donate_amount:12},{repository_id:13,donate_amount:3}];


//when donor click donate button, dynamically create pay_url
exports.donate_req = function(req, res){
  //sellers' info ex) [{amount,paypal id}, {}, {} ]
  //2. activate paypal url 
  //3. update cm_payment several rows 

  //(4. end & wait until buyer pay)
  console.log('-------------------donate req init---------')


  var params=req.body;
  var donor_id=params.donor_id;
  var buyer_name=params.donor_name;
  var sandbox=params.sandbox || 1;


  var donate_list=params.donate_list;

  params.donee_repo_arr=[];
  for(var i=0;i<donate_list.length;i++){
    (params.donee_repo_arr).push(donate_list[i].repository_id);
  }


  

  mysql_handler.get_donate_bill_by_donee_repo_arr(params, function(receiver_list){
    console.log(receiver_list);
    if(!receiver_list){
      res.json(false);
      return false;
    }


    //receiver list handle!!!
    for(var i=0;i<receiver_list.length;i++){

      //find price
      for(var k=0;k<donate_list.length;k++){
        if( receiver_list[i].repository_id == donate_list[k].repository_id ){
          receiver_list[i].amount=donate_list[k].amount;
          break;
        }
      }


    }





    var pay_param={};
    pay_param.buyer_name=buyer_name;
    pay_param.receiver_list=receiver_list;
    pay_param.sandbox=sandbox;
    pay_param.is_donate=true;

    paypal_url_req(pay_param, function(paypal_url_result){
      if(!paypal_url_result.code){
        res.json(paypal_url_result);
        return false;
      }

      var pay_key=paypal_url_result.pay_key;
      var pay_url=paypal_url_result.pay_url;

      var donate_insert_req_template={};
      donate_insert_req_template.donor_id=donor_id;
      donate_insert_req_template.donate_pay_key=pay_key;

      for(var i=0;i<donate_list.length;i++){
        var donate_insert_req=donate_insert_req_template;
        donate_insert_req.repository_id=donate_list[i].repository_id;
        donate_insert_req.donate_amount=donate_list[i].amount;

        mysql_handler.donate_insert(donate_insert_req, function(data){});
      }


      res.json(paypal_url_result);
    })

  });

}




exports.new_pay_req = function(req, res){

}


//get paypal's pay_url
function paypal_url_req(params,callback){


  //1. pay_info making
  var commission=0;

  var receiver_list=params.receiver_list;
  for(var i=0;i<receiver_list.length;i++){
    commission= ( parseFloat(commission)+parseFloat(receiver_list[i].amount*5/100)  ).toFixed(2);
    receiver_list[i].amount = (receiver_list[i].amount*95/100).toFixed(2);
  }

  var codemellow_paypal_account={};
  codemellow_paypal_account.email='pay@codemellow.com';
  codemellow_paypal_account.amount=commission;

  receiver_list.push(codemellow_paypal_account);



  //1-1. receiver compress if same email exists

  //1-1. unique email!!! paypal receiver
  var unique_receiver_list=[];
  for(var i=0;i<receiver_list.length;i++){


    var contained=false;
    for(var k=0;k<unique_receiver_list.length;k++){
      if(unique_receiver_list[k].email==receiver_list[i].email){
        unique_receiver_list[k].amount = ( parseFloat(receiver_list[i].amount)+parseFloat(unique_receiver_list[k].amount)  ).toFixed(2);
        contained=true;
        break;
      }
    }

    if(!contained){
      unique_receiver_list.push(receiver_list[i]);
    }


  }






   

  //2. paypal api data set
  var pay_data=parallel_pay.basic_parallel_json;
  pay_data.ipnNotificationUrl=our_domain+'ipn';
  pay_data.returnUrl=our_domain+params.buyer_name+'/deal'
  pay_data.cancelUrl=our_domain+params.buyer_name+'/deal'
  pay_data.receiverList.receiver=unique_receiver_list;



  //2-1. if donate????
  if(params.is_donate){
    pay_data.trackingId='donate_'+params.buyer_name+"_"+(new Date().toISOString().replace(/:/g,'_'));
    pay_data.returnUrl=our_domain+'market'
    pay_data.cancelUrl=our_domain+'market'

  }

  console.log('unique_receiver_list')
  console.log(unique_receiver_list)
  

  //3. paypal api call
  parallel_pay.call_parallel_pay_api(pay_data, function(pay_api_res){
    console.log('call_parallel_pay_api')
    console.log(pay_api_res )

    if(pay_api_res && pay_api_res.responseEnvelope.ack ==='Success'){
      var payKey= pay_api_res.payKey;
      
      var pay_url=(params.sandbox)
                  ?"https://www.sandbox.paypal.com/cgi-bin/webscr"
                  :"https://www.paypal.com/cgi-bin/webscr";

      

      pay_url+="?cmd=_ap-payment&paykey="+payKey

      var timestamp=pay_api_res.responseEnvelope.timestamp;

      pay_data.pay_key=payKey;
      pay_data.pay_api_res=pay_api_res;
      pay_data.pay_url=pay_url;
      pay_data.timestamp=timestamp;
      

      pay_data.code=true
    }else{
      pay_data.code=false;
    }

    
    if(typeof callback =='function'){
      callback(pay_data)
    }
    
  });


}

























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////after pay////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






var example_paypal_ipn={ 'transaction[0].is_primary_receiver': 'false',
  'transaction[0].id_for_sender_txn': '83S63939SC955360Y',
  log_default_shipping_address_in_transaction: 'false',
  'transaction[0].receiver': 'tlaehdwls9@naver.com',
  action_type: 'PAY',
  ipn_notification_url: 'http://115.145.211.113/ipn',
  'transaction[1].paymentType': 'SERVICE',
  'transaction[0].amount': 'USD+20.90',
  charset: 'windows-1252',
  transaction_type: 'Adaptive+Payment+PAY',
  'transaction[1].id_for_sender_txn': '7N557852HK6331113',
  'transaction[1].is_primary_receiver': 'false',
  notify_version: 'UNVERSIONED',
  cancel_url: 'http://115.145.211.113/pay/cancel/33_simdj_pintos2_pcs_80071',
  'transaction[1].status_for_sender_txn': 'Completed',
  'transaction[1].receiver': 'pay@codemellow.com',
  verify_sign: 'AIq8G0xr8DDreFrdKBVLeVwFxy9xAjDW9E.65-p1aPGgRVMXH2VeeCDv',
  sender_email: 'user2@naver.com',
  fees_payer: 'EACHRECEIVER',
  'transaction[0].status_for_sender_txn': 'Pending',
  return_url: 'http://115.145.211.113/pay/complete/33_simdj_pintos2_pcs_80071',
  'transaction[0].paymentType': 'SERVICE',
  'transaction[1].amount': 'USD+1.10',
  reverse_all_parallel_payments_on_error: 'true',
  tracking_id: '33_simdj_pintos2_pcs_80071',
  'transaction[1].pending_reason': 'NONE',
  pay_key: 'AP-0VV56459FN617280A',
  'transaction[1].id': '99T02002DU2067509',
  'transaction[0].pending_reason': 'UNILATERAL',
  status: 'COMPLETED',
  'transaction[1].status': 'Completed',
  test_ipn: '1',
  payment_request_date: 'Wed+Jul+30+07:40:52+PDT+2014' }






//step 0. listen ipn from paypal
exports.ipn = function(req, res){
  res.end();
  verify_paypal_ipn(req, process_pay_result);
}

//step 1. ask to paypal wheter this ipn is right
function verify_paypal_ipn(req, callback){
  //important info!!!!!!!!!!!!!!!!!1
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
      if(callback){
        if(is_verified=='VERIFIED'){
          callback(ipn_raw_data);
        }else{
          callback(false);
        }
      }else{
        callback(false);
        console.error('callback after verify is needed!!!!!!!!!!!')
      }

    
    })
  });
  verify_req.write(verify_data)
  verify_req.end();
}












//step 2. route ipn
function process_pay_result(verify_data){
  if(!verify_data){
      console.log('invalid ipn');
    }else{
      var verify_data_obj=from_nvp_to_json(verify_data);
      
      console.log('----------VALID IPN result--------');


      if(verify_data_obj.transaction_type==='Adaptive+Payment+PAY'){
        //parallel
        var status=verify_data_obj.status;
        if(status==='COMPLETED'){
          console.log('[+] parallel compelete!!!!!')
          console.log('[+] payment complete buyer can use source code')

          if(verify_data_obj.tracking_id && verify_data_obj.tracking_id.split("_")[0]=='donate'){
            complete_parallel_donate(verify_data_obj);
          }else{
            complete_parallel_buy(verify_data_obj);

          }

          //good bye masspay
          //masspay_start(verify_data_obj, function(){});
        }else{
          console.log('[-] parallel not completed....');
        }


      }else if(verify_data_obj.txn_type==='masspay'){
        //masspay
        var status=verify_data_obj.payment_status;
        if(status==='COMPLETED'){
          console.log('[+] masspay compeleted')
        }else if(status==='Processed'){
          console.log('[+] masspay Processed, Paypal gogo?')
        }else{
          console.log('[-] masspay something wrong?')
        }
        ;

      }else{
        console.log('[-] no parallel, no masspay, then what?');
        
      }

      //save !!!!
      console.log('----------verify_data_obj-------------')
      console.log(verify_data_obj);
      
    }
}

//step 2-1. buying license case
function complete_parallel_buy(params){
  //0. get trackingId
  //1. get deal_id;      select * from cm_payment where trackingID=?

  // 2. set (pay_id)'s status 'complete'  IN cm_pay
  // 3. insert license                   IN cm_license

  // 4. set (deal_id)'s status 'complete'  IN cm_deal
  // 5. notify to (pay_id)'s seller_id

  //step 0
  var pay_info_req={};
  pay_info_req.tracking_id=params.tracking_id;
  pay_info_req.pay_key=params.pay_key;

  //step 1
  mysql_handler.get_pay_info_by_pay_key(pay_info_req,function(pay_info_arr){
    if(!pay_info_arr){
      console.log('no deal info by'+pay_info_req.pay_key);
      return false;
    }

    for(var i=0;i<pay_info_arr.length;i++){
      var tmp_pay_info=pay_info_arr[i];
      console.log(tmp_pay_info)
        //step 2
      var payment_update_req={};
      payment_update_req.pay_id=tmp_pay_info.pay_id;
      payment_update_req.status='COMPLETED';
      
      mysql_handler.payment_update(payment_update_req, function(data){
        console.log('payment_update_req',payment_update_req)  
        console.log(data)
      });

      


      //step 3
      var license_insert_req={};
      license_insert_req.deal_id=tmp_pay_info.deal_id;
      
      mysql_handler.license_insert_by_deal_info(license_insert_req, function(data){
        console.log('license_insert_by_deal_info',license_insert_req);
        console.log(data);
      });


      //step 4
      var deal_update_req={};
      deal_update_req.status='COMPLETED';
      deal_update_req.deal_id=tmp_pay_info.deal_id;
      
      mysql_handler.deal_update(deal_update_req,function(data){
        console.log('deal_update_req',deal_update_req)
        console.log(data)
      })

      //step 5
      notice.notice_deal_complete(tmp_pay_info.deal_id);


    }

    







  });
}









//step 2-2. donate case
function complete_parallel_donate(params){
  //0. get trackingID
  //1. set donate's status;   update cm_donate SET donate_status='COMPLETED' WHERE donate_pay_key=?
  //2. notice

  //step 0
  var donate_update_req={};
  //donate_update_req.tracking_id=params.tracking_id;
  donate_update_req.donate_pay_key=params.pay_key;
  donate_update_req.donate_status='COMPLETED';




  // var donate_update_req={};
  // donate_update_req.donate_pay_key='1dsadfsdfsdf';
  // donate_update_req.donate_status='COMPLETED';
  // $.post('/donate/update', donate_update_req, function(d){console.log(d)})

  //step 1
  mysql_handler.donate_update(donate_update_req, function(donate_update_res){
    console.log(donate_update_res);
  });


}