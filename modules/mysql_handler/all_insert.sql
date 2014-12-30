

INSERT INTO cm_user(user_id, user_type, user_email, user_name, user_passwd) VALUES 
(1, "INDIVIDUAL", "simdj58@gmail.com", "simdj", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(2, "INDIVIDUAL", "dudbstjr70@gmail.com", "Aol", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(3, "INDIVIDUAL", "felp2024@gmail.com", "KimKardasian", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(4, "INDIVIDUAL", "bebe@gmail.com", "ChrisBrown", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(5, "INDIVIDUAL", "test1@gmail.com", "ParkChunSeong", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(6, "INDIVIDUAL", "test2@gmail.com", "JustinBeiber", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(7, "INDIVIDUAL", "test3@gmail.com", "Django", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(8, "INDIVIDUAL", "test4@gmail.com", "Javana", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(9, "INDIVIDUAL", "test5@gmail.com", "William", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),
(10, "INDIVIDUAL", "test6@gmail.com", "ElasticSearch", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" ),

(100, "INDIVIDUAL", "testtest@gmail.com", "testtest", "¹÷á¨g:ëþ¬Å\ZÌRûHju¥~¬eÂdr" );



INSERT INTO cm_user_verification(user_id, verification_key, is_verified) VALUES
(1, '1',1),
(2, '1',1),
(3, '1',1),
(4, '1',1),
(5, '1',1),
(6, '1',1),
(7, '1',1),
(8, '1',1),
(9, '1',1),
(10, '1',1),
(100, '1', 1);






INSERT INTO cm_user_additional_info (user_id, paypal_id) VALUES
(1,   'tlaehdwls1@naver.com'),
(2,   'tlaehdwls2@naver.com'),
(3,   'tlaehdwls3@naver.com'),
(4,   'tlaehdwls4@naver.com'),
(5,   'tlaehdwls5@naver.com'),
(6,   'tlaehdwls6@naver.com'),
(7,   'tlaehdwls7@naver.com'),
(8,   'tlaehdwls8@naver.com'),
(9,   'tlaehdwls9@naver.com'),
(10,  'tlaehdwls10@naver.com');






INSERT INTO cm_repository
(repository_id, repository_name, maintainer_id, 
  repository_description, create_date, review_point, repository_like_count)
VALUES 
(10, "simdj/pintos", 1, "sibong sibong", "2014-03-02", 3.5, 10),

(11, "yys/graph", 2, "sibong sibong", "2014-03-02", 4.5, 100),
(12, "KaKaotick/KaKaoTicktock", 3, "KaKaoTicktock is chatting application.", "2014-03-01", 2.0, 5),
(13, "BaeBeon/Areweshare", 4, "Areweshare is audio opensource.", "2014-02-02", 2.0, 50),
(14, "simdj/data_mining", 1, "sibong sibong", "2014-02-22", 2.5, 43),
(15, "yys/pintos6", 2, "sibong sibong", "2014-04-13", 1.5, 13),

(16, "simdj/pintos7", 1, "sibong sibong", "2014-05-31", 0.5, 33),
(17, "pcs/pintos8", 2, "sibong sibong", "2014-03-30", 1.5, 23),
(18, "pcs/pintos 9", 3, "sibong sibong", "2014-03-28", 5.0, 25),
(19, "yys/pintos 10", 1, "sibong sibong", "2014-05-07", 4.0, 36),
(20, "simdj/pintos 11", 2, "sibong sibong", "2014-04-08", 4.5, 46),

(21, "KimKardasian/MailNodejs", 3, "MailNodejs is a greatest nodejs module. It can send mail to everyone.", "2014-06-05", 4.5, 1000),
(22, "ChrisBrown/AutoChasingBlurring", 4, "AutoChasingBlurring is a greatest Javascript module.", "2014-05-16", 3.5, 24),
(23, "JustinBeiber/MailServer", 6, "MailServer is a greatest nodejs module. It can send mail to everyone.", "2014-05-7", 2.5, 13),
(24, "ParkChunSeong/WebChat", 5, "WebChat is a greatest nodejs module. It can chat with everyone.", "2014-03-10", 4.0, 12),
(25, "ElasticSearch/ElasticSearch", 10, "ElasticSearch is elastic projects. It is amazing.", "2014-03-22", 5.0, 32),

(26, "Django/Django", 7, "Django is greatest framework. With python it can make everythings.", "2014-06-20", 4.5, 345),
(27, "William/Codemellow", 9, "Mellow your code, Better our software.", "2014-03-12", 3.0, 2562),
(28, "Javana/WebCam", 8, "WebCam is a greatest nodejs module. It can chat with everyone.", "2014-04-13", 2.0, 234),
(29, "Aol/PlayManager", 2, "PlayManager can make you playing others very easy.", "2014-05-15", 2.5, 123),
(30, "Apploo13/AppleJuice", 1, "AppleJuice is like a juice, it makes your code more sweet.", "2014-03-15", 3.5, 45);


INSERT INTO cm_language(language_name) VALUES 
("Java"),
("C"),
("Ruby"),
("Python"),
("C++"),
("C#"),
("Android"),
("Smalltalk"),
("NodeJS"),
("PHP");


INSERT INTO cm_repository_language(repository_id, language_id) VALUES
(10, 1),
(11, 2),
(12, 3),
(13, 4),
(14, 5),
(15, 6),
(16, 7),
(17, 8),
(18, 9),
(19, 10),
(20, 10),
(21, 9),
(22, 7),
(23, 6),
(24, 8),
(25, 5),
(26, 4),
(27, 3),
(28, 2),
(29, 1),
(30, 5);


INSERT INTO cm_deal( repository_id, buyer_id, buyer_name, seller_id, price, expiration_date, purpose, status, seller_comment) VALUES 
( 21, 2, 'yys', 1, 10, "2016-07-30", "simdj : sibong", 'DENIED', 'seller_comment : kkkkkk'),
( 24, 3, 'pcs', 1, 30, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 25, 4, 'bb', 1, 40, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 21, 5, 'felp', 1, 50, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 29, 6, 't1', 1, 60, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk'),
( 28, 7, 't2', 1, 70, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk'),



( 22, 3, 'pcs', 2, 3, "2016-07-30", "yys sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 23, 4, 'bb', 2, 4, "2016-07-30", "yys sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 23, 5, 'felp', 2, 5, "2016-07-30", "yys sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 24, 6, 't1', 2, 6, "2016-07-30", "yys sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 22, 7, 't2', 2, 7, "2016-07-30", "yys sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),



( 23, 1, 'simdj', 2, 4, "2016-07-30", "simdj : yys sibong", 'NEGOTIATING', 'seller_comment : okay'),
( 24, 1, 'simdj', 3, 5, "2016-07-30", "simdj : pcs sibong", 'NEGOTIATING', 'seller_comment : siro'),
( 25, 1, 'simdj', 4, 6, "2016-07-30", "simdj : bb sibong", 'CANCELLED', 'seller_comment : kkkkkk'),



( 12, 4, 'bb', 3, 4, "2016-07-30", "gay : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 12, 5, 'felp', 3, 5, "2016-07-30", "gay : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 13, 6, 't1', 3, 6, "2016-07-30", "gay : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 12, 7, 't2', 3, 7, "2016-07-30", "gay : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),


( 26, 2, 'yys', 1, 30, "2016-07-30", "simdj : sibong", 'DENIED', 'seller_comment : kkkkkk'),
( 27, 2, 'yys', 1, 60, "2016-07-30", "simdj : sibong", 'DENIED', 'seller_comment : kkkkkk'),
( 28, 2, 'yys', 1, 13, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 29, 2, 'yys', 1, 16, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk'),
( 14, 2, 'yys', 1, 2, "2016-07-30", "simdj : sibong", 'NEGOTIATING', 'seller_comment : kkkkkk');





INSERT INTO cm_license ( repository_id, authorized_user_id, expiration_date, using_condition ) VALUES
(10, 2, "2018-01-01", "I will use this license in below condition"),
(10, 3, "2018-01-01", "I will use this license in below condition"),
(10, 4, "2018-01-01", "I will use this license in below condition"),
(10, 5, "2018-01-01", "I will use this license in below condition"),
(10, 6, "2018-01-01", "I will use this license in below condition"),
(10, 7, "2018-01-01", "I will use this license in below condition"),
(10, 8, "2018-01-01", "I will use this license in below condition"),
(10, 9, "2018-01-01", "I will use this license in below condition"),

(11, 1, "2018-01-01", "I will use this license in below condition"),
(11, 3, "2018-01-01", "I will use this license in below condition"),
(11, 4, "2018-01-01", "I will use this license in below condition"),
(11, 5, "2018-01-01", "I will use this license in below condition"),
(11, 6, "2018-01-01", "I will use this license in below condition"),
(11, 7, "2018-01-01", "I will use this license in below condition"),
(11, 8, "2018-01-01", "I will use this license in below condition"),
(11, 9, "2018-01-01", "I will use this license in below condition"),

(12, 1, "2018-01-01", "I will use this license in below condition"),
(12, 2, "2018-01-01", "I will use this license in below condition"),
(12, 4, "2018-01-01", "I will use this license in below condition"),
(12, 5, "2018-01-01", "I will use this license in below condition"),
(12, 6, "2018-01-01", "I will use this license in below condition"),

(13, 1, "2018-01-01", "I will use this license in below condition"),
(13, 2, "2018-01-01", "I will use this license in below condition"),
(13, 3, "2018-01-01", "I will use this license in below condition"),
(13, 5, "2018-01-01", "I will use this license in below condition"),
(13, 6, "2018-01-01", "I will use this license in below condition"),

(21, 1, "2018-01-01", "I will use this license in below condition"),
(22, 1, "2012-01-01", "I will use this license in below condition"),
(23, 1, "2011-01-01", "I will use this license in below condition"),
(24, 1, "2013-01-01", "I will use this license in below condition"),
(25, 1, "2014-01-01", "I will use this license in below condition"),


(14, 2, "2018-01-01", "I will use this license in below condition"),
(14, 3, "2018-01-01", "I will use this license in below condition"),
(14, 4, "2018-01-01", "I will use this license in below condition"),
(14, 5, "2018-01-01", "I will use this license in below condition"),
(14, 6, "2018-01-01", "I will use this license in below condition"),
(14, 8, "2018-01-01", "I will use this license in below condition"),
(14, 9, "2018-01-01","");



INSERT INTO cm_repository_like (user_id, repository_id) VALUES
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),

(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),

(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17);





INSERT INTO cm_deal( repository_id, buyer_id, buyer_name, seller_id, price, expiration_date, purpose, status, seller_comment,pay_complete_date) VALUES 
( 10, 2, 'yys', 1, 10, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2013-01-02'),
( 10, 3, 'pcs', 1, 30, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-02-02'),
( 10, 4, 'bb', 1, 40, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-02-02'),
( 10, 5, 'felp', 1, 50, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-02-02'),
( 10, 6, 't1', 1, 60, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk', '2014-02-02'),
( 10, 7, 't2', 1, 70, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk', '2014-02-02'),


( 14, 2, 'yys', 1, 50, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-01-02'),
( 14, 3, 'pcs', 1, 210, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-02-02'),
( 14, 4, 'bb', 1, 20, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-03-02'),
( 14, 5, 'felp', 1, 50, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-04-02'),
( 14, 6, 't1', 1, 20, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk', '2014-05-02'),
( 14, 7, 't2', 1, 90, "2016-07-30", "simdj : sibong", 'CANCELLED', 'seller_comment : kkkkkk', '2014-06-02'),





( 26, 2, 'yys', 1, 30, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-01-02'),
( 27, 2, 'yys', 1, 60, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-02-02'),
( 28, 2, 'yys', 1, 13, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-03-02'),
( 29, 2, 'yys', 1, 16, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-04-02'),
( 14, 2, 'yys', 1, 2, "2016-07-30", "simdj : sibong", 'ACCEPTED', 'seller_comment : kkkkkk', '2014-04-02');



INSERT INTO cm_donate(repository_id, donor_id, donate_amount, donate_pay_key, donate_status) VALUES
(10,1,1000,'aaa', 'COMPLETED'),
(10,2,2000,'aaa', 'COMPLETED'),
(10,3,3000,'aaa', 'COMPLETED'),
(10,4,4000,'aaa', 'COMPLETED'),
(10,5,5000,'aaa', 'COMPLETED'),
(10,6,6000,'aaa', 'COMPLETED'),
(10,7,7000,'aaa', 'COMPLETED'),
(10,8,8000,'aaa', 'COMPLETED'),


(11,1,1000,'aaa', 'COMPLETED'),
(11,2,2000,'aaa', 'COMPLETED'),
(12,3,3000,'aaa', 'COMPLETED'),
(13,4,4000,'aaa', 'COMPLETED'),
(14,5,5000,'aaa', 'COMPLETED'),
(15,6,6000,'aaa', 'COMPLETED'),
(16,7,7000,'aaa', 'COMPLETED'),
(17,8,8000,'aaa', 'COMPLETED'),




(10,9,9000,'aaa', 'COMPLETED');



INSERT INTO cm_contributor (user_id, repository_id, level) VALUES
(1, 11, 2),
(2, 11, 0),
(3, 11, 0),
(4, 11, 0),
(5, 11, 1),
(6, 11, 1),
(7, 11, 0),
(8, 11, 0),
(9, 11, 0),


(1, 12, 1),
(2, 12, 2),
(3, 12, 0),
(4, 12, 0),
(5, 12, 1),
(6, 12, 1),
(7, 12, 0),
(8, 12, 0),
(9, 12, 0),

(1, 13, 0),
(2, 13, 1),
(3, 13, 1),
(4, 13, 0),
(5, 13, 1),
(6, 13, 1),
(7, 13, 0),
(8, 13, 0),
(9, 13, 0);