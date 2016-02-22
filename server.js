var express    = require('express');
var bodyParser = require('body-parser');
var pg         = require('pg');
var squel      = require('squel');

var app        = express();
var PORT       = process.env.PORT || 8000;
var conString  = process.env.POSTGRES_URL;
console.log(conString);
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) console.log('Failed to connect to database', err);
  else    console.log('Database connection successful');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/solve', function(req, res) {
  var body = res.body;

  var query = squel
    .insert()
      .into('solved')
      .set('slnid',  body.slnid)
      .set('sid',    body.sid)
      .set('called', false)
      .set('track',  body.track)
      .set('u1',     body.u1)
      .set('u2',     body.u2)
      .set('u2',     body.u2)
      .set('u3',     body.u3)
    .toString()

  client.query(query, function(err, result) {
    if(err) res.send(err);
    else    res.send('Solution submitted successfully.');
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

app.get('/', function(req, res) {

});

app.listen(PORT);
console.log('Listening on port', PORT);
