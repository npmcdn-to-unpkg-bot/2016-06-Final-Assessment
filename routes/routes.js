var User = require('../models/user.js');
var path = require('path');
var fs = require('fs');
var request = require('request');
var unirest = require('unirest');


//login get
module.exports.loginform = function(req, res) {
  res.render('login');
}

module.exports.index = function(req, res) {
  res.render('index');
}

// signup get
module.exports.signupform = function(req, res) {
  res.render('signup');
}

module.exports.getgiphy = function(req, res) {
    url = 'http://api.giphy.com/v1/gifs/search';
    params = {q: 'cat', limit: 10, api_key: "dc6zaTOxFJmzC"}
    unirest.get(url)
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send(params)
      .end(function (response) {
        console.log(response.body);
  });
}

module.exports.savegiphy = function(req, res) {
  console.log("In savegiphy");
  
  var DATA_FILE = './saved/data.json';
  fs.readFile(DATA_FILE, function(err, data) {
    console.log("In savegiphy readFile callback");
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var giphys = JSON.parse(data);
    console.log("giphys: " + JSON.stringify(giphys));
    var newgiphy = req.body;
    console.log("newgiphy: " + JSON.stringify(newgiphy));
    giphys.push(newgiphy);
    fs.writeFile(DATA_FILE, JSON.stringify(giphys), function(err) {
      console.log("In savegiphy writeFile callback");
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(giphys);
    });  // end for writeFile
  });  // end for readFile
}

module.exports.signup = function (req, res) {
  console.log("In the signup handler" + JSON.stringify(req.body));
  var username = req.body.email;
  var password = req.body.password;
  var userObj = { 'username': username, 'password': password };
  console.log("userObj: " + JSON.stringify(userObj));
  var newUser = new User(userObj);
  console.log("newUser: " + newUser);
  User.findOne({'username': req.body.email}, function(err, user) {
      console.log("In the findOne callback")
      if (!user) {
        console.log("User not found")
        newUser.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("User saved!!");
              res.redirect('/');
            }
        });
      } else {
        console.log('User already exists');
        res.redirect('/signup');
      }
    });
}

module.exports.login =  function(req, res) {
  console.log("In login post method");
  var username = req.body.email;
  var password = req.body.password;
  var userObj = {username: username}
  var user = new User(userObj)
  User.findOne(userObj, function (err, user) {
    if (!user) {
      console.log("Did not find user: ")
      res.redirect('/login');
    } else {
      console.log("Found user: ", JSON.stringify(user))
      res.redirect('/');
    }
  });
};