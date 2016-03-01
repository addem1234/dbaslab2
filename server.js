var express    = require('express');
var bodyParser = require('body-parser');
var pg         = require('pg');
var squel      = require('squel');
var nunjucks   = require('nunjucks');
var fs         = require('fs');

var config     = require('./config');

var app        = express();

nunjucks.configure('views', {
  watch: true,  
  autoescape: true,
  express: app
});

var client = new pg.Client(config.conString);
client.connect(function(err) {
  if(err) console.log('Failed to connect to database', err);
  else    console.log('Database connection successful');
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/js/main.js', function(req, res) {
  res.sendFile(__dirname + '/js/main.js');
});


app.post('/course', function(req, res) {
  console.log(req.body);
  var query = squel
      .select('*')
      .from('course')
      .toString()
  console.log(query);
  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.send(result.rows);
    console.log(result.rows);
  })
});

app.post('/recitation', function(req, res) {
  console.log(req.body);
  var query = squel
      .select('*')
      .from('recitation')
      .where('cid=' + req.body.cid)
      .toString()
  console.log(query);
  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.send(result.rows);
    console.log(result.rows);
  })
});

app.post('/assignments', function(req, res) {
  console.log(req.body);
  var query = squel
      .select('assign, max')
      .from('solution')
      .where('rid=' + req.body.rid)
      .toString();
  console.log(query);
  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.send(result.rows);
    console.log(result.rows);
  })
});

app.post('/solve', function(req, res) {
  var body = req.body;
      /*{
        rid: 2,
        name: "erik",
        track: "a",
        u1: 1,
        u2: 3,
        u3: 2
      }*/

  var nameQuery = squel
    .select('sid')
      .from('student')
      .where('sname = ?', body.name)
    .toString()

  var ptsQuery = squel
    .select('assign, min')
      .from('solution')
      .where('rid = ?', body.rid)
    .toString()

  client.query(nameQuery, function(err, result) {
    if(err) res.send("didnt find name");
    else if (result.rowCount > 0) {
      var sid = result.rows[0].sid
      client.query(ptsQuery, function(err, result) {
        if(err) res.send(err)
        else if(result.rowCount > 0) {
          var points = 0;
          for(var i in result.rows) {
            var row = result.rows[i];
            if(body[row.assign] >= row.min)
              points += 1;
          }
          console.log(points);
          var query = squel.insert()
            .into("solved")
              .set("rid", body.rid)
              .set("sid", sid)
              .set("track", body.track)
              .set("points", points)
              .set("called", false)
            .toString();

          client.query(query, function(err, result) {
            if (err) res.send(err);
            else res.send('This is how many points you got: ' + points);
          });
        }
        else {
          console.log("Couldnt find assignments");
        }
      })
    }
    else {
      res.send("Didnt find name");
    }
  });

});

app.post('/call', function(req, res) {
  var query = squel
    .update()
      .table("students")
      .set("called", true)
      .where("slnid = slnid AND sid = sid")
    .toString()
  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.send("Student called successfully.");
  });
});

app.listen(config.PORT);
console.log('Listening on port', config.PORT);
