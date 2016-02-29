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
  var query = squel
    .select('*')
      .from('course')
    .toString();

  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.render('index.html', result);
    console.log(result.rows);
  });
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
      .select('points, u1, u2, u3')
      .from('solution')
      .where('rid=' + req.body.rid)
      .order("points", false)
      .limit(1)
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
  var query = squel
    .insert()
      .into('solved')
      .set('slnid',  body.slnid)
      .set('sid',    body.sid)
      .set('called', false)
      .set('track',  body.track)
      .set('u1',     body.u1)
      .set('u2',     body.u2)
      .set('u3',     body.u3)
    .toString();

  client.query(query, function(err, result) {
    if(err) res.send(err);
    else {
      var validq = squel
        .select('points')
          .from('solutions')
          .where('rid = ?', body.rid)
          .where('u1 <= ?', body.u1)
          .where('u2 <= ?', body.u2)
          .where('u3 <= ?', body.u3)
          .order('points DESC')
          .limit(1)
        .toString();

        client.query(validq, function(err, reslult) {
          var points = 0;

          if(err) res.send(err)
          else if(results.rowCount > 0)
            points = result.rows[0].points

          res.send('This is how many points you got: ', points);
        })
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
