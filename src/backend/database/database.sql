CREATE DATABASE GestionaleFatture;
USE GestionaleFatture;

CREATE USER 'GF_Admin'@'localhost' IDENTIFIED BY 'cd0dc2d19261fa53a9c75d6daa68bb13d087474bbd9bab55ea9e1072ef9c53f7'; # plain: admin-salt
GRANT SELECT, INSERT, UPDATE, DELETE ON GestionaleFatture.* TO 'GF_Admin'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE UserType(
	type VARCHAR(14) PRIMARY KEY
);

CREATE TABLE User(
	id INT PRIMARY KEY AUTO_INCREMENT,
	password VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	nome VARCHAR(50) NOT NULL,
	cognome VARCHAR(50) NOT NULL,
	type_userType VARCHAR(14) NOT NULL,
	FOREIGN KEY(type_userType) REFERENCES UserType(type) ON UPDATE CASCADE
);

CREATE TABLE UserToken(
	user_id INT PRIMARY KEY,
	creationDate DATETIME NOT NULL DEFAULT NOW(),
	value VARCHAR(255) NOT NULL,
	FOREIGN KEY(user_id) REFERENCES User(id) ON UPDATE CASCADE
);

CREATE TABLE BankAccount(
	iban VARCHAR(34) PRIMARY KEY,
	holder VARCHAR(255) NOT NULL,
	street VARCHAR(50) NOT NULL,
	streetNumber VARCHAR(50) NOT NULL,
	postalCode INT NOT NULL,
	city VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	bankName VARCHAR(100) NOT NULL,
	swift VARCHAR(100),
	bic VARCHAR(100)
);

CREATE TABLE Company(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	phoneNumber VARCHAR(255) NOT NULL,
	street VARCHAR(50) NOT NULL,
	streetNumber VARCHAR(50) NOT NULL,
	postalCode INT NOT NULL,
	city VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	websiteURL VARCHAR(255),
	iconPath VARCHAR(255)
);

CREATE TABLE PrivatePerson(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	surname VARCHAR(255) NOT NULL,
	phoneNumber VARCHAR(255) NOT NULL,
	street VARCHAR(50) NOT NULL,
	streetNumber VARCHAR(50) NOT NULL,
	postalCode INT NOT NULL,
	city VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	iconPath VARCHAR(255)
);

CREATE TABLE WorksFor(
	company_id INT NOT NULL,
	privatePerson_id INT NOT NULL,
	FOREIGN KEY(company_id) REFERENCES Company(id) ON UPDATE CASCADE,
	FOREIGN KEY(privatePerson_id) REFERENCES PrivatePerson(id) ON UPDATE CASCADE,
	PRIMARY KEY(company_id, privatePerson_id)
);

CREATE TABLE InvoiceStatus(
	name VARCHAR(10) PRIMARY KEY
);

CREATE TABLE Invoice(
	id INT PRIMARY KEY AUTO_INCREMENT,
	creationDate DATETIME NOT NULL DEFAULT NOW(),
	company_id INT,
	privatePerson_id INT,
	bankAccount_iban VARCHAR(34) NOT NULL,
	invoiceStatus_name VARCHAR(10) NOT NULL,
	user_id INT NOT NULL,
	pdfFilename VARCHAR(255),
	description TEXT,
	firstRecallDate DATETIME,
	secondRecallDate DATETIME,
	FOREIGN KEY(company_id) REFERENCES Company(id) ON UPDATE CASCADE,
	FOREIGN KEY(privatePerson_id) REFERENCES PrivatePerson(id) ON UPDATE CASCADE,
	FOREIGN KEY(bankAccount_iban) REFERENCES BankAccount(iban) ON UPDATE CASCADE,
	FOREIGN KEY(invoiceStatus_name) REFERENCES InvoiceStatus(name) ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES User(id) ON UPDATE CASCADE
);

CREATE TABLE TaskType(
	name VARCHAR(255) PRIMARY KEY,
	description TEXT NOT NULL, 
	hourlyCost FLOAT NOT NULL
);

CREATE TABLE InvoiceTask(
	id INT PRIMARY KEY AUTO_INCREMENT,
	description TEXT NOT NULL, 
	hours FLOAT NOT NULL,
	date DATETIME NOT NULL DEFAULT NOW(),
	invoice_id INT NOT NULL,
	taskType_name VARCHAR(255) NOT NULL,
	FOREIGN KEY(invoice_id) REFERENCES Invoice(id) ON UPDATE CASCADE,
	FOREIGN KEY(taskType_name) REFERENCES TaskType(name) ON UPDATE CASCADE
);

INSERT INTO UserType VALUES ("amministratore");
INSERT INTO UserType VALUES ("impiegato");

INSERT INTO InvoiceStatus VALUES ("Da pagare");
INSERT INTO InvoiceStatus VALUES ("In attesa");
INSERT INTO InvoiceStatus VALUES ("Pagato");

INSERT INTO User(password, username, nome, cognome, type_userType) VALUES ("087280357dfdc5a3177e17b7424c7dfb1eab2d08ba3bedeb243dc51d5c18dc88", "jari.naeser", "Jari", "Näser", "amministratore"); #pwd: test-salt

INSERT INTO `GestionaleFatture`.`BankAccount` (`iban`, `holder`, `street`, `streetNumber`, `postalCode`, `city`, `country`, `bankName`, `swift`) VALUES ('CH3909000000615242605', 'Jari Näser', 'Via Mer-Zarei', '12', '6965', 'Cadro', 'Switzerland', 'Postfinance Bank', 'POFICHBEXXX');