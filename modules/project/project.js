


var elasticsearch = require('elasticsearch');

var pushover = require('pushover');
var elastic_search_handler = require('../elastic_search_handler/elastic_search_handler');
var mysql_handler = require('../mysql_handler/mysql_handler');
var socket_handler = require('../socket_handler/socket_handler');

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

/* 
this is make project module made by ChunSeong Park
make project should create git repository automatically
*/
exports.make_project = function(req, res){
  var username=req.body.username;
  var project_discription=req.body.project_discription;
  var project_name=req.body.project_name;
  if(project_name!=null&&project_name.toString()!=""){
    mysql_handler.is_project_exist(project_name,function(flag){
      if(flag!=true){

        var repos = pushover('/tmp/repos',{autoCreate:false});
        repos.create(project_name,function(err){
          if(err)
            console.log(err)
          else{
            var date=dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);

            mysql_handler.insert_new_project(project_name,username,project_discription,date);
            elastic_search_handler.insert_new_project(project_name,username,project_discription,date);
          }
        })
        console.log("Making project"); 
        res.send("Making project")
        res.end()
      }else{
        console.log("project already exist");
        res.send("project already exist")
        res.end()
      }
    })
  }
};

exports.show_project = function(req, res){
  var project_name = req.params.project_name;
  console.log(project_name);
  res.send(project_name);
}

exports.commit = function(data){

  if(data.project_name==null|| data.commiter==null){
    console.log("commit error\n");
    return false;
  }

  if(data.date==null){
    data.date = dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);
  }else{
    data.date = dateFormat(data.date,"%Y-%m-%d %H:%M:%S", true);
    mysql_handler.insert_new_commit(data.project_name, data.commiter, data.date);
  }

  socket_handler.commit(data);
}

