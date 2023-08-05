CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(16) NOT NULL,
    role INT CHECK
    (
        role IN(0, 1, 2)
    )
);

INSERT INTO users (name, password, role)
VALUES
('Admin', 'admin123', 0),
('Teacher', 'teacher123', 1),
('Student', 'student123', 2);

INSERT INTO users (name, password, role)
VALUES
('vikash', 'v12', 1),
('tahir', 't21', 1),
('john', 'j32', 1);

SELECT * FROM users;


CREATE TABLE teacher
(
    name VARCHAR(30) NOT NULL,
    salary NUMERIC(10, 4) NOT NULL,
    qualifications VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL, 
    id INT REFERENCES users
);

INSERT INTO teacher (name, salary, qualifications, address, id)
VALUES
('Anil Kumar', 50000, 'BEd', 'Jadhavwadi', 2),
('Vikash Kumar', 50000, 'MEd', 'Shahu Nagar', 4),
('Tahir Alam', 50000, 'Btech', 'Moshi', 5),
('John Greens', 50000, 'BCA', 'Chikhali', 6);

SELECT * FROM teacher;

CREATE TABLE student
(
    name VARCHAR(30) NOT NULL,
    class VARCHAR(100) NOT NULL,
    school VARCHAR(100),
    dob DATE NOT NULL,
    address VARCHAR(100) NOT NULL, 
    id INT REFERENCES users
);

INSERT INTO student (name, class, school, dob, address, id)
VALUES
('Student', 'MCA', 'PCCOE', '07-04-2000', 'Jadhavwadi', 3);


SELECT * FROM teacher;

CREATE TABLE class
(
    cid SERIAL PRIMARY KEY,
    name VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE subject
(
    sid SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE taught
(
    cid INT REFERENCES class,
    sid INT REFERENCES subject
);

INSERT INTO class (name) VALUES ('V');
INSERT INTO class (name) VALUES ('VI');
INSERT INTO class (name) VALUES ('VII');
INSERT INTO class (name) VALUES ('VIII');
INSERT INTO class (name) VALUES ('IX');
INSERT INTO class (name) VALUES ('X');

INSERT INTO subject (name) VALUES ('English');
INSERT INTO subject (name) VALUES ('Hindi');
INSERT INTO subject (name) VALUES ('Science');
INSERT INTO subject (name) VALUES ('Mathematics');
INSERT INTO subject (name) VALUES ('Social Science');

INSERT INTO taught (cid, sid) VALUES(1, 1);
INSERT INTO taught (cid, sid) VALUES(1, 2);
INSERT INTO taught (cid, sid) VALUES(1, 3);
INSERT INTO taught (cid, sid) VALUES(1, 4);
INSERT INTO taught (cid, sid) VALUES(1, 5);

INSERT INTO taught (cid, sid) VALUES(2, 1);
INSERT INTO taught (cid, sid) VALUES(2, 2);
INSERT INTO taught (cid, sid) VALUES(2, 3);
INSERT INTO taught (cid, sid) VALUES(2, 4);
INSERT INTO taught (cid, sid) VALUES(2, 5);

INSERT INTO taught (cid, sid) VALUES(3, 1);
INSERT INTO taught (cid, sid) VALUES(3, 2);
INSERT INTO taught (cid, sid) VALUES(3, 3);
INSERT INTO taught (cid, sid) VALUES(3, 4);
INSERT INTO taught (cid, sid) VALUES(3, 5);

INSERT INTO taught (cid, sid) VALUES(4, 1);
INSERT INTO taught (cid, sid) VALUES(4, 2);
INSERT INTO taught (cid, sid) VALUES(4, 3);
INSERT INTO taught (cid, sid) VALUES(4, 4);
INSERT INTO taught (cid, sid) VALUES(4, 5);

INSERT INTO taught (cid, sid) VALUES(5, 3);
INSERT INTO taught (cid, sid) VALUES(5, 4);

INSERT INTO taught (cid, sid) VALUES(6, 3);
INSERT INTO taught (cid, sid) VALUES(6, 4);

SELECT c.cid, s.name 
FROM class c, subject s, taught t
WHERE t.cid = c.cid AND t.sid = s.sid;

SELECT s.name 
FROM subject s, taught t
WHERE t.sid = s.sid AND t.cid = $1;


SELECT id, name
FROM student
WHERE class ilike 'VII';

SELECT s.sid, s.name 
FROM class c, subject s, taught t
WHERE t.cid = c.cid AND t.sid = s.sid AND c.name ILIKE 'vii';
