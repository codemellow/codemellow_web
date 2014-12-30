var mysql_handler = require('../mysql_handler/mysql_handler');


var create_data={};
create_data.release_version='1.2';
create_data.repository_name='simdj/pintos'
create_data.reviewer_name='bbu'
create_data.review_comment='wow fantastic baby';

exports.create = function(req, res){
	var params=req.query || req.body;

	var release_version=params.release_version  || '' ;
	var repository_name=params.repository_name || '' ;
	var reviewer_name=params.reviewer_name || '' ;
	var review_comment=params.review_comment || '' ;

	var param_arr=[];
	param_arr.push(release_version);
	param_arr.push(repository_name);
	param_arr.push(reviewer_name);
	param_arr.push(review_comment);


	// var qs=" INSERT INTO cm_review(release_id, reviewer_id , review_comment)"
	// +" SELECT * FROM "
	// +" (	"
	// +	" SELECT release_id"
	//  +   " FROM cm_repository_release "
	//   +  " WHERE release_version=?"
	//    +   " AND cm_repository_release.commit_id IN ("
	//     +    " SELECT commit_id "
	//      +   " FROM cm_commit "
	//       +  " WHERE repository_id = ("
	//        +   " SELECT repository_id"
	//        +   " FROM cm_repository "
	//        +   " WHERE repository_name = ?"
	//        + " )"
	//       +" ) "
	// +" ) release_info,"
	// +" (	"
	// +	" SELECT user_id FROM cm_user WHERE user_name=?"
	// +" ) user_info, "
	// +" (SELECT ?) review_comment"
	// +" ;"

	var get_repo_id="SELECT repository_id FROM cm_repository WHERE repository_name=?";
	var get_commit_id="SELECT commit_id FROM cm_commit WHERE repository_id=("+get_repo_id+")";
	var get_release_id="SELECT release_id FROM cm_repository_release "
	+"WHERE release_version=? AND cm_repository_release.commit_id IN ("+get_commit_id+")"

	var get_reviewer_id="SELECT user_id FROM cm_user WHERE user_name=?";
	var get_review_comment="SELECT ?"


	var qs="INSERT INTO cm_review (release_id, reviewer_id, review_comment) "
	+"SELECT * FROM ("+get_release_id+") release_info, ("+get_reviewer_id+") user_info, ("+get_review_comment+") review_comment"



	//db connect start
	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err){
		if(err){
			console.log('review create err', err);
			res.json(false);
		}else{
			res.json(true);
		}
		dbconn=null;
		//db connect end
	});


}



var read_data={}
read_data.repository_name='simdj/pintos';
read_data.release_version='1.2';


exports.read = function(req, res){

	var params=req.query || req.body;

	var release_version=params.release_version  || '' ;
	var repository_name=params.repository_name || '' ;

	var param_arr=[];
	param_arr.push(release_version);
	param_arr.push(repository_name);



	var get_repo_id=" SELECT repository_id FROM cm_repository WHERE repository_name=? "
	var get_commit_id=" SELECT commit_id FROM cm_commit WHERE repository_id IN ( "+get_repo_id+" ) "

	var get_release_id="  SELECT release_id FROM cm_repository_release WHERE  "
	+" release_version=?"
	+" AND cm_repository_release.commit_id IN ( "+get_commit_id+" )";


	var get_review=" SELECT * FROM cm_review WHERE release_id=( "+get_release_id+" ) ";

	var qs=get_review;

	
	//db connect start
	var dbconn=mysql_handler.get_dbconn();
	dbconn.query(qs, param_arr, function(err,data){
		if(err){
			console.log('review create err', err);
			res.json(false);
		}else{
			res.json(data);
		}
		dbconn=null;
		//db connect end
	});



}

exports.update = function(req, res){
	res.end();
}

exports.delete = function(req, res){
	res.end();
	
}