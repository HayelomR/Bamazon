CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quantity INT (100) NOT NULL,
	PRIMARY KEY (item_id)
);

create database departments;
	use departments;
	CREATE TABLE shelf (
		department_id INT NOT NULL AUTO_INCREMENT,
		department_name VARCHAR(500) NOT NULL,
		over_head_costs DECIMAL(10,2) NOT NULL,
		total_sales DECIMAL(10,2) NOT NULL,
		PRIMARY KEY (department_id)
	);