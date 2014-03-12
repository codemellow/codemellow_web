drop database project;
create database project;

use project;

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

#--project_name indexing because one project has many issues
create table issues(
	issue_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	issue_content varchar(200),
	INDEX(project_id(4))
);


#--project_name indexing because one project has many commits
create table commits(
	commit_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	commit_content varchar(200),
	INDEX(project_id(4))
);

#--project_name indexing because one project has many commits
create table contributors(
	contributor_id int(10) unsigned not null auto_increment primary key,
	project_id int(10) unsigned not null,
	contributor_name varchar(50),
	INDEX(project_id(4))
);
