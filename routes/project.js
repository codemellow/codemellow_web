


var elasticsearch = require('elasticsearch');

var pushover = require('pushover');
var client = new elasticsearch.Client({

  host: ['localhost:9200','localhost:9201'] //connect with multiple nodes
});


var mysql = require('mysql');
 var dbconn = mysql.createConnection({
    host     : 'localhost', // 3306
    user     : 'root',
    password : 'ehowlsus14'
});
dbconn.connect();

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
  var password=req.body.password;
  var project_name=req.body.project_name;
  

  /* check project */
 
  dbconn.query("use project");
  dbconn.query("select * from info where project_name='"+project_name+"'",function(err,rows,cols){
    if(err) throw err;
    if(rows.length==0){
      dbconn.query("insert into info (project_name,project_maintatiner,create_date) values ('"+project_name+"','"+username+"','"+dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true)+"')")
      
      var repos = pushover('/tmp/repos',{autoCreate:false});
      repos.create(project_name,function(err){
        if(err)
          console.log(err)
      })
      
      console.log("Making project"); 
      res.send("Making project")
      res.end()
    }else{
      console.log("project already exist");
      res.send("project already exist")
      res.end()
    }

  });
};





