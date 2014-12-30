
var elastic_search = require('elasticsearch');
var elastic_search_handler = require('./elastic_search_handler')
var elastic_search_autocomplete = require('./elastic_search_autocomplete');

module.exports = {
	client: null,
	//elastic_search_autocomplete host url must be changed too.
	elastic_init: function(){
		switch(process.env.NODE_ENV){
		  case 'dev':
		    this.client=new elastic_search.Client({
		  		host: ['localhost:9200'] //connect with multiple nodes
		    });
		    break;
		  case 'pro':
		    this.client=new elastic_search.Client({
		        host: ['dog.codemellow.net:9200'] 
		    });
		    break;
		  default:
		    this.client=new elastic_search.Client({
		  		host: ['localhost:9200'] //connect with multiple nodes
		    });
		    break;
		}
		elastic_search_handler.init(this.client);
		elastic_search_autocomplete.init(this.client);
	},
}