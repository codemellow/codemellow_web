var elasticsearch = require('elasticsearch');


var client = new elasticsearch.Client({

  host: ['localhost:9200','localhost:9201'] //connect with multiple nodes
});




exports.elastic_status = function(req, res){
  /*
  this is elastic status module made by ChunSeong Park
  */

  res.send("Elastic Status");
  client.cluster.health(function (err, resp) {
  if (err) {
    console.error(err.message);
  } else {
    console.dir(resp);
  }
  });

};


exports.code_search = function(req, res){
  
  console.log(req.query)
  /*
  this is code search module made by ChunSeong Park
  Search by req.query.search_text
  from page_num*size
  size can be changed
  */
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



exports.issues_search = function(req, res){
  /* 
  this is issues search module made by ChunSeong Park
  Search by req.query.search_text
  from page_num*size
  size can be changed
  */
  

  res.send("issues Search");
};


exports.users_search = function(req, res){
  /* 
  this is users search module made by ChunSeong Park
  Search by req.query.search_text
  from page_num*size
  size can be changed
  */
  res.send("Users Search");
};


exports.repositories_search = function(req, res){
  /* 
  this is repositories search module made by ChunSeong Park
  Search by req.query.search_text
  from page_num*size
  size can be changed
  */
  res.send("Repositories Search");
};



