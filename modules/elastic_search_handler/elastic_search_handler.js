var elasticsearch = require('elasticsearch');

var client;
switch(process.env.NODE_ENV){
  case 'development':
    client=new elasticsearch.Client({
  		host: ['localhost:9200','localhost:9201'] //connect with multiple nodes
    });
    break;
  case 'production':
    client=new elasticsearch.Client({
        host: ['cow1.codemellow.net:9200','cow1.codemellow.net:9201'] //connect with multiple nodes
    });
    break;
  default:
    client=new elasticsearch.Client({
      host: ['cow1.codemellow.net:9200','cow1.codemellow.net:9201'] //connect with multiple nodes
    });
    break;
}




/*
this is elastic status module made by ChunSeong Park
*/
exports.elastic_status = function(callback){
  client.cluster.health(function (err, resp) {
  if (err) {
    console.error(err.message);
  } else {
    callback(resp)
  }
  });
};
/*
this is elastic insert_new_project module made by ChunSeong Park
*/
exports.insert_new_project = function(project_name,username,project_discription,date){
  client.index({
    index:'project',
    type:'project_info',
    id:project_name,
    body:{
      project_name:project_name,
      project_language:"",
      project_maintatiner:username,
      project_discription:project_discription,
      create_date :date,
      commit_count :1,
      branch_count :0,
      release_count :0,
      contributor_count :1,
      pull_request_count :0,
      issue_count :0
    }
  })
};

/*
this is code search module made by ChunSeong Park
Search by search_text
from page_num*size
size can be changed
*/
exports.code_search = function(page_num, search_text){
  var size=15;
  var from=page_num*size;
  client.search({
    index: 'project',
    type:'code',
    from:from,
    size: size,
    body: {
      query: {
        term: {
          code:search_text 
        }
      }
    }
  }).then(function (resp) {
    console.log("hit result")
    var hits = resp.hits;
    var hits_count=resp.hits.total;
    var hits_arr=resp.hits.hits;
    for(var i in hits_arr){
      console.log(hits_arr[i]._source.project)
    }
  });
};


/* 
this is issues search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.issues_search = function(page_num, search_text){
  var size=15;
  var from=page_num*size;
  client.search({
    index: 'project',
    type:'issues',
    from:from,
    size: size,
    body: {
      query: {
        term: {
          code:search_text 
        }
      }
    }
  }).then(function (resp) {
    console.log("hit result")
    var hits = resp.hits;
    var hits_count=resp.hits.total;
    var hits_arr=resp.hits.hits;
    for(var i in hits_arr){
      console.log(hits_arr[i]._source.project)
    }
  });
};

/* 
this is users search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.users_search = function(page_num, search_text){
  var size=15;
  var from=page_num*size;
  client.search({
    index: 'project',
    type:'users',
    from:from,
    size: size,
    body: {
      query: {
        term: {
          code:search_text 
        }
      }
    }
  }).then(function (resp) {
    console.log("hit result")
    var hits = resp.hits;
    var hits_count=resp.hits.total;
    var hits_arr=resp.hits.hits;
    for(var i in hits_arr){
      console.log(hits_arr[i]._source.project)
    }
  });
};

/* 
this is repositories search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.repositories_search = function(page_num, search_text){
  var size=15;
  var from=page_num*size;
  client.search({
    index: 'project',
    type:'project_info',
    from:from,
    size: size,
    body: {
      query: {
        term: {
          code:search_text 
        }
      }
    }
  }).then(function (resp) {
    console.log("hit result")
    var hits = resp.hits;
    var hits_count=resp.hits.total;
    var hits_arr=resp.hits.hits;
    for(var i in hits_arr){
      console.log(hits_arr[i]._source.project)
    }
  });
};



