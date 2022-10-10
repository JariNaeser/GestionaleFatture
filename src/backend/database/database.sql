CREATE DATABASE TrackMyFlights;
USE TrackMyFlights;

CREATE USER 'TMF_Admin'@'localhost' IDENTIFIED BY 'cd0dc2d19261fa53a9c75d6daa68bb13d087474bbd9bab55ea9e1072ef9c53f7'; # plain: admin-salt
GRANT SELECT, INSERT, UPDATE, DELETE ON TrackMyFlights.* TO 'TMF_Admin'@'localhost';
FLUSH PRIVILEGES;