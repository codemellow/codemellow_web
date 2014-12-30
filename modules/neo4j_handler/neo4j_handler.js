/*
**************************
@author Park, ChunSeong
@created 2014-03-24
This Document is protected
**************************
*/


var neo4j = require('neo4j');
var db;
switch(process.env.NODE_ENV){
  case 'dev':
  	db = new neo4j.GraphDatabase('http://localhost:7474');
  	break;
  case 'pro':
    db = new neo4j.GraphDatabase('database.codemellow.net:7474');
  	break;
  default:
    //db = new neo4j.GraphDatabase('database.codemellow.net:7474');
    db = new neo4j.GraphDatabase('http://l2ocalhost:7474');
    	break;
}
// db.getNodeById(1, function(err, data){
//   if(err.code=='ENOTFOUND'){
//     console.log('neo4j connection fail')
//     throw err;
//   }
// }) ;

//console.log(db.getServices())
// db.query('match (n) return n;',  function(err, res){
//   console.log(11111111111111111111);
//   console.log(err, res);
// })


exports.insert_project_node = function(project_name,callback){
  var node = db.createNode({"project": project_name});
  node.save(function(err,node){
      callback(err,node);
  });
};
exports.insert_tag_node = function(tag_name,callback){
  var node = db.createNode({"tag": tag_name});
  node.save(function(err,node){
      callback(err,node);
  });
};
exports.insert_project_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.insert_tag_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.insert_project_project_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_project_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_tag_tag_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
exports.delete_project_project_relation = function(project_name,callback){
  var node = db.createNode({"project": project_name});
};
var object_to_neo4j_json = function(object_data){
  return JSON.stringify(object_data).split('":').join(':').split(',"').join(',').split('{"').join(' { ');
}

var create_node_if_not_exists = function(node_type, node_data, callback){
  var exist_query="MATCH (n:[node_type] [node_data] ) return n;";
  exist_query=exist_query.replace('[node_data]', object_to_neo4j_json(node_data)).replace('[node_type]',node_type);

  //console.log('exist_query', exist_query)
  db.query(exist_query, function(err, nodes){
    //console.log('exist_query result', nodes)
    if(!err && nodes.length==0){
      var create_query="CREATE (n:[node_type] [node_data] )";
      create_query=create_query.replace('[node_data]', object_to_neo4j_json(node_data)).replace('[node_type]',node_type);
      //console.log('create', create_query)
      db.query(create_query, function(err, result){
        //console.log('create result', result);
        callback(err, result);
      });
    }else{
      callback(false, false);
    }
  });
}

var create_participate_relation_if_not_exists = function(user_info, repo_info, callback){
  var exist_query="MATCH (:dev [user_info])-[b:PARTICIPATE_IN]->(:repo [repo_info]) return b; "
  exist_query=exist_query.replace('[user_info]', object_to_neo4j_json(user_info)).replace('[repo_info]', object_to_neo4j_json(repo_info));
  //console.log('exist_query',exist_query)
  db.query(exist_query, function(err,  relations){
    if(!err && relations.length==0){
      var create_query="";
      create_query+=' MATCH (repository:repo [repo_info] ), (dev:user [user_info]) '
      create_query+=' CREATE (dev)-[:PARTICIPATE_IN]->(repository) '
      create_query+=' RETURN dev '
      create_query=create_query
        .replace('[user_info]', object_to_neo4j_json(user_info))
        .replace('[repo_info]', object_to_neo4j_json(repo_info));
      //console.log('create_query',create_query)
      db.query(create_query, function(err, result){
        //console.log('create result', err, result);
        callback(err, result);
      });

    }else{
      callback(false, false);
    }
  })
    

}
exports.insert_paticipate_relation = function(params, callback){

  create_node_if_not_exists('repo', params.repo_info, function(){
    create_node_if_not_exists('user', params.user_info, function(){
      create_participate_relation_if_not_exists(params.user_info, params.repo_info, function(err, result){
        callback(err, result)
      });

    // var query="";
    // query+=' MATCH (repository:repo [repo_data] ) '
    // query+=' CREATE UNIQUE (dev:user [user_data])-[:PARTICIPATE_IN]->(repository) '
    // query+=' RETURN dev '
    // query=query
    // .replace('[user_data]', object_to_neo4j_json(params.user_info))
    // .replace('[repo_data]', object_to_neo4j_json(params.repo_info));



    // console.log(query);
    // db.query(query, function(err, data, data2){
    //   console.log('rel err', err);
    //   console.log('rel data', data);
    //   callback(err, data);
    // })

    });
  });

  
}

// var neo4j = require('neo4j');
// var db= new neo4j.GraphDatabase('http://localhost:7474');;




var user_collaborative_filtering_neo4j_query = function(params, callback){
  var query="";
  query+="  MATCH  (me:user)-[:PARTICIPATE_IN]->(:repo)<-[:PARTICIPATE_IN]-(other:user)-[:PARTICIPATE_IN]->(reco:repo) "
  query+="  WHERE  me.user_name IN ['[user_name]']AND NOT (me = other) AND NOT ( me-->(reco) ) " 
  query+="  RETURN other.user_name AS other, reco.repository_name AS reco,  reco.repository_id AS repository_id"
  query+="  ORDER BY reco.repository_name ,  other.user_name ; "
  if(typeof params.user_name === 'object'){
    query = query.replace(/\[user_name\]/g, params.user_name.join("','") );  
  }
  else{
    query = query.replace(/\[user_name\]/g, params.user_name);  
  }
  
  db.query(query, function(err, nodes){

    if(!err){
      callback(err, nodes);
    }else{
      callback(err, []);
    }
        
  })
}


var user_collaborative_filtering_set_weight = function(arr){

  var len=arr.length;

  var reco_arr_each_weighted=[];
  var reco_arr_each_weighted_len=0;
  var before={ other : '', reco : ''}

  for(var i=0;i<len;i++){
    if(arr[i].other==before.other && arr[i].reco == before.reco){
      reco_arr_each_weighted[reco_arr_each_weighted_len-1].weight*=2;
    }else{
      reco_arr_each_weighted[reco_arr_each_weighted_len]=arr[i];
      reco_arr_each_weighted[reco_arr_each_weighted_len].weight=1;
      reco_arr_each_weighted_len++;
      before=arr[i];
    }
  }
  // console.log('------------ret arr-------------');
  // console.log(reco_arr_each_weighted);

  return reco_arr_each_weighted;
}


var user_collaborative_filtering_get_rank = function(arr){
  var len=arr.length;

  var rank_arr=[];
  var rank_arr_len=0;
  var before={ other : '', reco : ''}

  
  for(var i=0;i<len;i++){
    if( arr[i].reco == before.reco ){
      rank_arr[rank_arr_len-1].weight+=arr[i].weight;
    }else{
      rank_arr[rank_arr_len]={ 
        reco : arr[i].reco
        , repository_id : arr[i].repository_id 
        , weight : arr[i].weight 
      };

      rank_arr_len++;
      before=arr[i];
    }
  }
  

  rank_arr=rank_arr.sort(function(a,b){
    return b.weight-a.weight;
  });
  // console.log('------------rank arr-------------');
  // console.log(rank_arr)

  return rank_arr;
}


var user_collaborative_filtering = function(params, callback){
  // var params = req.query;
  // if(!params.user_name){
  //   res.json(false);
  //   return false;
  // }




  user_collaborative_filtering_neo4j_query({user_name : params.user_name}, function(err, nodes){
    var ret=user_collaborative_filtering_get_rank(      user_collaborative_filtering_set_weight(nodes)   );
    // if(res) res.json(ret);
    // else console.log(ret);
    console.log(ret);
    callback(ret);
  });

}

////call user collaborative filter
// var req={};
// req.query={};
// req.query.user_name='simdj'
// user_collaborative_filtering( req );


exports.user_collaborative_filtering = user_collaborative_filtering;



var get_simillar_user = function(user_name, callback){
  var query="";
  query+="MATCH p=( (me:user {name:'[user_name]'})-->(common:repo)<--(friend:user)  ) "
  query+=" RETURN friend.name, count(distinct common) AS share_cnt" 
  query+=" ORDER BY count(distinct common) DESC, friend.name; "
  query = query.replace(/\[user_name\]/g, user_name);

  console.log(query);
  db.query(query, function(err, nodes, a){
    console.log(nodes);
    

  })

}
exports.get_simillar_user  =get_simillar_user;






var repo_collaborative_filtering_neo4j_query = function(params, callback){
  var query="";
  query+="MATCH p=(start:repo{repository_name:'[repository_name]'})<--(:user)-->(reco_repo:repo) "
  query+="RETURN reco_repo.repository_name AS reco ,  reco_repo.repository_id AS repository_id, count(reco_repo) AS weight "
  query+="ORDER BY weight DESC, reco_repo.repository_name; "
  query = query.replace(/\[repository_name\]/g, params.repository_name);
  db.query(query, function(err, nodes){
    if(!err){
      callback(err, nodes);
    }else{
      callback(err, []);
    }
        
  })
}


var repo_collaborative_filtering = function(params, callback){
  //  var params = req.query;
  // if(!params.repository_name){
  //   res.json(false);
  //   return false;
  // }




  repo_collaborative_filtering_neo4j_query({repository_name : params.repository_name}, function(err, nodes){

    var ret= (!err) ? nodes : [];
    //console.log(nodes);
    // var ret=user_collaborative_filtering_get_rank(      user_collaborative_filtering_set_weight(nodes)   );
    // if(res) res.json(ret);
    // else console.log(ret);
    callback(ret);
  });
}


////call user collaborative filter
// var req={};
// req.query={};
// req.query.repository_name='ElasticSearch/ElasticSearch'
// repo_collaborative_filtering( req );



exports.repo_collaborative_filtering = repo_collaborative_filtering;







































// var neo4j = require('neo4j');
// var db= new neo4j.GraphDatabase('http://localhost:7474');;



// make data set 
var make_relation_data_set = function(user_arr, repo_arr){
  var user_len=user_arr.length;
  var repo_len=repo_arr.length;


  var query_template='';
  query_template+='MATCH (dev:user \t{user_name:"[user_name]"}), \t(repository:repo {repository_name:"[repo_name]"}) ';
  query_template+='\nCREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository)';
  query_template+='\rRETURN dev;';




  console.log('------------------------------------')
  for(var i=0;i<user_len;i++){
    var howmuch=Math.round(Math.random()*1000%(repo_len/3))

    for(var k=0;k<howmuch;k++){
      var repo_index=Math.round(Math.random()*1000)%(repo_len)
      console.log(query_template.replace('[user_name]',user_arr[i].user_name).replace('[repo_name]',repo_arr[repo_index].repository_name))

      // db.query(query_template.replace('[user_name]',user_arr[i].user_name).replace('[repo_name]',repo_arr[repo_index].repository_name), function(err, nodes, a){
      //   console.log(nodes);

      // })

      

    }
  }



}

var make_data_set = function(){
  var query_user='match (u:user) return u;';
  var query_repo='match (r:repo) return r;';

  var user_arr=[];
  var repo_arr=[];
  db.query(query_user, function(err, user_nodes, a){

    for(var i=0;i<user_nodes.length;i++){
      console.log(user_nodes[i].u._data.data)
      user_arr.push(user_nodes[i].u._data.data)
    }


    db.query(query_repo, function(err, repo_nodes, a){
        
      for(var i=0;i<repo_nodes.length;i++){
        console.log(repo_nodes[i].r._data.data)
        repo_arr.push(repo_nodes[i].r._data.data)
      }

      make_relation_data_set(user_arr, repo_arr)


    });

    

  })


}
//get_node_set();

