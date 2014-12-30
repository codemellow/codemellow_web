var settings = require('../settings'); //Simple Setting Infos
var mysql_handler = require('../modules/mysql_handler/mysql_handler');

exports.check_session = function(req, res, next){
  req.render_info={
    repository_id: null,
    directView: false,
    reviews: false,
    user_name: undefined,
    project_name: undefined,
    repository_name: undefined,
    reposerver_origin: settings.data.reposerver_origin,
    gitserver_origin: settings.data.gitserver_origin
  };
  if(req.session && req.session.user){
    req.render_info.user_id = req.session.user.id;
    req.render_info.name = req.session.user.name;
    req.render_info.email = req.session.user.email;
  }else{
    req.render_info.user_id = false;
    req.render_info.name = false;
    req.render_info.email = false;
  }
  next();
};

exports.need_session = function(req, res, next){
  //console.log(req.url);
  if( !req.session || !req.session.user || !req.session.user.id){
    if(req.url.indexOf('/ajax')==0){
      res.json({status:false, errmsg:"login error", return_url:'/login_please?return_url='});
    }else{
      res.redirect('/login?return_url='+req.url);
    }
    return false;
  }
  next();
}

exports.store_user_name_to_renderinfo = function(req, res, next){
  req.render_info.user_name = req.params.user;
  next();
};

exports.store_repository_name_to_renderinfo = function(req, res, next){
  req.render_info.user_name = req.params.user;
  req.render_info.project_name = req.params.project;
  req.render_info.repository_name = req.params.user + '/' + req.params.project;

  mysql_handler.is_repository_exist(req.render_info.repository_name, function(isExist){
    if(isExist){
      req.render_info.repository_id = isExist.repository_id;
      req.render_info.repository_description = isExist.repository_description;
      req.render_info.thumbnail_url = isExist.thumbnail_url ? isExist.thumbnail_url:"/image/add_your_img.png";
      next();
    }else{
      res.render('404page', req.render_info);
    }
  });
};

exports.direct_view = function(req, res, next){
  req.render_info.directView = true;
  next();
}


exports.url_parsing = function(req, res, next){
  var url_query_paring_arr = req.url.split('/').filter(function(paring_arr){
    return paring_arr;
  });

  req.render_info.url_query_paring_arr = url_query_paring_arr;

  next();
};



exports.only_maintainer = function(req, res, next){
  if(! (req.session && req.session.user)  ){
    res.json('Only Maintainer');
    return false;
  }

  var input_param={};
  //input_param.user_id=req.body.user_id || req.query.user_id;
  input_param.user_id=req.session.user.id;
  input_param.repository_name=req.params.user+'/'+req.params.project;
  mysql_handler.is_maintainer(input_param, function(result){
    if(!result){
      res.json('Only Maintainer')
    }else{
      next();
    }
  })
}



exports.only_inspector = function(req, res, next){
  if(! (req.session && req.session.user)  ){
    res.json('Only Inspector 1');
    return false;
  }

  var input_param={};
  //input_param.user_id=req.body.user_id || req.query.user_id;
  input_param.user_id=req.session.user.id;
  input_param.repository_name=req.params.user+'/'+req.params.project;
  mysql_handler.get_contributing_level(input_param, function(level){
    if(level === 1 || level ===2 ){
      next();
    }else{
      res.json('Only Inspector 2')
    }   
  })
}



exports.only_contributor = function(req, res, next){
  if(! (req.session && req.session.user)  ){
    res.json('Only Contributor');
    return false;
  }

  var input_param={};
  //input_param.user_id=req.body.user_id || req.query.user_id;
  input_param.user_id=req.session.user.id;
  input_param.repository_name=req.params.user+'/'+req.params.project;
  mysql_handler.get_contributing_level(input_param, function(level){
    if(level === 0 || level ===1 || level === 2){
      next();
    }else{
      res.json('Only Contributor')
    }   
  })
}
