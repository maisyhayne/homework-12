DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;


CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  primary key(id)
);

INSERT INTO departments (name)
value ("Accounting");

INSERT INTO departments (name)
value ("Engineering");

INSERT INTO departments (name)
value ("Social Media");

INSERT INTO departments (name)
value ("Sales");

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title  VARCHAR(30),
  salary  DECIMAL(10,3), 
  department_id  INT,
  primary key(id)
);

INSERT INTO roles (title, salary, department_id)
values ("Accountant",100,1);

INSERT INTO roles (title, salary, department_id)
values ("Salesman",50,4);

INSERT INTO roles (title, salary, department_id)
values ("Engineer",50,2);

INSERT INTO roles (title, salary, department_id)
values ("Influencer",25,3);

CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first VARCHAR(30),
  last VARCHAR(30), 
  role_id INT,
  manager_id INT NULL, 
  primary key(id)
); 

INSERT INTO employees (first, last, role_id)
values ("Bob","Smith",1);

INSERT INTO employees (first, last, role_id)
values ("Joe","Something",2);

INSERT INTO employees (first, last, role_id)
values ("Joe","Something",3);

INSERT INTO employees (first, last, role_id)
values ("Steve","Lastname",4);

INSERT INTO employees (first, last, role_id, manager_id)
values ("Julia","Snow",1,1);

INSERT INTO employees (first, last, role_id, manager_id)
values ("Cathy","Bate",2,2);

INSERT INTO employees (first, last, role_id, manager_id)
values ("Jose","Julio",3,3);

INSERT INTO employees (first, last, role_id, manager_id)
values ("Miquel","Manana",4,4);