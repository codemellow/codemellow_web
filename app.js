
/**
* Module dependencies.
*/

var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app =  express();
var elastic_search = require('./modules/elastic_search_handler/elastic_search');
var flash = require('connect-flash'); // Flash
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
var settings = require('./settings'); //Simple Setting Infos

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 

app.use(express.favicon());

app.use(function(req, res, next){
	if(req.url==='/ipn'){
		req.rawBody='';
		req.on('data', function(chunk){
			req.rawBody+=chunk;
		});
	}
	next();
});

/* DO NOT MODIFY THE ORDER BELOW */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(session({secret: "1234567890QWERTY",
 store: new RedisStore(settings.redis_config)}));
//app.use(express.session({ secret : settings.data.cookieSecret }));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(express.csrf());
app.use(flash());
app.use(app.router);
/* DO NOT MODIFY THE ORDER ABOVE */


// development only
if ('dev' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}else{
  app.use(express.errorHandler());
};

var error_404page = function(req, res){
  req.render_info={
    repository_id: null,
    directView: false,
    reviews: false,
    user_name: undefined,
    project_name: undefined,
    repository_name: undefined,
    reposerver_origin: settings.data.reposerver_origin,
    name: false,
    email: false
  };  
  res.render('404page', req.render_info);
}

/* ---- ROUTING LIST START ---- */

require('./routes/market/router')(app);
require('./routes/dev/router')(app);

app.get('*', error_404page);
/* ----  ROUTING LIST END  ---- */

// ------ Create Server ------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


elastic_search.elastic_init();
