
var mysql = require('mysql');


var dbconn;
switch(process.env.NODE_ENV){
  case 'dev':
	dbconn=mysql.createConnection({
	    host     : 'localhost', // 3306
	    user     : 'root',
	    password : 'ehowlsus14',
	    database : 'project'
	});
  	break;
  case 'pro':
    dbconn=mysql.createConnection({
	    host     : 'database.codemellow.net', // 3306
	    user     : 'root',
	    password : 'ehowlsus14',
	    database : 'project'
	});
  	break;

  default:
  	dbconn=mysql.createConnection({
	    host     : 'database.codemellow.net', // 3306
	    user     : 'root',
	    password : 'ehowlsus14',
	    database : 'project'
	});
  	break;
}
dbconn.connect();

exports.is_project_exist = function(project_name,callback){
  //dbconn.query("use project");
  dbconn.query("select * from project_info where project_name='"+project_name+"'",function(err,rows,cols){
    if(err) throw err;
    if(rows.length==0){
     callback(false);
    }else{
      callback(true);
    }
  });
};
exports.insert_new_project = function(project_name,username,project_discription,date){
  //dbconn.query("use project");
  dbconn.query("insert into project_info (project_name,project_maintatiner,project_discription,create_date) values ('"+project_name+"','"+username+"','"+project_discription+"','"+date+"')")
};
