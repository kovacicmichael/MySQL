DROP DATABASE IF EXISTS greatBay_db;
CREATE DATABASE greatBay_db;

USE greatBay_db;

CREATE TABLE items(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NULL,
  category VARCHAR(45) NULL,
  starting_bid VARCHAR(45) NULL,
  higher_bid VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM greatBay_db

