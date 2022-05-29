create database progetto;
use progetto;

create table users(
   id integer primary key auto_increment,
   username varchar(250) not null unique,
   nome varchar(250) not null,
   cognome varchar(250) not null,
   email varchar(250) not null unique,
   password varchar(250) not null,
   url_img varchar(500) not null,
   genere varchar(250) not null,
   n_anime integer default 0
)engine = 'innodb';

create table lista_anime(
   anilist_id integer not null primary key,
   nome varchar(250) not null,
   url_img varchar(500) not null,
   user integer not null,
   index idx_m(user),
   foreign key (user) references users(id) on delete cascade
)engine = 'innodb';

DELIMITER //
CREATE TRIGGER anime_trigger
AFTER INSERT ON lista_anime
FOR EACH ROW
BEGIN
UPDATE users 
SET n_anime = n_anime + 1
WHERE id = new.user;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER delete_anime
AFTER DELETE ON lista_anime
FOR EACH ROW
BEGIN
UPDATE users 
SET n_anime = n_anime - 1
WHERE id = old.user;
END //
DELIMITER ;





