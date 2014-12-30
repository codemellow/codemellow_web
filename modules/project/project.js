
var path=require('path');

var spawn = require('child_process').spawn;
//var syntax_highlight=require("../syntax_highlight/syntax_highlight")

//var markup=require("../markup/markup")
var elastic_search_handler = require('../elastic_search_handler/elastic_search_handler');
var mysql_handler = require('../mysql_handler/mysql_handler');
var neo4j_handler=require('../neo4j_handler/neo4j_handler');
var repository_handler = require('../repository/reposerver_handler');
var fs = require('fs');
var self = this;

/*exports.project_init = function(repos){
  this.repos = repos;
}*/

function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}

function timeDifference(current, previous) {

    var msPerMinute = 60;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}


exports.ajax_view_code = function(query, callback){

  repository_handler.request_view_file_code(query, callback);  
}

exports.ajax_readme_view = function(query, res){
  repository_handler.request_get_readme_view(query,function(data){
    res.json(data)
  });
  
}

var add_view_count = function(repository_id, callback){
  mysql_handler.add_view_count(repository_id, function(isSuccess){
    if(isSuccess){
      elastic_search_handler.update_repository_view_count(repository_id, 1, function(err, data){
        if(err){
          console.log('add view count elastic error', err);
          callback(false);
        }else{
          callback(data);
        }
      });  
    }else{
      callback(false);
    }
  });
}

exports.add_view_count = add_view_count;

exports.commit = function(data){

  if(data.repository_name==null|| data.commiter==null){
    console.log("commit error\n");
    return false;
  }

  if(data.date==null){
    data.date = dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);
  }else{
    data.date = dateFormat(data.date,"%Y-%m-%d %H:%M:%S", true);
  }


  mysql_handler.insert_new_commit(data.repository_name, data.commiter, data.date);
}

exports.view_dir = function(render_info, callback){
  var post_data={
    repository_name : render_info.repository_name,
    dir_path : render_info.file_path
  };

  repository_handler.request_view_dir(post_data, callback);
};


exports.view_default = function(req, res, user){
  this.view_review(req, res, user);
};

exports.history_of_file = function(req, res){
  var query = {};
  query.repository_name = req.render_info.repository_name;
  query.file_name = req.params.file;
  query.branch = req.params.branch;
  query.page = req.params.page ? req.params.page : 1;

  repository_handler.history_of_file(query, function(data){
    req.render_info.history = data;
    req.render_info.page =  query.page;
    req.render_info.branch = query.branch;
    req.render_info.repository_name = query.repository_name;
    res.render('dev/dev_history_of_file.ejs', req.render_info);
  });
}
exports.view_commit = function (req, res){

  if(req.params.hash==undefined){
    //error handling
    res.end("");
    return;
  }
  req.render_info.commit_hash = req.params.hash;
  req.render_info.branch = req.params.branch;
  var query = {repository_name:req.render_info.repository_name,commit_hash:req.render_info.commit_hash, branch: req.render_info.branch}
  repository_handler.request_commit_diff(query, function(data){
    var commitor = data[0]
    var commit_date = data[1];
    var commit_log = data[2];
    delete data[0];
    delete data[1];
    delete data[2];
    req.render_info.commitor = commitor;
    req.render_info.commit_data = data;
    req.render_info.create_date = commit_date;
    req.render_info.commit_log = commit_log;
    req.render_info.diff_data = data;
    req.render_info.view_mode = 'unified';
    res.render('dev/project/commit/dev_commit_unified_view.ejs', req.render_info);
  });
};
exports.view_commit_split = function(req, res){
  if(req.params.hash==undefined){
    //error handling
    res.end("");
    return;
  }
  req.render_info.commit_hash = req.params.hash;
  req.render_info.branch = req.params.branch;
  var query = {repository_name:req.render_info.repository_name,commit_hash:req.render_info.commit_hash, branch: req.render_info.branch}
  repository_handler.request_commit_diff(query, function(data){
    var commitor = data[0]
    var commit_date = data[1];
    var commit_log = data[2];
    delete data[0];
    delete data[1];
    delete data[2];
    req.render_info.commitor = commitor;
    req.render_info.commit_data = data;
    req.render_info.create_date = commit_date;
    req.render_info.commit_log = commit_log;
    req.render_info.diff_data = data;
    req.render_info.view_mode = 'split';
    res.render('dev/project/commit/dev_commit_split_view.ejs', req.render_info);
  });
}
exports.get_left_file_contents = function(req, res){
  repository_handler.request_left_file_contents(req.body.repository_name, req.body.commit_hash, req.body.start_line, req.body.end_line, req.body.file_name, function(data){
    res.json(data);
  });
}

exports.view_commits = function (req, res){

    var branch = req.params.branch;
    var page = req.query.page;

    if(branch==undefined) branch = 'master';
    if(page==undefined) page = 1; else page = parseInt(page);

    if(page<1) page = 1;

    req.render_info.branch = branch;
    req.render_info.page = page;

    mysql_handler.get_commit_info_by_repository_name(req.render_info.repository_name, req.render_info.branch, req.render_info.page, function(rows, cols){
      var i, create_date = [];
      for(i in rows){
        create_date.push(timeDifference(Math.round(Date.now()/1000), parseInt(rows[i].unix_time)));
      }
      req.render_info.data = rows;
      req.render_info.create_date = create_date;

      res.render('dev/dev_commit.ejs', req.render_info);
    });
};

function view_edit(projectInfo, callback){ 
  if(typeof(callback) != 'function') callback = function(){};

  projectInfo.status = true;
  callback(projectInfo);
}


exports.view_file_code = function(query, res){

    repository_handler.request_view_file_code(query,function(data){
      res.json(data)
    });
};

exports.view_contents = function(req, res){
  var view_name = req.body.view_name;
  
  res.json(data);
};


exports.put_project_review = function(projectInfo, callback){
  if(typeof(callback) != 'function') callback = function(){};
  
  mysql_handler.put_repository_review(projectInfo, function(data){
    if(data != false){
      mysql_handler.add_review_count(projectInfo, function(result){
        if(result.status == false){
          console.log("add review count error");
          callback(false);
        }else{
          callback(result);
        }
      });
    }
  });
};

exports.get_project_detail = function(projectInfo, user, callback){
  if(typeof(callback) != 'function') callback = function(){};
  // var projectInfo = projectInfo;
  mysql_handler.get_repository_data(projectInfo.repository_name, user, function(result){

    projectInfo.like = result.like;
    projectInfo.reviews = result.review;
    projectInfo.repoInfo = result.info;
    projectInfo.repoInfo.like_target_element_id = projectInfo.like_target_element_id;
    projectInfo.status = result.status;
    
    
    callback(projectInfo);

    add_view_count(projectInfo.repoInfo.repository_id, function(isSuccess){
      if(!isSuccess)
        console.log('project add view count fail');
    });
    
  });
};

exports.project_like = function(user_id, repository_id, callback){
  mysql_handler.insert_like(user_id, repository_id, function(res){
    callback(res);
  })
}
exports.project_like_cancel = function(user_id, repository_id, callback){
  mysql_handler.delete_like(user_id, repository_id, function(res){
    callback(res);
  }) 
}
exports.project_like_list = function(user_id, callback){
  mysql_handler.get_user_like_list(user_id, function(err, data){
    callback(err, data);
  })
}

exports.recommend = function(req, res){
  if( !req.query ){
    res.json(false);
    return false;
  }

  if( req.query.repository_query){
    recommend_by_repository(req.query.repository_query, res);
  }else if( req.query.user_query){
    recommend_by_user(req.query.user_query, res);
  }else{
    res.json(false);
    return false;
  }


}


function recommend_by_repository(repository_query, res){
  //1. reco from neo4j
  //2. metadata from mysql
  var ret={};

  neo4j_handler.repo_collaborative_filtering(
  {
    repository_name : repository_query
  }, function( nodes){
    //ret.push(nodes);


    var repository_id_arr=[];
    for(var i=0;i<nodes.length;i++){
      repository_id_arr.push(nodes[i].repository_id);
    }

    mysql_handler.get_repository_info_by_id_arr({repository_id_arr:repository_id_arr}, function(rows){
      //ret.push(rows);


      ret = calc_rank_using_mysql_and_neo4j(rows, nodes);



      res.json(ret)
    })
  })


}


function recommend_by_user(user_query, res){
  //1. reco from neo4j
  //2. metadata from mysql
  var ret={};

  neo4j_handler.user_collaborative_filtering(
  {
    user_name : user_query
  }, function(nodes){

    var repository_id_arr=[];
    for(var i=0;i<nodes.length;i++){
      repository_id_arr.push(nodes[i].repository_id);
    }
    if(repository_id_arr.length==0){
      res.json(ret);
    }else{
      mysql_handler.get_repository_info_by_id_arr({repository_id_arr:repository_id_arr}, function(rows){
        ret = calc_rank_using_mysql_and_neo4j(rows, nodes);
        res.json(ret)
      });  
    }
    
  })

}


//using neo4j_nodes' weight
function calc_rank_using_mysql_and_neo4j(mysql_rows, neo4j_nodes){
  if(mysql_rows.length !== neo4j_nodes.length){
    console.log('mysql-neo4j inconsistent')
    console.log(mysql_rows, neo4j_nodes);
  }else{
    for(var i=0;i<mysql_rows.length;i++){
      mysql_rows[i].weight=neo4j_nodes[i].weight;
    }
  }
  //some other weight calc need

  ///
  return mysql_rows;
}



function recommend_by_multi_query(query ,res){
  var user_query_arr=query.user_query_arr;
  var repository_query_arr=query.repository_query_arr;

  var ret={};




}





/*


  MATCH  (me:user)-[:PARTICIPATE_IN]->(:repo)<-[:PARTICIPATE_IN]-(other:user)-[:PARTICIPATE_IN]->(reco:repo) 
  WHERE  me.user_name IN ['simdj','silva'] AND NOT (me = other) AND NOT ( me-->(reco) ) 
  RETURN other.user_name AS other, reco.repository_name AS reco,  reco.repository_id AS repository_id
  ORDER BY reco.repository_name ,  other.user_name ; 


*/