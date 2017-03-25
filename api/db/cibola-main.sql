-- 1. Create database
-- CREATE DATABASE db_cibola; 
USE db_cibola;

-- 2. Drop/Create tables
DROP TABLE IF EXISTS tbl_finds;
DROP TABLE IF EXISTS tbl_sites;

CREATE TABLE tbl_sites (
	SID INT NOT NULL AUTO_INCREMENT,
    site_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (SID)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE tbl_finds (
	FID INT NOT NULL AUTO_INCREMENT,
	find_id VARCHAR(20) NOT NULL, -- ex. ZUNI123, client-facing
    SID INT NOT NULL,
    date_collected DATETIME NOT NULL,
	PRIMARY KEY (FID),
    FOREIGN KEY (SID) REFERENCES tbl_sites(SID)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

INSERT INTO tbl_sites (site_name) VALUES
	('Zuni'),
    ('Chaco'),
    ('Mesa Verde'),
    ('Clearwater');
    
INSERT INTO tbl_finds (find_id, SID, date_collected) VALUES
	('20161220-10', 1, NOW()),
    ('20161229-12', 1, NOW()),
    ('20161229-11', 2, NOW()),
    ('20161230-33', 3, NOW()),
    ('20161231-14', 2, NOW());

-- Dashboard View
CREATE OR REPLACE VIEW vw_dashboard_finds AS
SELECT f.find_id, s.site_name, f.date_collected
FROM tbl_finds AS f
INNER JOIN tbl_sites s
ON f.SID = s.SID;