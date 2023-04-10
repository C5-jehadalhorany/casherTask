DROP DATABASE casherTask;

CREATE DATABASE casherTask;

USE casherTask;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions(
    id int auto_increment NOT NULL,
    permission varchar (255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);


CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    productName VARCHAR(255),
    price INT,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE roles_permissions(
    id int auto_increment NOT NULL,
    permission_id INT,
    role_id INT,
    foreign key (role_id) references roles(id),
    foreign key (permission_id) references permissions(id),
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);

CREATE TABLE history(
    id int auto_increment NOT NULL,
    solded varchar(255),
    total varchar(255),
    is_deleted TINYINT DEFAULT 0,
    primary key (id)
);
