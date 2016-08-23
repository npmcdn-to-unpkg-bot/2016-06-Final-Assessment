var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var routes = require('./routes/routes.js');

var app = express();
var db = mongoose.createConnection('mongodb://localhost:27017/finalAssessment');

// var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));
// app.use('/', express.static('public'));
app.set('views','./client');
app.use('/', express.static(path.join(__dirname, 'client')));
app.set('view engine', 'ejs');
// var routes = require('./routes/routes.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db = mongoose.connect('mongodb://localhost:27017/finalExam3');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/', function(req, res){
  res.render('index')
});
app.get('/login', routes.loginform);
app.get('/signup', routes.signupform);
app.post('/signup', routes.signup);
app.post('/login', routes.login);
app.get('/getgiphy', routes.getgiphy);
app.post('/savegiphy', routes.savegiphy);


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});