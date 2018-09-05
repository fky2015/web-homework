create database if not exists `db`; 
use db;
create table if not exists `score`(
    s_name varchar(128),
    s_score double(10,2),
    s_time int(10)
) ;