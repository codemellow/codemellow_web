var settings = require('../../settings');

var project=require('../../modules/project/project');
var project_contribution=require('../../modules/project/project_contribution');
var mysql_handler=require('../../modules/mysql_handler/mysql_handler');
var neo4j_handler=require('../../modules/neo4j_handler/neo4j_handler');
var member = require("../../modules/member/management");
var reposerver_handler = require('../../modules/repository/reposerver_handler');
var elastic_search_handler=require('../../modules/elastic_search_handler/elastic_search_handler');

exports.error_page =function(req, res){
   res.render('404page');  
}

exports.project_code_view = function(req, res){
  req.render_info.file_path=req.param(0);
  res.render('dev/project/code_view',req.render_info);
}
exports.project_setting = function(req, res){
  req.render_info.repository_name=req.params.user+'/'+req.params.project;
  res.render('dev/project/setting', req.render_info);
}
exports.project_dir_view = function(req, res){

  req.render_info.file_path = req.param(0);
  project.view_dir(req.render_info, function(result){
    if(result.status){
      req.render_info.list=result.data.files;
      req.render_info.repository_id = result.data.repository_id
      res.render('dev/project/dir_view', req.render_info);          
    }else{
      res.render('404page', req.render_info);
    }
  });
}

exports.project_history_of_file = function(req, res){
  project.history_of_file(req, res);
}
exports.project_view_commit = function(req, res){
  if(req.query.view_mode == 'split'){
    project.view_commit_split(req, res);
  }else{
    project.view_commit(req, res);
  }
}
exports.project_view_commit_list = function(req, res){
	project.view_commits(req, res);
}
exports.get_left_file_contents = function(req, res){
	project.get_left_file_contents(req, res);
}

exports.advanced_search = function(req, res){
  res.render('dev/search/advanced', req.render_info);
}
exports.new_project = function(req, res){
  res.render('dev/project/new_project', req.render_info);
}
exports.project_visualization = function(req, res){
  res.render('dev/project/visualization', req.render_info);
}
exports.recommend = function(req, res){
  project.recommend(req,res);
}

exports.autocomplete_project = function(req, res){
  elastic_search_autocomplete.autocomplete(req, res);
};

exports.dev_index = function(req, res){
  res.render('dev/dev_main', req.render_info);
};

exports.dev_search = function(req, res){
  res.render('dev/dev_search', req.render_info);
};


exports.edit_project_info = function(req, res){

  project.view_edit(req.render_info, function(result){
    if(result.status){
      res.render('dev/edit_project_info.ejs', result);
    }else{
      res.end();
    }
  });
};

exports.project_edit_code = function(req, res){
  req.render_info.file_path=req.param(0);
  res.render('dev/project/code_edit', req.render_info);
}

exports.project_edit_readme = function(req, res){
  
}

exports.ajax_view_code = function(req, res){
  project.ajax_view_code(req.body, function(data){
    res.json(data);
  });
};
exports.dev_login = function(req, res){
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
  })
};

exports.dev_logout = function(req,res){
  if(req.session && req.session.user){
    delete req.session.user;
    res.redirect('/dev');
  }else{
    res.redirect('/dev');
  }
}
exports.dev_user_info = function(req, res){
   member.get_user_info(req.params.user, function(err, data){
    res.json(data);
  })
}
exports.dev_mypage = function(req, res){
  member.get_user_info(req.params.user, function(err, data){
    if(err){
      res.render('404page.ejs');
      return false;
    }

    if(req.render_info && req.render_info.name == req.params.user){
     data.me = true; 
    }else{
      data.me = false;
    }
    if(req.render_info){
      req.render_info.mypage = data;  
    }else{
      req.render_info = {name: false};
    }
    res.render('dev/dev_mypage', req.render_info)
  })
};

exports.repository_fork = function(req, res){
  var requestData = {
    origin_repo_path : settings.data.default_repos_path + '/' + req.render_info.repository_name,
    target_repo_path : settings.data.default_repos_path + '/' + req.render_info.name + '/' + req.render_info.project_name,
    origin_repo_id : req.render_info.repository_id,
    user_id : req.render_info.user_id,
    name : req.render_info.name,
    project_name : req.render_info.project_name,
    repository_description : req.render_info.repository_description,
    repository_name : req.render_info.repository_name
  };

  if(req.render_info.name == req.render_info.user_name){
    res.redirect('/'+req.render_info.repository_name);
    return;
  }else{
    mysql_handler.is_repository_exist(req.render_info.name + '/' + req.render_info.project_name, function(isExist){
      if(isExist){
        res.redirect('/'+req.render_info.name+'/'+req.render_info.project_name);
        return;
      }
    });    
  }

  reposerver_handler.request_repository_fork(requestData, function(isSucess){
    if(isSucess){
      res.redirect('/'+req.render_info.name+'/'+req.render_info.project_name);
    }else{
      res.render('404page.ejs');
    }
  });
}

exports.repository_commit = function(req, res){
  if(req.render_info.user_name != req.render_info.name){
    res.json({status:false, errmsg:"No Maintainer"});
  }else{
    var requestData = {
      repository_name : req.render_info.repository_name,
      username : req.render_info.name,
      email : req.render_info.email,
      file_path_with_name : req.body.file_path,
      file_content : req.body.code,
      commit_comment : req.body.comment,
      commit_msg : req.body.message
    }

    reposerver_handler.request_repository_commit(requestData, function(isSucess){
       if(isSucess){
          res.json({status:true});
       }else{
          res.json({status:false, errmsg:"Commit Fails"})
       }
    })
  }
}

exports.ajax_readme_view = function(req, res){
  project.ajax_readme_view(req.body, res);
};


exports.repository_contributor = function(req, res){
  project_contribution.get_contributor_info(req, res); 
}
exports.repository_contributor_insert = function(req, res){
  project_contribution.insert_contributor_info(req, res);
}
exports.repository_contributor_update = function(req, res){
  project_contribution.update_contributor_info(req,res);
}

exports.repository_news = function(req, res){
  // res.json('news');
  var req_data={};
  req_data.repository_name=req.params.user+'/'+req.params.project;
  reposerver_handler.request_repository_news(req_data, function(data){
    res.json(data);
  });
}
exports.repository_news_bulk = function(req,res){
  reposerver_handler.request_repository_news_bulk(req.body, function(data){
    res.json(data);
  });
}

exports.repository_commit_count = function(req, res){
  var requestData = {
    repository_name : req.render_info.repository_name
  }

  reposerver_handler.request_repository_commit_count(requestData, function(result){
    if(result.status){
      res.json({status:true, data:result.data});
    }else{
      res.json({status:false, errmsg:"Commit count Error"});
    }
  });
}

exports.repository_branch_count = function(req, res){
  var requestData = {
    repository_name : req.render_info.repository_name
  }

  reposerver_handler.request_repository_branch_count(requestData, function(result){
    if(result.status){
      res.json({status:true, data:result.data});
    }else{
      res.json({status:false, errmsg:"Branch count Error"});
    }
  });
}

exports.repository_contributor_count = function(req, res){
  var params = {
    repository_id: req.render_info.repository_id
  }

  mysql_handler.get_contributor_info(params, function(result){
    res.json({status:true, data:result.length});
  })
}

exports.classic_search = function(req, res){
  req.render_info.search = req.params.search;
  req.render_info.page = req.params.page;
  if(!req.render_info.page) req.render_info.page = 1;

  if(req.render_info.search && req.render_info.page){
      elastic_search_handler.sort_search_repository(req.render_info.page,req.render_info.search,"default", function(err,result){
        req.render_info.data = result;
        res.render('dev/search/classic', req.render_info);
        //res.json(req.render_info)
      });    
  }else{
    req.render_info.data = false;
    res.render('dev/search/classic', req.render_info);
    //res.json(req.render_info)
  }
}

exports.repository_commit_view = function(req, res){
    res.render("dev/project/commit/list_view", req.render_info);
}

exports.repository_commit_list = function(req, res){
  var requestData = {
    repository_name : req.render_info.repository_name,
    page : req.body.page
  }

  reposerver_handler.request_repository_commit_list(requestData, function(result){
    if(result.status){
      res.json({status:true, data:result.data});
    }else{
      res.json({status:false, errmsg:"Commit List Fail"});
    }
  });
}

exports.pullRequest_view = function(req, res){
  res.render('dev/project/pull', req.render_info);  
}

exports.issue_view = function(req, res){
  res.render('dev/project/issue', req.render_info);  
}

exports.milestone_view = function(req, res){
  res.render('dev/project/milestone', req.render_info);  
}
exports.autocomplete_user = function(req, res){
  mysql_handler.autocomplete_user(req.query, function(data){
    res.json(data);
  })
}