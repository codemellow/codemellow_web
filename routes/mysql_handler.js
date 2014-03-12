
var mysql = require('mysql');


var dbconn;
switch(process.env.NODE_ENV){
  case 'development':
	dbconn=mysql.createConnection({
	    host     : 'localhost', // 3306
	    user     : 'root',
	    password : 'ehowlsus14'
	});
  	break;
  case 'production':
    dbconn=mysql.createConnection({
	    host     : 'cow1.codemellow.net', // 3306
	    user     : 'root',
	    password : 'ehowlsus14'
	});
  	break;

  default:
  	dbconn=mysql.createConnection({
	    host     : 'cow1.codemellow.net', // 3306
	    user     : 'root',
	    password : 'ehowlsus14'
	});
  	break;
}
dbconn.connect();

exports.is_project_exist = function(project_name,callback){
  dbconn.query("use project");
  dbconn.query("select * from info where project_name='"+project_name+"'",function(err,rows,cols){
    if(err) throw err;
    if(rows.length==0){
     callback(false);
    }else{
      callback(true);
    }

  });
};
exports.insert_new_project = function(project_name,username){
  dbconn.query("use project");
  dbconn.query("insert into info (project_name,project_maintatiner,create_date) values ('"+project_name+"','"+username+"','"+dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true)+"')")
};