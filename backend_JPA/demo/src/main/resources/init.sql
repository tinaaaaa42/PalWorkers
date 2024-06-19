# may be needed
# create database palworkers;
use palworkers;

# create  type_enum AS ENUM("kanban","weekly","daily");
DROP TABLE IF EXISTS weekly_tasks;
DROP TABLE IF EXISTS kanban_tasks;
DROP TABLE IF EXISTS daily_tasks;
DROP TABLE IF EXISTS task_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS team_tasks_anticipater;
DROP TABLE IF EXISTS team_tasks_leader;
DROP TABLE IF EXISTS project_task_group;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS user_auth;
DROP TABLE IF EXISTS team_member;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users;

create table teams(
                      team_id int auto_increment not null primary key,
    name varchar(60) not null,
    invitation_code char(6) unique
);

create table users
(
    user_id int auto_increment
        primary key ,
    username varchar(30) not null ,
    email_addr varchar(30) not null ,
    avatar varchar(60) not null ,
    notes varchar(255) not null
);

# create table leader(
#     id int auto_increment primary key ,
#   team_id int not null ,
#
# );

create table team_member(
  id int auto_increment primary key ,
  team_id int not null ,
    user_id int not null ,
    leader boolean not null,
    foreign key (user_id) references users(user_id),
    foreign key (team_id) references teams(team_id)
);

create table user_auth
(
    auth_id int auto_increment primary key ,
    user_id int not null ,
    password_hash varchar(255) not null ,
    foreign key (user_id) references users(user_id)
);


CREATE TABLE tasks (
                       task_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int ,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       create_date DATE NOT NULL,
                       due_date DATE,
                    completed_date DATE,
                       type ENUM('kanban','weekly','daily') NOT NULL,
    team_id int,
    completed boolean not null default false,
    expired BOOLEAN NOT NULL DEFAULT FALSE,
    due_time TIME,
    foreign key (user_id) references users(user_id),
    foreign key (team_id) references teams(team_id)
);

create table team_tasks_anticipater(
  id int auto_increment primary key ,
  task_id int not null ,
  anticipater_id int not null ,
  foreign key (task_id) references tasks(task_id),
    foreign key (anticipater_id) references users(user_id)
);

create table team_tasks_leader(
                                       id int auto_increment primary key ,
                                       task_id int not null ,
                                       leader_id int not null ,
                                       foreign key (task_id) references tasks(task_id),
                                       foreign key (leader_id) references users(user_id)
);

CREATE TABLE tags (
                      tag_id int AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL
);

CREATE TABLE task_tags (
    pair_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                           task_id int NOT NULL,
                           tag_id int NOT NULL,
#                            PRIMARY KEY (task_id, tag_id),
                           FOREIGN KEY (task_id) REFERENCES tasks(task_id),
                           FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE kanban_tasks (
    kanban_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id int NOT NULL ,
                              state VARCHAR(255) NOT NULL,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

CREATE TABLE weekly_tasks (
    weekly_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id int,
                              urgent BOOLEAN NOT NULL,
                              important BOOLEAN NOT NULL,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

CREATE TABLE daily_tasks (
                              daily_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              task_id int,
                              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);


CREATE TABLE projects(
    project_id int not null primary key auto_increment,
    title varchar(100),
    total int,
    state varchar(100),
    done int,
    user_id int,
    team_id int,
    foreign key (user_id) references users(user_id),
    foreign key (team_id) references teams(team_id)
);

CREATE TABLE project_task_group(
    project_task_group_id int not null primary key auto_increment,
    task_id int,
    project_id int,
    foreign key (task_id) references tasks(task_id),
    foreign key (project_id) references projects(project_id)
)