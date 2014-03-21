

drop database project;
create database project;

use project;

#drop table project_info;
create table project_info(
	project_id int(10) unsigned not null auto_increment primary key,
	project_name varchar(50) not null unique,
	project_language varchar(50),
	project_maintatiner varchar(50) not null,
	project_discription varchar(100) not null,
	create_date TIMESTAMP not null,
	last_commit_date TIMESTAMP,
	last_author varchar(50),
	commit_count int(10) default 1,
	branch_count int(10) default 0,
	release_count int(10) default 0,
	contributor_count int(10) default 1,
	pull_request_count int(10) default 0,
	issue_count int(10) default 0,
	INDEX(project_name(50))
);


#project_name indexing because one project has many issues
#drop table issues;
create table issues(
	issue_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	issue_content varchar(200),
	INDEX(project_id(4))
);


#project_name indexing because one project has many commits
#drop table commits;
create table commits(
	commit_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	commit_content varchar(200),
	INDEX(project_id(4))
);

#project_name indexing because one project has many commits
#drop table contributors;
create table contributors(
	contributor_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	contributor_name varchar(50),
	INDEX(project_id(4))
);




#########################
# user DB schema	#
# @author Park, Hyun Ha	#
# @created 2014-03-21	#
#########################


BEGIN;
#DROP TABLE `cm_users`;
CREATE TABLE `cm_users` (
  `user_id` int(11) unsigned AUTO_INCREMENT NOT NULL,
  `user_email` varchar(64) NOT NULL,
  `user_passwd` varchar(128) NOT NULL,
  `user_name` varchar(64) NOT NULL,
  `user_nickname` varchar(64) NOT NULL,
  `user_job` varchar(64) NOT NULL,
  `user_sex` char(1) NOT NULL,		#[MFO]
  `user_homepage` varchar(128) NOT NULL,
  `user_recommend_id` int(11) unsigned NOT NULL,
  `user_profile` varchar(255) NOT NULL,
  `user_ip` varchar(255),
  `user_login_ip` varchar(255),
  `user_reg_date` datetime NOT NULL,
  `user_email_die` datetime,		# 'due to' of email auth
  `user_login_date` datetime,
  `user_leave_date` datetime,
  `user_intercept_date` datetime,
  `user_state` char(1) NOT NULL,	# [NLI] Normal, Leaved, Intercepted
  `user_open_level` char(1) NOT NULL,	# [AFC] All, Friend, Close
  `user_range` char(1) NOT NULL,	# [AMDN] All, Market only, Develop only, None of all
  `user_lost_tocken` varchar(255),	# generate when user forgot passwd
  `user_1` varchar(255),		# extend Field 1
  `user_2` varchar(255),		# extend Field 2
  `user_3` varchar(255),		# extend Field 3
  `user_4` varchar(255),		# extend Field 4
  `user_5` varchar(255),		# extend Field 5
  `user_6` varchar(255),		# extend Field 6
  `user_7` varchar(255),		# extend Field 7
  `user_8` varchar(255),		# extend Field 8
  `user_9` varchar(255),		# extend Field 9
  `user_10` varchar(255),		# extend Field 10
  PRIMARY KEY (`user_id`),
  KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#DROP TABLE `cm_user_imgs`;
CREATE TABLE `cm_user_imgs` (
  `cm_user_img_id` int(11) unsigned AUTO_INCREMENT NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `user_img` BLOB(4294967295),
  PRIMARY KEY (`cm_user_img_id`),
  FOREIGN KEY (`user_id`) REFERENCES `cm_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

COMMIT;

