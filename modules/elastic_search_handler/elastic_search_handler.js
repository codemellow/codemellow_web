var elasticsearch = require('elasticsearch');

var client;
switch(process.env.NODE_ENV){
  case 'dev':
    client=new elasticsearch.Client({
  		host: ['localhost:9200','localhost:9201'] //connect with multiple nodes
    });
    break;
  case 'pro':
    client=new elasticsearch.Client({
        host: ['database.codemellow.net:9200','database.codemellow.net:9201'] //connect with multiple nodes
    });
    break;
  default:
    client=new elasticsearch.Client({
      host: ['database.codemellow.net:9200','database.codemellow.net:9201'] //connect with multiple nodes
    });
    break;
}




/*
this is elastic status module made by ChunSeong Park
*/
exports.elastic_status = function(callback){
  client.cluster.health(function (err, resp) {
    callback(err,resp)
  });
};
/*
this is elastic insert_new_project module made by ChunSeong Park
*/
exports.insert_new_project = function(project_name,username,project_discription,date,callback){
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
  },function (error, response) {
    callback(error, response)
  })
};
/*
this is elastic delete_code module made by ChunSeong Park
source path should be passed to index name by encoded base64
*/
exports.delete_code = function(project_name,source_code_path,callback){
   client.index({
    index:'project',
    type:'code',
    id:new Buffer(project_name+"/"+source_code_path, 'base64')
  },function (error, response) {
    callback(error, response)
  })
};
/*
this is elastic insert_code module made by ChunSeong Park
source path should be passed to index name by encoded base64
*/
exports.insert_code = function(project_name,code_author,source_code_path,source_code,date,callback){
   client.index({
    index:'project',
    type:'code',
    id:new Buffer(project_name+"/"+source_code_path, 'base64'),
    body:{
      project_name:project_name,
      project_maintatiner:code_author,
      create_date :date,
      code: 'Updated',
      update_author:code_author,
      update_date:date
    }
  },function (error, response) {
    callback(error, response)
  })
};
/*
this is elastic update_code module made by ChunSeong Park
source path should be passed to index name by encoded base64
*/
exports.update_code = function(project_name,code_author,source_code_path,source_code,date,callback){
  client.update({
    index: 'project',
    type: 'code',
    id: new Buffer(project_name+"/"+source_code_path, 'base64'),
    body: {
      doc: {
        code: 'Updated',
        update_author:code_author,
        update_date:date
      }
    }
  },function (error, response) {
    callback(error, response)
  });
};

/*
this is code search module made by ChunSeong Park
Search by search_text
from page_num*size
size can be changed
*/
exports.code_search = function(page_num, search_text,callback){
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
  },function (error, response) {
    callback(error, response)
  });
};


/* 
this is issues search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.issues_search = function(page_num, search_text,callback){
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
  },function (error, response) {
    callback(error, response)
  });
};

/* 
this is users search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.users_search = function(page_num, search_text,callback){
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
  },function (error, response) {
    callback(error, response)
  });
};

/* 
this is repositories search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.repositories_search = function(page_num, search_text,callback){
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
  },function (error, response) {
    callback(error, response)
  });
};



