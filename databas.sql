﻿DROP TABLE student;
DROP TABLE solution;
DROP TABLE recitation;
DROP TABLE course;
DROP TABLE takes;
DROP TABLE solved;

CREATE TABLE student(
	sid 	BIGSERIAL PRIMARY KEY,
	sname 	varchar(20)
);

CREATE TABLE course(
	cid		BIGSERIAL PRIMARY KEY,
	cname	varchar(10)
);

CREATE TABLE solution(
	rid	    int,
	assign	int,
	max	int,	--The amount of subtasks available for the assignment
	min	int	--The amount of subtasks one needs to solve for credit in the assignment
);

/*
	{
		1: ['a', 'b', 'c'],
		2: ['a', 'b', 'c', 'd'],
		3: ['a', 'b']
	}
*/

CREATE TABLE recitation(
	rid 	BIGSERIAL PRIMARY KEY,
	cid		int
);

CREATE TABLE takes (
	sid		BIGSERIAL,
	cid		BIGSERIAL
);

CREATE TABLE solved (
	rid		BIGSERIAL,
	sid 	BIGSERIAL,
	track	char(1),
	points	int,
	called	boolean
);

INSERT INTO student(sname) VALUES ('Erik');
INSERT INTO student(sname) VALUES ('Andreas');


INSERT INTO course(cname) VALUES ('DD1337');
INSERT INTO course(cname) VALUES ('DD1390');


INSERT INTO takes(sid,cid) VALUES (1,1);
INSERT INTO takes(sid,cid) VALUES (1,2);
INSERT INTO takes(sid,cid) VALUES (2,1);
INSERT INTO takes(sid,cid) VALUES (2,2);


INSERT INTO recitation(cid) VALUES (1);
INSERT INTO recitation(cid) VALUES (1);
INSERT INTO recitation(cid) VALUES (2);
INSERT INTO recitation(cid) VALUES (2);


INSERT INTO solution(rid,assign,max,min) VALUES (1,1,4,3);
INSERT INTO solution(rid,assign,max,min) VALUES (1,2,3,2);
INSERT INTO solution(rid,assign,max,min) VALUES (1,3,2,2);

INSERT INTO solution(rid,assign,max,min) VALUES (2,1,3,2);
INSERT INTO solution(rid,assign,max,min) VALUES (2,2,3,2);
INSERT INTO solution(rid,assign,max,min) VALUES (2,3,4,2);

INSERT INTO solution(rid,assign,max,min) VALUES (3,1,2,2);
INSERT INTO solution(rid,assign,max,min) VALUES (3,2,2,2);

INSERT INTO solution(rid,assign,max,min) VALUES (4,1,1,1);
INSERT INTO solution(rid,assign,max,min) VALUES (4,2,1,1);
INSERT INTO solution(rid,assign,max,min) VALUES (4,3,3,2);


INSERT INTO solved(rid,sid,track,points,called) VALUES (3,1,'A',1,false);
INSERT INTO solved(rid,sid,track,points,called) VALUES (4,1,'A',3,false);

INSERT INTO solved(rid,sid,track,points,called) VALUES (1,2,'A',3,false);
INSERT INTO solved(rid,sid,track,points,called) VALUES (2,2,'C',2,false);
INSERT INTO solved(rid,sid,track,points,called) VALUES (4,2,'B',3,false);