
#########mapping repo-user#########


MATCH (dev:user {name:"simdj"}), (repository:repo {name:"simdj/pintos"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);

MATCH (dev:user {name:"simdj"}), (repository:repo {name:"simdj/os"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);

MATCH (dev:user {name:"simdj"}), (repository:repo {name:"simdj/goorm"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);


MATCH (dev:user {name:"pcs"}), (repository:repo {name:"pcs/pintos"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);

MATCH (dev:user {name:"pcs"}), (repository:repo {name:"pcs/elastic"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);


MATCH (dev:user {name:"bbu"}), (repository:repo {name:"bbu/purdue"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);

MATCH (dev:user {name:"bbu"}), (repository:repo {name:"bbu/soma"})
CREATE UNIQUE (dev)-[:PARTICIPATE_IN]->(repository);




MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user1"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user2"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user3"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user5"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos1"}), (d:user {name:"user7"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);





MATCH (r:repo {name:"bbu/pintos2"}), (d:user {name:"user1"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos2"}), (d:user {name:"user3"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos2"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos2"}), (d:user {name:"user9"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);




MATCH (r:repo {name:"bbu/pintos3"}), (d:user {name:"user2"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos3"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos3"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos3"}), (d:user {name:"user8"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);






MATCH (r:repo {name:"bbu/pintos4"}), (d:user {name:"user3"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos4"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos4"}), (d:user {name:"user9"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos4"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);





MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user2"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user5"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user7"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user8"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos5"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);





MATCH (r:repo {name:"bbu/pintos6"}), (d:user {name:"user5"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos6"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos6"}), (d:user {name:"user8"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos6"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);






MATCH (r:repo {name:"bbu/pintos7"}), (d:user {name:"user3"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos7"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos7"}), (d:user {name:"user5"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos7"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos7"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);





MATCH (r:repo {name:"bbu/pintos8"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos8"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);






MATCH (r:repo {name:"bbu/pintos9"}), (d:user {name:"user4"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos9"}), (d:user {name:"user7"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos9"}), (d:user {name:"user8"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos9"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);





MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user1"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user2"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user6"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user7"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user9"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);

MATCH (r:repo {name:"bbu/pintos10"}), (d:user {name:"user10"})
CREATE UNIQUE (d)-[:PARTICIPATE_IN]->(r);
















#########similar user by share repo

## user,repo -> other user

MATCH (me:user)-[:PARTICIPATE_IN]->(r:repo)<-[share_edge:PARTICIPATE_IN]-(other:user)
WHERE me.name='user1'
return other.name, share_edge, count(share_edge)
ORDER BY count(share_edge) DESC;

## same with above

MATCH (start:user)-[:PARTICIPATE_IN]->(repo)<-[:PARTICIPATE_IN]-(result:user)
WHERE start.name='user1'
RETURN result.name,  count(result)
ORDER BY count(result) DESC;





MATCH (a:user {name:'simdj'})-[:PARTICIPATE_IN]->(b)
return a,b






