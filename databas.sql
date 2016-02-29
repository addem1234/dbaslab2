DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS solution;
DROP TABLE IF EXISTS recitation;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS takes;
DROP TABLE IF EXISTS solved;

CREATE TABLE student(
	sid 	BIGSERIAL PRIMARY KEY,
	sname 	varchar(20)
);

CREATE TABLE course(
	cid	    BIGSERIAL PRIMARY KEY,
	cname	varchar(10)
);

CREATE TABLE solution(
	slnid	BIGSERIAL PRIMARY KEY,
	rid	    int,
	points	int,
	u1	    int,
	u2  	int,
	u3	    int
);

CREATE TABLE recitation(
	rid 	BIGSERIAL PRIMARY KEY,
	cid	    int
);

CREATE TABLE takes (
	sid	    BIGSERIAL,
	cid	    BIGSERIAL
);

CREATE TABLE solved (
	slnid	BIGSERIAL,
	sid 	BIGSERIAL,
	called	boolean,
	track	char(1),
	u1	    int,
	u2	    int,
	u3	    int
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


INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,3,3,2,5);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,1,3,0,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,1,0,2,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,1,0,0,5);

INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,3,1,1,3);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (2,1,1,0,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (2,1,0,1,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (2,1,0,0,3);

INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,3,2,2,2);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (3,1,2,0,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (3,1,0,2,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (3,1,0,0,2);

INSERT INTO solution(rid,points,u1,u2,u3) VALUES (1,3,1,1,1);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (4,1,1,0,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (4,1,0,1,0);
INSERT INTO solution(rid,points,u1,u2,u3) VALUES (4,1,0,0,1);


INSERT INTO solved(slnid,sid,called,track,u1,u2,u3) VALUES (3,1,false,'A',1,1,1);
INSERT INTO solved(slnid,sid,called,track,u1,u2,u3) VALUES (4,1,false,'C',1,1,0);

INSERT INTO solved(slnid,sid,called,track,u1,u2,u3) VALUES (1,2,false,'B',1,0,0);
INSERT INTO solved(slnid,sid,called,track,u1,u2,u3) VALUES (2,2,false,'B',1,1,0);

--SELECT * FROM solution NATURAL JOIN recitation NATURAL JOIN course WHERE name = 'DD1337';
--SELECT * FROM course NATURAL JOIN takes NATURAL JOIN student ORDER BY cid ASC;