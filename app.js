
/**
* Module dependencies.
*/

var express = require('express');
var routes = require('./routes');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();
var pushover = require('pushover');
var repos_manage = require('./modules/repository/repository_manage');
var repos = pushover('/tmp/repos',{autoCreate:false});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('dev' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.error_404);
app.get('/robots.txt', routes.robots_txt);
app.get('/market', routes.market_index);
app.get('/dev', routes.dev_index);
app.get('/search/code', routes.elastic_code_search);
app.post('/project', routes.make_project);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


repos_manage.repos_init(repos);

http.createServer(function (req, res) {

repos.handle(req, res);

}).listen(7000);
