
/*
 * GET home page.
 */

var path = require('path');
var fs= require('fs')
var settings = require('../../settings');
var project=require('../../modules/project/project');
var mysql_handler=require('../../modules/mysql_handler/mysql_handler');
var elastic_search_handler=require('../../modules/elastic_search_handler/elastic_search_handler');
var elastic_search_autocomplete=require('../../modules/elastic_search_handler/elastic_search_autocomplete');
var payment=require("../../modules/payment/pay_module");
var market = require("../../modules/market/market");
var member = require("../../modules/member/management");
var deal   = require("../../modules/deal/deal");
var review = require("../../modules/review/review");
var user_cart = require("../../modules/user/user_cart");
var notice = require("../../modules/notification")
var license = require("../../modules/license")
var donate = require("../../modules/donate")
var user = require("../../modules/user");
var error_handler = require('../../error_handler');



//deal 
exports.license_list = function(req, res){
  license.list(req, res);
}

exports.license_cnt = function(req,res){
  license.cnt(req, res);
}


exports.deal_cnt = function(req, res){
  deal.cnt(req,res);
}
exports.deal_list = function(req, res){
  deal.list(req, res);
}

exports.deal_view = function(req, res){
  deal.read(req, res);
}

exports.deal_offer = function(req, res){
  deal.offer(req, res);
}
exports.deal_cancel = function(req, res){
  deal.cancel(req, res);
}


exports.deal_accept = function(req, res){
  deal.accept(req, res);
}


exports.deal_create = function(req, res){
  deal.create(req, res);
}

exports.deal_deny = function(req, res){
  deal.deny(req, res);
}

exports.sales_statistics= function(req, res){
  mysql_handler.sales_statistics(req.body, function(d){res.json(d)} );
}

exports.donate_req = function(req, res){
  donate.req(req,res);
}
exports.donate_insert = function(req, res){
  donate.insert(req,res);
}
exports.donate_update = function(req, res){
  donate.update(req,res);
}
exports.donate_list = function(req, res){
  donate.list(req,res);
}
exports.elastic_code_search = function(req, res){
  elastic_search_handler.code_search(req,res);
};

exports.error_404 = function(req,res){
  res.writeHead(404);
  res.end();
};

exports.post_edit_user_info = function(req, res){
  var data = req.body;
  member.edit_user_info(data, function(result){
    res.json(result)
  })
}

exports.get_project_list = function(req, res){
  if(req.session && req.session.user){
      member.member_project_list(req.session.user.id, function(data){
        res.json(data);
      })
  }
};

exports.main = function(req, res){
  if(req.session && req.session.user){
    res.render('main/main', {name: req.session.user.name});
  }else{
    res.render('main/main', {name: false});
  }
};

exports.main_beta = function(req, res){
    res.render('main/main_beta', {name: false});
};
exports.new_main = function(req, res){
    res.render('main/new_main');
};

exports.market_main_beta = function(req, res){
  var user = false;
  if(req.session && req.session.user){
    user = req.session.user.id;
  }
  mysql_handler.best_seller(undefined,user, function(data, user_like){
    req.render_info.best_seller = data;
    req.render_info.user_like = user_like;
    req.render_info.like = null;
    res.render('market/main', req.render_info);
  });
}

exports.main_duplicate_check = function(req, res){
  if(req.body)
    member.duplication_check(req.body.email, function(result){
      res.json(result);
    })
  else
    res.send("wrong");
};

exports.main_join = function(req, res){
  member.member_join(req.body, function(err, msg){
    res.json({err: err, msg: msg});
  })
};

exports.main_login = function(req, res){
  //var path = req.headers['referer'].match(/^(?:[^\/]*(?:\/(?:\/[^\/]*\/?)?)?([^?]+)(?:\??.+)?)$/);
  member.member_login(req.body, function(result, data, verified){
    if(result.result){
      if(verified){
        req.session.save();
        req.session.user = {};
        req.session.user.email = data.user_email;
        req.session.user.name = data.user_name;
        req.session.user.id = data.user_id;
      }
      result.verified = verified;
    }
    res.json(result);
    //res.json({result: "", path: "/"+path[1]});
    //res.json(result);
  })
};

exports.verification = function(req, res){
  res.render('market/verification',  req.render_info);
};

exports.find_password = function(req, res){
  member.find_password(req.body.email, function(result){
    res.json(result);
  });
};

exports.main_logout = function(req, res){
  if(req.session && req.session.user){
    delete req.session.user;
    res.redirect('/main');
  }else{
    res.redirect('/main');
  }
};

exports.notification = function(req, res){
  res.status(404).send('Not found');
}
exports.notice_create = function(req, res){
  notice.create(req,res);
}
exports.notice_list = function(req, res){
  notice.list(req,res);
}
exports.notice_read  = function (req, res){
  notice.read(req,res);
}
exports.notice_update = function (req, res){
  notice.update(req,res);
}

exports.verify_email = function(req, res){
  var verify_key = req.params.verify_key;
  var user_id = req.params.user_id;
    member.verify_email({verify_key: verify_key, user_id: user_id}, function(result){
      res.render('market/verification_completed', req.render_info);
    })
}

exports.classic_search = function(req, res){
  req.render_info.search = req.params.search;
  req.render_info.page = req.params.page;
  if(!req.render_info.page) req.render_info.page = 1;

  if(req.render_info.search && req.render_info.page){
      elastic_search_handler.sort_search_repository(req.render_info.page,req.render_info.search,"default", function(err,result){
        req.render_info.data = result;
        res.render('market/search/classic', req.render_info);
      });    
  }else{
    req.render_info.data = false;
    res.render('market/search/classic', req.render_info);
  }
};

exports.easy_search = function(req, res){
  if(req.session && req.session.user){
    res.render('market/search/easy', {name: req.session.user.name});
  }else{
    res.render('market/search/easy', {name: false});
  }  
};

exports.graph_search = function(req, res){
  if(req.session && req.session.user){
    res.render('market/search/graph', {name: req.session.user.name});
  }else{
    res.render('market/search/graph', {name: false});
  }  
};

exports.user_project_list = function(req, res){
  user.project_list(req, res);
};

exports.user_monthly_sales =function(req,res){
  user.monthly_sales(req,res)
};

exports.user_sales = function(req, res){
  user.sales(req,res);
};

// exports.pay=function(req, res){
//   if(req.session && req.session.user){
//     res.render('pay.html', {name: req.session.user.name});
//   }else{
//     res.render('pay.html', {name: false});
//   }    
// };


exports.pay_req=function(req, res){
  payment.pay_req(req,res);
}

exports.ipn = function(req, res){
  payment.ipn(req, res);
};

// exports.pay_start = function(req, res){
//   payment.pay_start(req, res);
// };

// exports.pay_init = function(req, res){
//   payment.beta_pay_init(req,res);
// }
// exports.pay_url_get = function(req, res){
//   payment.pay_url_get(req,res);
// }

exports.projectView = function(req, res){
  var result = req.render_info;
  var user = false;
  if(req.session && req.session.user){
    user = req.session.user.id;
  }

  mysql_handler.is_repository_exist(req.render_info.repository_name, function(data){
    if(data){
      result.repoInfo = data;
      mysql_handler.best_seller(undefined, user, function(best_seller, user_like){
        if(best_seller){
          result.best_seller = best_seller;
          result.user_like = user_like;
          res.render('market/main',result);          
        }else{
          res.end();
        }
      });
    }else{
      error_404page(req, res);
    }
  })
};

exports.register = function(req, res){
  if(req.session && req.session.user){
    res.redirect('/main');
  }else{
    res.render("main/register", {name: false});
  }
};

exports.resent_email = function(req, res){
  var email = req.body.email;
  member.send_verification_email(email, function(err, msg){
    res.json({err: err, msg: msg});
  })
}

//review 
exports.review_create =function(req, res){
  review.create(req, res);
};

exports.review_delete =function(req, res){
  review.delete(req, res);
};

exports.review_read =function(req, res){
  review.read(req, res);
};

exports.review_update =function(req, res){
    review.update(req, res);
};

exports.robots_txt = function(req, res){
  fs.readFile(path.resolve(__dirname,'..','views')+'/robots.txt', function(error, data){
  if(error){
    console.log(error);
    res.writeHead(404);
  }else{
    res.writeHead(200, {'Content-Type':'text/plain'});
  }
  res.end(data);
  });
};

exports.search_result = function(req, res){
  if(req.session && req.session.user){
    res.render('main/search_result', {name: req.session.user.name});
  }else{
    res.render('main/search_result', {name: false});
  }
};

exports.ajax_get_cart_list = function(req, res){
  if(req.session&&req.session.user){
    user_cart.get_cart_list(req, res);
  }else{
    res.json(null)
  }
};
exports.ajax_add_cart= function(req, res){
  if(req.session&&req.session.user){
    user_cart.add_cart(req, res);
  }else{
    res.json(null)
  }
};
exports.ajax_add_cart_multiple= function(req, res){
  if(req.session&&req.session.user){
    user_cart.add_cart_multiple(req, res);
  }else{
    res.json(null)
  }
};
exports.ajax_delete_cart = function(req, res){
  if(req.session&&req.session.user){
    user_cart.delete_cart(req, res);
  }else{
    res.json(null)
  }
};

exports.view_contents = function(req, res){
  project.view_contents(req, res);
};

exports.ajax_deal_update = function(req, res){
  deal.ajax_update(req, res);
}

exports.ajax_deal_offer = function(req, res){
  deal.ajax_offer(req, res);
}

exports.ajax_deal_list = function(req, res){
  deal.ajax_list(req, res);
}

exports.ajax_deal_read = function(req, res){
  deal.ajax_read(req, res);
}

exports.ajax_deal_accept = function(req, res){
  deal.ajax_accept(req, res);
}
exports.ajax_deal_deny = function(req, res){
  deal.ajax_deny(req, res);
}
exports.user_deal= function(req, res){
  deal.main_view(req,res);
}

// exports.user_buyer_deal= function(req, res){
//   deal.buyer_view(req,res);
// }

// exports.user_seller_deal= function(req, res){
//   deal.seller_view(req,res);
// }
exports.ajax_donate_info = function(req, res){
  donate.get_info(req,res);
};

exports.ajax_get_repository_info_by_id = function(req, res){
  mysql_handler.get_repository_info_by_id(req.body.repository_id, function(result){
    res.json(result)
  });
};

exports.ajax_get_project_detail = function(req, res){
  var user = false;
  var my_project = false;
  if(req.session&&req.session.user){
    user = req.session.user.id;
    if(req.body.user_name == req.session.user.name)
      my_project=true;
  }
  project.get_project_detail(req.body, user, function(result){
    if(result.status){
      result.my_project = my_project;
      result.gitserver_origin = settings.data.gitserver_origin;
      res.json(result);
    }else{
      res.end();
    }
  });
};

exports.ajax_put_project_review = function(req, res){
  project.put_project_review(req.body, function(result){
    if(result.status == false){
      res.end();
    }else{
      elastic_search_handler.update_repository_review_count(result.data[0].repository_id, 1, function(err, data){
        if(err){
          console.log('elastic review couont error');
          console.log(err);
          res.end();
        }else{
          console.log('review success');
          res.json(data);
        }
      });
    }
  });
}

exports.edit_user_info = function(req, res){
  res.render('user/edit_info', req.render_info);
  // if(req.session && req.session.user){
  //   res.render('user/edit_info', {name: req.session.user.name});
  // }else{
  //   res.writeHead(404);
  // }  
}

exports.project_like = function(req, res){
  if(req.session && req.session.user){
    project.project_like(req.session.user.id, req.body.repository_id, function(result){
      if(result){
        res.json({result: true});
      }else{
        res.json({result: false, code:"error"});
      }
    })
  }else{
    res.json({result: false, code:"login"});
  }
};

exports.project_like_cancel = function(req, res){
  if(req.session && req.session.user){
    project.project_like_cancel(req.session.user.id, req.body.repository_id, function(result){
      if(result){
        res.json({result: true});
      }else{
        res.json({result: false, code:"error"});
      }
    })
  }else{
    res.json({result: false, code:"login"});
  }
};
exports.project_like_list = function(req, res){
  if(req.session && req.session.user){
    project.project_like_list(req.session.user.id, function(err, data){
      res.json({err: err, data: data});
    })
  }
}

exports.ajax_license_read = function(req, res){
    license.read(req,res);
}

exports.ajax_save_user_info = function(req, res){
  if(req.session && req.session.user){
    var params = [];
    var target = "";

    switch(req.body.target){
      case 'sns':
        target = 'sns_id';
      break;
      case 'website':
        target = 'homepage';
      break;
      case 'paypal':
        target = 'paypal_id';
      break;
    }
    if(target == "")
      res.json(false);

    params.push(req.body.value);
    params.push(req.session.user.id);
    mysql_handler.update_user_info(target, params, function(err, data){
      if(err){
        error_handler.basic_handler('ERR_SAVE_USER_INFO', res);
      }else{
        res.json(data);  
      }
    });
  }else{
    error_handler.basic_handler('ERR_LOGIN_REQUEST', res);
  }
}

exports.ajax_get_myprofile = function(req, res){
   if(req.session && req.session.user){
    var params = [];
    params.push(req.session.user.id);
    mysql_handler.get_user_info(params, function(err, data){
      if(err){
        error_handler.basic_handler('ERR_GET_USER_INFO', res);
      }else{
        res.json(data[0]);  
      }
    });
   }else{
    error_handler.basic_handler('ERR_LOGIN_REQUEST', res);
   }
}