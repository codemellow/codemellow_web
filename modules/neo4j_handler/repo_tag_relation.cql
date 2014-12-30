


#########mapping repo-tag#########


#######language

MATCH (r:repo {name:"simdj/pintos"}), (t:tag {name:'c'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"pcs/pintos"}), (t:tag {name:'c'})
CREATE (r)-[:TAGGED_BY]->(t);



MATCH (r:repo {name:"simdj/goorm"}), (t:tag {name:'node.js'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"pcs/elastic"}), (t:tag {name:'node.js'})
CREATE (r)-[:TAGGED_BY]->(t);


######project field

MATCH (r:repo {name:"simdj/os"}), (t:tag {name:'OS'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"simdj/pintos"}), (t:tag {name:'OS'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"pcs/pintos"}), (t:tag {name:'OS'})
CREATE (r)-[:TAGGED_BY]->(t);

## arbitary

MATCH (r:repo {name:"bbu/pintos1"}), (t:tag {name:'tag1'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos1"}), (t:tag {name:'tag3'})
CREATE (r)-[:TAGGED_BY]->(t);



MATCH (r:repo {name:"bbu/pintos2"}), (t:tag {name:'tag1'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos2"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos2"}), (t:tag {name:'tag3'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos2"}), (t:tag {name:'tag5'})
CREATE (r)-[:TAGGED_BY]->(t);



MATCH (r:repo {name:"bbu/pintos3"}), (t:tag {name:'tag1'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos3"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos3"}), (t:tag {name:'tag7'})
CREATE (r)-[:TAGGED_BY]->(t);



MATCH (r:repo {name:"bbu/pintos4"}), (t:tag {name:'tag5'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos4"}), (t:tag {name:'tag6'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos4"}), (t:tag {name:'tag7'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos4"}), (t:tag {name:'tag8'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos4"}), (t:tag {name:'tag9'})
CREATE (r)-[:TAGGED_BY]->(t);






MATCH (r:repo {name:"bbu/pintos5"}), (t:tag {name:'tag1'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos5"}), (t:tag {name:'tag3'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos5"}), (t:tag {name:'tag5'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos5"}), (t:tag {name:'tag7'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos5"}), (t:tag {name:'tag9'})
CREATE (r)-[:TAGGED_BY]->(t);




MATCH (r:repo {name:"bbu/pintos6"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos6"}), (t:tag {name:'tag4'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos6"}), (t:tag {name:'tag6'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos6"}), (t:tag {name:'tag8'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos6"}), (t:tag {name:'tag10'})
CREATE (r)-[:TAGGED_BY]->(t);






MATCH (r:repo {name:"bbu/pintos7"}), (t:tag {name:'tag1'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos7"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos7"}), (t:tag {name:'tag3'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos7"}), (t:tag {name:'tag4'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos7"}), (t:tag {name:'tag5'})
CREATE (r)-[:TAGGED_BY]->(t);




MATCH (r:repo {name:"bbu/pintos8"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos8"}), (t:tag {name:'tag4'})
CREATE (r)-[:TAGGED_BY]->(t);




MATCH (r:repo {name:"bbu/pintos9"}), (t:tag {name:'tag2'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos9"}), (t:tag {name:'tag4'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos9"}), (t:tag {name:'tag10'})
CREATE (r)-[:TAGGED_BY]->(t);








MATCH (r:repo {name:"bbu/pintos10"}), (t:tag {name:'tag3'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos10"}), (t:tag {name:'tag4'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos10"}), (t:tag {name:'tag5'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos10"}), (t:tag {name:'tag6'})
CREATE (r)-[:TAGGED_BY]->(t);

MATCH (r:repo {name:"bbu/pintos10"}), (t:tag {name:'tag9'})
CREATE (r)-[:TAGGED_BY]->(t);













MATCH (a)-[:TAGGED_BY]->(b)
return a,b










##### similar project  by tag


## repo, tag   -> other repo

MATCH (start:repo)-[:TAGGED_BY]->(t:tag)<-[:TAGGED_BY]-(result:repo)
WHERE start.name='bbu/pintos1'
return t, result;







## repo -> repo.name ,how many share same tag   

MATCH (start:repo)-[:TAGGED_BY]->(t:tag)<-[:TAGGED_BY]-(result:repo)
WHERE start.name='bbu/pintos1'
RETURN result.name,  count(result)
ORDER BY count(result) DESC;












