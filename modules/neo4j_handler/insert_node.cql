//// clean
match ()-[r]-() 
delete r;
match (n)
delete n;

DROP CONSTRAINT ON (t:tag) ASSERT t.tag_name IS UNIQUE;
DROP CONSTRAINT ON (u:user) ASSERT u.user_name IS UNIQUE;
DROP CONSTRAINT ON (r:repo) ASSERT r.repository_name IS UNIQUE;

DROP INDEX ON :repo(repository_name);
DROP INDEX ON :user(user_name);
DROP INDEX ON :tag(tag_name);






// user_collaborative_filtering
CREATE CONSTRAINT ON (t:tag) ASSERT t.tag_name IS UNIQUE;
CREATE CONSTRAINT ON (u:user) ASSERT u.user_name IS UNIQUE;
CREATE CONSTRAINT ON (r:repo) ASSERT r.repository_name IS UNIQUE;

CREATE INDEX ON :repo(repository_name);
CREATE INDEX ON :user(user_name);
CREATE INDEX ON :tag(tag_name);







// create repo node




CREATE (:repo    { repository_id : 10,     	repository_name : "simdj/pintos"});
CREATE (:repo    { repository_id : 11,     	repository_name : "yys/graph"});
CREATE (:repo    { repository_id : 12,     	repository_name : "KaKaotick/KaKaoTicktock"});
CREATE (:repo    { repository_id : 13,     	repository_name : "BaeBeon/Areweshare"});
CREATE (:repo    { repository_id : 14,     	repository_name : "simdj/data_mining"});
CREATE (:repo    { repository_id : 15,     	repository_name : "yys/pintos6"});
CREATE (:repo    { repository_id : 16,     	repository_name : "simdj/pintos7"});
CREATE (:repo    { repository_id : 17,     	repository_name : "pcs/pintos8"});
CREATE (:repo    { repository_id : 18,     	repository_name : "pcs/pintos9"});
CREATE (:repo    { repository_id : 19,     	repository_name : "pcs/pintos10"});
CREATE (:repo    { repository_id : 20,     	repository_name : "simdj/pintos11"});
CREATE (:repo    { repository_id : 21,     	repository_name : "KimKardasian/MailNodejs"});
CREATE (:repo    { repository_id : 22,     	repository_name : "ChrisBrown/AutoChasingBlurring"});
CREATE (:repo    { repository_id : 23,     	repository_name : "JustinBeiber/MailServer"});
CREATE (:repo    { repository_id : 24,     	repository_name : "ParkChunSeong/WebChat"});
CREATE (:repo    { repository_id : 25,     	repository_name : "ElasticSearch/ElasticSearch"});
CREATE (:repo    { repository_id : 26,     	repository_name : "Django/Django"});
CREATE (:repo    { repository_id : 27,     	repository_name : "William/Codemellow"});
CREATE (:repo    { repository_id : 28,     	repository_name : "Javana/WebCam"});
CREATE (:repo    { repository_id : 29,     	repository_name : "Aol/PlayManager"});
CREATE (:repo    { repository_id : 30,     	repository_name : "Apploo13/AppleJuice"});
CREATE (:repo    { repository_id : 31,     	repository_name : "KimKardasian/MailNodejs22222222222"});
CREATE (:repo    { repository_id : 32,     	repository_name : "ChrisBrown/AutoChasingBlurring22222222222"});
CREATE (:repo    { repository_id : 33,     	repository_name : "JustinBeiber/MailServer22222222222"});
CREATE (:repo    { repository_id : 34,     	repository_name : "ParkChunSeong/WebChat22222222222"});
CREATE (:repo    { repository_id : 35,     	repository_name : "ElasticSearch/ElasticSearch22222222222"});
CREATE (:repo    { repository_id : 36,     	repository_name : "Django/Django22222222222"});
CREATE (:repo    { repository_id : 37,     	repository_name : "William/Codemellow22222222222"});
CREATE (:repo    { repository_id : 38,     	repository_name : "Javana/WebCam22222222222"});
CREATE (:repo    { repository_id : 39,     	repository_name : "Aol/PlayManager22222222222"});
CREATE (:repo    { repository_id : 40,     	repository_name : "Apploo13/AppleJuice33333333"});
CREATE (:repo    { repository_id : 41,     	repository_name : "KimKardasian/MailNodejs33333333"});
CREATE (:repo    { repository_id : 42,     	repository_name : "ChrisBrown/AutoChasingBlurring33333333"});
CREATE (:repo    { repository_id : 43,     	repository_name : "JustinBeiber/MailServer33333333"});
CREATE (:repo    { repository_id : 44,     	repository_name : "ParkChunSeong/WebChat33333333"});
CREATE (:repo    { repository_id : 45,     	repository_name : "ElasticSearch/ElasticSearch33333333"});
CREATE (:repo    { repository_id : 46,     	repository_name : "Django/Django33333333"});
CREATE (:repo    { repository_id : 47,     	repository_name : "William/Codemellow33333333"});
CREATE (:repo    { repository_id : 48,     	repository_name : "Javana/WebCam33333333"});
CREATE (:repo    { repository_id : 49,     	repository_name : "Aol/PlayManager33333333"});
CREATE (:repo    { repository_id : 50,     	repository_name : "Apploo13/AppleJuice33333333"});




// create user node 


CREATE (:user 	{	user_id :  1,  			user_name : 	  "simdj"});
CREATE (:user 	{	user_id :  2,  			user_name : 	  "yys"});
CREATE (:user 	{	user_id :  3,  			user_name : 	  "pcs"});
CREATE (:user 	{	user_id :  4,  			user_name : 	  "bbu"});
CREATE (:user 	{	user_id :  5,  			user_name : 	  "ParkChunSeong"});
CREATE (:user 	{	user_id :  6,  			user_name : 	  "JustinBeiber"});
CREATE (:user 	{	user_id :  7,  			user_name : 	  "Django"});
CREATE (:user 	{	user_id :  8,  			user_name : 	  "Javana"});
CREATE (:user 	{	user_id :  9,  			user_name : 	  "William"});
CREATE (:user 	{	user_id : 10, 			user_name : 	  "ElasticSearch"});
CREATE (:user 	{	user_id : 11,  			user_name : 	  "ronaldo"});
CREATE (:user 	{	user_id : 12,  			user_name : 	  "messi"});
CREATE (:user 	{	user_id : 13,  			user_name : 	  "oscar"});
CREATE (:user 	{	user_id : 14,  			user_name : 	  "james"});
CREATE (:user 	{	user_id : 15,  			user_name : 	  "bale"});
CREATE (:user 	{	user_id : 16,  			user_name : 	  "gerrard"});
CREATE (:user 	{	user_id : 17,  			user_name : 	  "rooney"});
CREATE (:user 	{	user_id : 18,  			user_name : 	  "rvp"});
CREATE (:user 	{	user_id : 19,  			user_name : 	  "falcao"});
CREATE (:user 	{	user_id : 20, 			user_name : 	  "neymar"});
CREATE (:user 	{	user_id : 21,  			user_name : 	  "pirlo"});
CREATE (:user 	{	user_id : 22,  			user_name : 	  "balotelli"});
CREATE (:user 	{	user_id : 23,  			user_name : 	  "frank"});
CREATE (:user 	{	user_id : 24,  			user_name : 	  "kroos"});
CREATE (:user 	{	user_id : 25,  			user_name : 	  "zlatan"});
CREATE (:user 	{	user_id : 26,  			user_name : 	  "wellback"});
CREATE (:user 	{	user_id : 27,  			user_name : 	  "chicha"});
CREATE (:user 	{	user_id : 28,  			user_name : 	  "modric"});
CREATE (:user 	{	user_id : 29,  			user_name : 	  "ramos"});
CREATE (:user 	{	user_id : 30, 			user_name : 	  "zidane"});
CREATE (:user 	{	user_id : 31,  			user_name : 	  "santa"});
CREATE (:user 	{	user_id : 32,  			user_name : 	  "pepe"});
CREATE (:user 	{	user_id : 33,  			user_name : 	  "steven"});
CREATE (:user 	{	user_id : 34,  			user_name : 	  "henderson"});
CREATE (:user 	{	user_id : 35,  			user_name : 	  "louis"});
CREATE (:user 	{	user_id : 36,  			user_name : 	  "villa"});
CREATE (:user 	{	user_id : 37,  			user_name : 	  "pedro"});
CREATE (:user 	{	user_id : 38,  			user_name : 	  "silva"});
CREATE (:user 	{	user_id : 39,  			user_name : 	  "nasri"});








// create tag node

CREATE (:tag {name:"c"});
CREATE (:tag {name:"c++"});
CREATE (:tag {name:"java"});
CREATE (:tag {name:"node.js"});
CREATE (:tag {name:"OS"});
CREATE (:tag {name:"search"});
CREATE (:tag {name:"tag1"});
CREATE (:tag {name:"tag2"});
CREATE (:tag {name:"tag3"});
CREATE (:tag {name:"tag4"});
CREATE (:tag {name:"tag5"});
CREATE (:tag {name:"tag6"});
CREATE (:tag {name:"tag7"});
CREATE (:tag {name:"tag8"});
CREATE (:tag {name:"tag9"});
CREATE (:tag {name:"tag10"});






// participating relationship

MATCH (dev:user 	{user_name:"simdj"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"simdj"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"yys"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pcs"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pcs"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pcs"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bbu"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bbu"}), 	(repository:repo {repository_name:"yys/pintos6"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bbu"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bbu"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ParkChunSeong"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ParkChunSeong"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ParkChunSeong"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ParkChunSeong"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"JustinBeiber"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"JustinBeiber"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Django"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Django"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Django"}), 	(repository:repo {repository_name:"yys/pintos6"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Django"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Django"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Javana"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"Javana"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"William"}), 	(repository:repo {repository_name:"yys/pintos6"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"William"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"William"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"William"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ElasticSearch"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"William/Codemellow"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ronaldo"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"messi"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"messi"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"messi"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"messi"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"james"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"james"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"james"}), 	(repository:repo {repository_name:"yys/pintos6"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"james"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"William/Codemellow"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"bale"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"gerrard"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"gerrard"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"gerrard"}), 	(repository:repo {repository_name:"BaeBeon/Areweshare"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"gerrard"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"gerrard"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rooney"}), 	(repository:repo {repository_name:"William/Codemellow"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rooney"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rooney"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rooney"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rooney"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rvp"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"rvp"}), 	(repository:repo {repository_name:"simdj/pintos"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"falcao"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"falcao"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"falcao"}), 	(repository:repo {repository_name:"BaeBeon/Areweshare"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"neymar"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"neymar"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"neymar"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"ParkChunSeong/WebChat"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pirlo"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"balotelli"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"balotelli"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"frank"}), 	(repository:repo {repository_name:"ParkChunSeong/WebChat"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"frank"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"frank"}), 	(repository:repo {repository_name:"BaeBeon/Areweshare"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zlatan"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zlatan"}), 	(repository:repo {repository_name:"Apploo13/AppleJuice"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zlatan"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zlatan"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"wellback"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"wellback"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"wellback"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"wellback"}), 	(repository:repo {repository_name:"ParkChunSeong/WebChat"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"wellback"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"chicha"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"chicha"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"chicha"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"chicha"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"chicha"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ramos"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ramos"}), 	(repository:repo {repository_name:"simdj/pintos"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"ramos"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"ParkChunSeong/WebChat"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"zidane"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"santa"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"santa"}), 	(repository:repo {repository_name:"Javana/WebCam"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"santa"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"santa"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"santa"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pepe"}), 	(repository:repo {repository_name:"yys/graph"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pepe"}), 	(repository:repo {repository_name:"William/Codemellow"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pepe"}), 	(repository:repo {repository_name:"KimKardasian/MailNodejs"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"simdj/pintos"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"ElasticSearch/ElasticSearch"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"ParkChunSeong/WebChat"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"steven"}), 	(repository:repo {repository_name:"simdj/pintos7"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"henderson"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"henderson"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"louis"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"louis"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"villa"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"villa"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"villa"}), 	(repository:repo {repository_name:"BaeBeon/Areweshare"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"villa"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pedro"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pedro"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pedro"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pedro"}), 	(repository:repo {repository_name:"William/Codemellow"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"pedro"}), 	(repository:repo {repository_name:"ChrisBrown/AutoChasingBlurring"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"yys/pintos6"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"simdj/data_mining"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"JustinBeiber/MailServer"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"silva"}), 	(repository:repo {repository_name:"Django/Django"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"nasri"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"nasri"}), 	(repository:repo {repository_name:"pcs/pintos8"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"nasri"}), 	(repository:repo {repository_name:"Aol/PlayManager"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"nasri"}), 	(repository:repo {repository_name:"simdj/pintos 11"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;
MATCH (dev:user 	{user_name:"nasri"}), 	(repository:repo {repository_name:"KaKaotick/KaKaoTicktock"}) 
CREATE (dev)-[:PARTICIPATE_IN]->(repository)
return dev;


