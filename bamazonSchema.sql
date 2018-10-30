DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50inch OLED TV", "Electronics", 1500, 1000),
("PS4 PRO", "Electronics", 500, 400),
("2018 Macbook Pro", "Electronics", 2400, 500),
("Hiking Backpack", "Luggage", 100, 200),
("Dark Knight Trilogy", "Entertainment", 50, 100),
("LG Sound Bar", "Electronics", 200, 500),
("Google Home", "Electronics", 150, 200),
("Alexa", "Electronics", 150, 200),
("Uniball Pens", "Office", 30, 500),
("White T-shirts", "Clothing", 30, 500);