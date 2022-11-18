create database geolocalization;
use geolocalization;

drop table Usuario;

create table Usuario (
id int primary key auto_increment,
nome varchar (50),
email varchar (50),
tel varchar (50),
senha varchar (50)
);

select * from Usuario;