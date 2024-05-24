# may be needed
# create database palworkers
use palworkers;

# create  type_enum AS ENUM("kanban","weekly","daily");
DROP TABLE IF EXISTS weekly_tasks;
DROP TABLE IF EXISTS kanban_tasks;
DROP TABLE IF EXISTS daily_tasks;
DROP TABLE IF EXISTS task_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS user_auth;
DROP TABLE IF EXISTS users;


create table users
(
    user_id int auto_increment
        primary key ,
    username varchar(30) not null ,
    email_addr varchar(30) not null ,
    avatar varchar(60) not null ,
    notes varchar(255) not null
);

create table user_auth
(
    auth_id int auto_increment primary key ,
    user_id int not null ,
    password_hash varchar(255) not null ,
    foreign key (user_id) references users(user_id)
);

CREATE TABLE tasks (
                       task_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id int not null ,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       create_date DATE NOT NULL,
                       due_date DATE,
                       type ENUM('kanban','weekly','daily') NOT NULL,
    foreign key (user_id) references users(user_id)
);

CREATE TABLE tags (
                      tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL
);

CREATE TABLE task_tags (
    pair_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                           task_id BIGINT NOT NULL,
                           tag_id BIGINT NOT NULL,
#                            PRIMARY KEY (task_id, tag_id),
                           FOREIGN KEY (task_id) REFERENCES tasks(task_id),
                           FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE kanban_tasks (
    kanban_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id BIGINT NOT NULL ,
                              state VARCHAR(255) NOT NULL,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

CREATE TABLE weekly_tasks (
    weekly_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id BIGINT,
                              urgent BOOLEAN NOT NULL,
                              important BOOLEAN NOT NULL,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

CREATE TABLE daily_tasks (
                              daily_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id BIGINT,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
)