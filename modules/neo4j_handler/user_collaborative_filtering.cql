






//get simillar list + how share 
MATCH p=( (me:user {user_name:'yys'})-[:PARTICIPATE_IN]->(common:repo)<-[:PARTICIPATE_IN]-(friend:user)  )
RETURN friend.user_name, count(distinct common) AS share_cnt 
ORDER BY count(distinct common) DESC;


//get reco_repo just count
MATCH (me:user {user_name:'simdj'})-[:PARTICIPATE_IN]->(common)<-[:PARTICIPATE_IN]-(others)-[:PARTICIPATE_IN]->(reco_repo)
WHERE NOT(me=others) AND NOT (me -->reco_repo)
RETURN count(*) AS reco_repo_cnt, reco_repo.repository_name AS reco_repo
ORDER BY reco_repo_cnt DESC, reco_repo.repository_name DESC;



//get reco_repo + who reco_repo list 
//MATCH  (me:user {user_name:'simdj'})-[:PARTICIPATE_IN]->(:repo)<-[:PARTICIPATE_IN]-(other:user)-[:PARTICIPATE_IN]->(reco_repo:repo)
//WHERE  NOT (me = other) AND NOT ( me-->(reco_repo) ) 
//RETURN distinct other.user_name AS other, reco_repo.repository_name AS reco_repo
//ORDER BY reco_repo.repository_name ,  other.user_name ;




		//get reco_repo + who reco_repo list + if 2 share, 2 pair show !!!!
		MATCH  (me:user {user_name:'simdj'})-[:PARTICIPATE_IN]->(:repo)<-[:PARTICIPATE_IN]-(other:user)-[:PARTICIPATE_IN]->(reco_repo:repo)
		WHERE  NOT (me = other) AND NOT ( me-->(reco_repo) ) AND other.user_name='silva'
		RETURN other.user_name AS other, reco_repo.repository_name AS reco_repo,  reco.repository_id AS repository_id
		ORDER BY reco_repo.repository_name ,  other.user_name ;



		//input : repo
		//output : reco_repo, share_cnt
		// using common user
		MATCH p=(start:repo{repository_name:'ElasticSearch/ElasticSearch'})<--(:user)-->(reco_repo:repo) 
		RETURN reco_repo.repository_name AS reco ,  reco_repo.repository_id AS repository_id, count(reco_repo) AS share_user_cnt
		ORDER BY share_user_cnt DESC, reco_repo.repository_name;


//input : repo
//output : reco_repo, share_cnt
// using common tag
MATCH p=(start:repo{repository_name:'pintos'})<--(:tag)-->(reco_repo:repo) 
RETURN reco_repo.repository_name AS reco, count(reco_repo) AS share_tag_cnt 
ORDER BY share_tag_cnt DESC, reco_repo.repository_name;





//get reco_repo + who reco_repo list + if 2 share, 2 pair show !!!!
MATCH  p= ( (me:repo{repository_name:'simdj/pintos'})<-[:PARTICIPATE_IN]-(common_user:user)-[:PARTICIPATE_IN]->(reco_repo:repo) )
WHERE  NOT (me = reco_repo) 
RETURN reco_repo.repository_name AS reco_repo, common_user.user_name AS common_user
ORDER BY reco_repo.repository_name ,  common_user.user_name ;
