DROP DATABASE IF EXISTS `codemellow`;
CREATE DATABASE IF NOT EXISTS `codemellow`;
use codemellow;

CREATE TABLE IF NOT EXISTS `cm_user` (
  `user_id` INT(11) UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_type` ENUM('INDIVIDUAL', 'COMPANY') NOT NULL DEFAULT 'INDIVIDUAL', # for distinguish company(1) and user (0)
  
  `user_email` VARCHAR(64) NOT NULL,
  `user_name` VARCHAR(64) NOT NULL,
  
  `user_passwd` VARCHAR(256) NOT NULL,

  `user_reg_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  `introduction` VARCHAR(256),
  
  PRIMARY KEY (`user_id`),
  UNIQUE (`user_email`),
  KEY (`user_name`)

) ENGINE=InnoDB CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_user_verification` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `verification_key` VARCHAR(256) NOT NULL,
  `is_verified` BOOLEAN NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE
) ENGINE=InnoDB CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_company` (
  `company_id` INT(11) UNSIGNED  AUTO_INCREMENT NOT NULL,
  `company_name` VARCHAR(64) NOT NULL UNIQUE,
  `country` VARCHAR(64) NOT NULL,
  `location` VARCHAR(64) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `sub_category` VARCHAR(64) NOT NULL,
  `contact_num` VARCHAR(64),
  `representative_phone` VARCHAR(64) NOT NULL,
  `contact_email` VARCHAR(64) NOT NULL,
  `postal_code` VARCHAR(32) NOT NULL,
  `business_registration_number` VARCHAR(64) NOT NULL,
  `homepage` VARCHAR(128),

  PRIMARY KEY(`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_user_company`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `company_id` INT(11) UNSIGNED NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (`company_id`) REFERENCES cm_company(company_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_user_additional_info`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  
  `profile_image_url` VARCHAR(128), 
  `country` VARCHAR(64),
  `location` VARCHAR(64),
  `postal_code` VARCHAR(32),

  `homepage` VARCHAR(128),
  `sns_id` VARCHAR(128),
  `paypal_id` VARCHAR(128),

  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_organization` (
  `organization_id` INT(11) UNSIGNED NOT NULL,
  `organization_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY(`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_language`(
  `language_id` INT(11) UNSIGNED AUTO_INCREMENT NOT NULL,
  `language_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY(`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_interest`(
  `interest_id` INT(11) UNSIGNED AUTO_INCREMENT NOT NULL,
  `interest_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY(`interest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository`(
  `repository_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,

  `repository_name` VARCHAR(64) NOT NULL UNIQUE,
  `maintainer_id` INT(11) UNSIGNED NOT NULL,

  `repository_description` VARCHAR(256) NOT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  
  `last_commit_date` TIMESTAMP,
  `last_commiter` VARCHAR(50),

  `view_count` INT(11) UNSIGNED DEFAULT 0,
  
  `review_point` FLOAT(7,2) NOT NULL DEFAULT 0.0,
  `review_count` INT(11) UNSIGNED DEFAULT 0,

  `thumbnail_url` VARCHAR(128),
  `contribution_total_point` INT(11) UNSIGNED DEFAULT 0,
  `inspector_count` INT(11) UNSIGNED DEFAULT 0,
  `commit_count` INT(11) UNSIGNED DEFAULT 0,
  `branch_count` INT(11) UNSIGNED DEFAULT 0,
  `release_count` INT(11) UNSIGNED DEFAULT 0,
  `contributor_count` INT(11) UNSIGNED DEFAULT 1,
  `pull_request_count` INT(11) UNSIGNED DEFAULT 0,
  `issue_count` INT(11) UNSIGNED DEFAULT 0,
  `repository_like_count` INT(11) UNSIGNED DEFAULT 0,
  `sales_volume` INT(11) UNSIGNED DEFAULT 120,
  `sales_cnt` INT(11) UNSIGNED DEFAULT 10,

  FOREIGN KEY(`maintainer_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  CONSTRAINT REPOSITORY_NAME_CONSTRATION UNIQUE (repository_name),
  KEY(`repository_name`, `maintainer_id`),
  PRIMARY KEY(`repository_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_category`(
  `category_id` INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY(`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository_category`(
  `repository_id` INT(11) UNSIGNED NOT NULL,
  `category_id` INT(3) UNSIGNED NOT NULL,
  FOREIGN KEY(`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY(`category_id`) REFERENCES cm_category(category_id) ON DELETE CASCADE,
  PRIMARY KEY(`repository_id`, `category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cm_user_language`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `language_id` INT(11) UNSIGNED NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (`language_id`) REFERENCES cm_language(language_id) ON DELETE CASCADE,
  PRIMARY KEY(`user_id`, `language_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_user_interest`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `interest_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY(`user_id`, `interest_id`),
  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (`interest_id`) REFERENCES cm_interest(interest_id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository_language`(
  `repository_id` INT(11) UNSIGNED NOT NULL,
  `language_id` INT(11) UNSIGNED NOT NULL,

  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY (`language_id`) REFERENCES cm_language(language_id) ON DELETE CASCADE,
  PRIMARY KEY(`repository_id`, `language_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_follow`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `following_id` INT(11) UNSIGNED NOT NULL,

  PRIMARY KEY(`user_id`, `following_id`),
  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (`following_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_commit`(
  `commit_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,

  `repository_id` INT(11) UNSIGNED NOT NULL,
  `commiter_id` INT(11) UNSIGNED NOT NULL,

  `commit_hash` VARCHAR(64) NOT NULL,
  `create_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  `commit_revision` INT(11) UNSIGNED NOT NULL DEFAULT 0,
  `commit_branch` VARCHAR(64) NOT NULL,
  `commit_log` VARCHAR(256), 
  `seed_point` INT(12) DEFAULT 0,
  `evaluation_point` INT(12) DEFAULT 0,
  `limited_point` INT(12) DEFAULT 0,
  `progress_point` INT(12) DEFAULT 0,

  FOREIGN KEY(`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY(`commiter_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,

  PRIMARY KEY(`commit_id`),
  INDEX (`commit_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository_release`(
  `release_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  
  `commit_id` INT(11) UNSIGNED NOT NULL,

  `release_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  `release_version` VARCHAR(64) NOT NULL,
  `release_comment` VARCHAR(256) NOT NULL,
  `release_readme_url` VARCHAR(256), #ex) /simdj/pintos/1.0.0/

  FOREIGN KEY(`commit_id`) REFERENCES cm_commit(commit_id) ON DELETE CASCADE,
  
  PRIMARY KEY(`release_id`)


) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_contributor`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `repository_id` INT(11) UNSIGNED NOT NULL,
  `contribute_point` INT(15) DEFAULT 0,
  #`role` VARCHAR(16) , # ex) designer, developer
  `level` INT(1) NOT NULL DEFAULT 0,   # ex) 0 : (DEFAULT) contributor 1: inspector 2: maintainer

  FOREIGN KEY(`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY(`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,

  PRIMARY KEY(`user_id`, `repository_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository_like`(
  `user_id` INT(11) UNSIGNED NOT NULL,
  `repository_id` INT(11) UNSIGNED NOT NULL,

  FOREIGN KEY(`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY(`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,

  PRIMARY KEY(`user_id`, `repository_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_repository_evaluation`(
  `evaluation_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,

  `user_id` INT(11) UNSIGNED NOT NULL,
  `repository_id` INT(11) UNSIGNED NOT NULL,

  `evaluation_point` FLOAT(2,1) NOT NULL DEFAULT 0.0,

  FOREIGN KEY(`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY(`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,

  PRIMARY KEY(`evaluation_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cm_commit_evaluation`(
  `evaluation_id` INT(15) UNSIGNED NOT NULL AUTO_INCREMENT,
  
  `commit_id` INT(11) UNSIGNED NOT NULL,
  `evaluator_id` INT(11) UNSIGNED NOT NULL,
  `evaluation_point` INT(12) NOT NULL,
  
  FOREIGN KEY(`commit_id`) REFERENCES cm_commit(commit_id) ON DELETE CASCADE,
  FOREIGN KEY(`evaluator_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,

  PRIMARY KEY(`evaluation_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- CREATE TABLE IF NOT EXISTS `cm_deal`(
--   `deal_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
  
--   `release_id` INT(11) UNSIGNED NOT NULL ,
--   `buyer_id` INT(11) UNSIGNED NOT NULL,
--   `seller_id` INT(11) UNSIGNED NOT NULL,


--   `min_price` INT(11) UNSIGNED NOT NULL DEFAULT 0,


--   `status` ENUM('NEGOTIATING','ACCEPTED', 'DENIED','COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'NEGOTIATING',

--   #This 2 attrs are result which are decided after deal_log
--   `firm_price` INT(11) UNSIGNED,
--   `expiration_date` DATE,

--   `purpose` VARCHAR(250),
--   `explanation` text,

--   `start_date` TIMESTAMP DEFAULT NOW(),

--   FOREIGN KEY (`buyer_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
--   FOREIGN KEY (`seller_id`) REFERENCES cm_user(user_id)ON DELETE CASCADE,
--   FOREIGN KEY (`release_id`) REFERENCES cm_repository_release(release_id) ON DELETE CASCADE,

--   PRIMARY KEY(`deal_id`)

-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cm_deal` (
  `deal_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `repository_id` int(11) unsigned NOT NULL,
  `buyer_id` int(11) unsigned NOT NULL,
  `buyer_name` VARCHAR(64) NOT NULL DEFAULT '',
  `seller_id` int(11) unsigned NOT NULL,
  
  `price` int(11) unsigned DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `purpose` varchar(250) DEFAULT NULL,
  `explanation` text,
  
  `status` enum('NEGOTIATING','ACCEPTED','DENIED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'NEGOTIATING',
  
  `seller_comment` text,
  `pay_complete_date` TIMESTAMP,
  

  FOREIGN KEY (`buyer_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (`seller_id`) REFERENCES cm_user(user_id)ON DELETE CASCADE,
  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,

  PRIMARY KEY (`deal_id`)
  


) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cm_payment`(
  `pay_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT ,
  
  `deal_id` INT(11) UNSIGNED NOT NULL,
  -- `buyer_id` INT(11) UNSIGNED NOT NULL,
  -- `seller_id` INT(11) UNSIGNED NOT NULL,

  -- `repository_id` INT(11) UNSIGNED NOT NULL ,

  -- `trackingId` VARCHAR(100) NOT NULL, # buyer_name+`/`+repository_name
  `pay_url` VARCHAR(250) NOT NULL,
  `pay_key` VARCHAR(64) NOT NULL,
  `pay_amount` INT(11) UNSIGNED NOT NULL,
  `pay_date` TIMESTAMP NOT NULL,
  `status` ENUM('PENDING','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',


  FOREIGN KEY (`deal_id`) REFERENCES cm_deal(deal_id) ON DELETE CASCADE,
  -- FOREIGN KEY (`buyer_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  -- FOREIGN KEY (`seller_id`) REFERENCES cm_user(user_id)ON DELETE CASCADE,
  -- FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,

  PRIMARY KEY(`pay_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `cm_review`(
  `review_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,

  `reviewer_id` INT(11) UNSIGNED NOT NULL,
  `repository_id`  INT(11) UNSIGNED NOT NULL ,

  `create_date` TIMESTAMP NOT NULL DEFAULT NOW(),
  `review_point` FLOAT(2,1) NOT NULL DEFAULT 0.0,
  `review_title` text,
  `review_comment` text,


  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY (`reviewer_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY(`review_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;











CREATE TABLE IF NOT EXISTS `cm_notification` (
    `note_id`     INT(15) UNSIGNED NOT NULL AUTO_INCREMENT, 
    `msg`         text DEFAULT '',
    `receiver_id` INT(11) UNSIGNED NOT NULL,
    `state`       ENUM('CHECKED','UNCHECKED') NOT NULL DEFAULT 'UNCHECKED',
    `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (`receiver_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
    PRIMARY KEY(`note_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `cm_cart` (
    `user_id` INT(11) UNSIGNED NOT NULL,
    `repository_id`  INT(11) UNSIGNED NOT NULL ,
    FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
    PRIMARY KEY (`user_id`,`repository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cm_license` (
  `license_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `repository_id` INT(11) UNSIGNED NOT NULL,
  `authorized_user_id` INT(11) UNSIGNED NOT NULL,


  `using_condition` TEXT DEFAULT '',
  `expiration_date` date DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 

  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY (`authorized_user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY (`license_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `cm_donate` (
  `donate_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  
  `repository_id` INT(11) UNSIGNED NOT NULL,
  `donor_id` INT(11) UNSIGNED NOT NULL,

  `donate_amount` INT(11) UNSIGNED NOT NULL,

  `donate_pay_key` VARCHAR(64) NOT NULL,
  `donate_status` ENUM('PENDING','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',

  `donate_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 

  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY (`donor_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY (`donate_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cm_fork` (
  `fork_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,

  `repository_id` INT(11) UNSIGNED NOT NULL,
  `user_id` INT(11) UNSIGNED NOT NULL,

  `fork_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 

  FOREIGN KEY (`repository_id`) REFERENCES cm_repository(repository_id) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES cm_user(user_id) ON DELETE CASCADE,
  PRIMARY KEY (`fork_id`)
)