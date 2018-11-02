DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    product_sales INT default 0,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50inch OLED TV", "Electronics", 1500, 50),
("PS4 PRO", "Electronics", 500, 25),
("2018 Macbook Pro", "Electronics", 2400, 75),
("Hiking Backpack", "Luggage", 100, 80),
("Dark Knight Trilogy", "Entertainment", 50, 100),
("LG Sound Bar", "Electronics", 200, 50),
("Google Home", "Electronics", 150, 20),
("Alexa", "Electronics", 150, 60),
("Uniball Pens", "Office", 30, 25),
("White T-shirts", "Clothing", 30, 3);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT default 0,
    PRIMARY KEY (department_id)npm i console.table
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 1100), 
("Luggage", 550), 
("Office", 2500),
("Clothing", 800), 
("Entertainment", 1200);