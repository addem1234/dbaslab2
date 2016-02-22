DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS recitation;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS takes;
DROP TABLE IF EXISTS solved;

CREATE TABLE students(
	sid 	BIGSERIAL PRIMARY KEY,
	name 	varchar(20)	
);

CREATE TABLE solutions(
	slnid	BIGSERIAL PRIMARY KEY,
	rid	int,
	points	int,
	u1	int,
	u2	int,
	u3	int
);

CREATE TABLE recitation(
	rid 	BIGSERIAL PRIMARY KEY,
	cid	int
);

CREATE TABLE course(
	cid	BIGSERIAL PRIMARY KEY,
	name	varchar(10)
);

CREATE TABLE takes (
	sid	BIGSERIAL,
	cid	BIGSERIAL
);

CREATE TABLE solved (
	slnid	BIGSERIAL,
	sid 	BIGSERIAL,
	called	boolean,
	track	char(1),
	u1	int,
	u2	int,
	u3	int
);


INSERT INTO course(name) VALUES ('DD1337');
INSERT INTO course(name) VALUES ('Envarre');


INSERT INTO recitation(cid) VALUES (1);
INSERT INTO recitation(cid) VALUES (1);
INSERT INTO recitation(cid) VALUES (2);
INSERT INTO recitation(cid) VALUES (2);


INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (1,1,1,0,0);
INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (1,1,0,1,0);

INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (2,2,1,1,0);
INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (2,1,0,0,1);

INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (3,3,1,1,1);
INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (3,2,0,1,1);

INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (4,1,0,0,1);
INSERT INTO solutions(rid,points,u1,u2,u3) VALUES (4,2,1,1,0);

SELECT * FROM solutions NATURAL JOIN recitation NATURAL JOIN course WHERE name = 'Envarre';