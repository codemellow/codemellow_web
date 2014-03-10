drop database project;
create database project;

use project;

create table info(
	id int(10) unsigned not null auto_increment primary key,
	project_name varchar(50) not null,
	project_language varchar(50),
	project_maintatiner varchar(50) not null,
	create_date TIMESTAMP not null,
	last_commit_date TIMESTAMP,
	last_author varchar(50),
	commit_count int(10) default 0,
	branch_count int(10) default 0,
	release_count int(10) default 0,
	contributor_count int(10) default 0,
	pull_request_count int(10) default 0,
	issue_count int(10) default 0
);

#--project_name indexing because one project has many issues
create table issues(
	id int(10) unsigned not null auto_increment primary key,
	project_name varchar(50) not null,
	project_language varchar(50),
	project_maintatiner varchar(50) not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	issue varchar(100),
	INDEX(project_name(50))
);


#--project_name indexing because one project has many commits
create table commits(
	id int(10) unsigned not null auto_increment primary key,
	project_name varchar(50) not null,
	project_language varchar(50),
	project_maintatiner varchar(50) not null,
	create_date TIMESTAMP not null,
	author varchar(50),
	commit varchar(100),
	INDEX(project_name(50))
);

#--project_name indexing because one project has many commits
create table contributors(
	id int(10) unsigned not null auto_increment primary key,
	project_name varchar(50) not null,
	project_language varchar(50),
	project_maintatiner varchar(50) not null,
	contributor varchar(50),
	INDEX(project_name(50))
);
