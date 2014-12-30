// var https = require("https");


// var SANDBOX_URL = 'www.sandbox.paypal.com';
// var REGULAR_URL = 'www.paypal.com';


// var basic_masspay_api_https_option;
// var basic_masspay_nvp;


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
//   hostname : 'api-3t.paypal.com'
//   ,path : '/nvp'
//   ,method :  'POST'
// };

// var basic_masspay_nvp="";
// basic_masspay_nvp+="USER=tlaehdwls9_api1.naver.com"
// basic_masspay_nvp+="&PWD=SGL26E6TKK8F97ES"
// basic_masspay_nvp+="&SIGNATURE=ArCGQI3dfrSBfFjsoqz9MKA8JWSBA50aUKFc9r1iHpb9NAQrLs8y3vj9"
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
//     ,amt : '0.1'
//   }
//   pay_info_input[1]={
//     email : 'felp2024@naver.com'
//     ,amt : '0.1'
//   }

//   call_masspay_api(pay_info_input, function(data){
//     console.log('-----------masspay result---------------');
//     console.log(from_nvp_to_json(data));

//   });
// }


