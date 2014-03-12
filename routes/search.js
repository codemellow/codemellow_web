var elasticsearch = require('elasticsearch');

var client;
switch(process.env.NODE_ENV){
        case 'development':
            return {
		client=new elasticsearch.Client({
  			host: ['localhost:9200','localhost:9201'] //connect with multiple nodes
		});

	};

        case 'production':
            return {
		client=new elasticsearch.Client({
                        host: ['cow1.codemellow.net:9200','cow1.codemellow.net:9201'] //connect with multiple nodes
                });

	};

        default:
            return {

	};
}




/*
this is elastic status module made by ChunSeong Park
*/
exports.elastic_status = function(req, res){


  res.send("Elastic Status");
  client.cluster.health(function (err, resp) {
  if (err) {
    console.error(err.message);
  } else {
    console.dir(resp);
  }
  });

};

/*
this is code search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.code_search = function(req, res){
  
  console.log(req.query)

  var page_num =req.query.page_num;
  var search_text =req.query.search_text;
  var size=15;
  var from=page_num*size;
  client.search({
    index: 'codemellow',
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
exports.issues_search = function(req, res){
  
  

  res.send("issues Search");
};

/* 
this is users search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.users_search = function(req, res){
  
  res.send("Users Search");
};

/* 
this is repositories search module made by ChunSeong Park
Search by req.query.search_text
from page_num*size
size can be changed
*/
exports.repositories_search = function(req, res){

  res.send("Repositories Search");
};



