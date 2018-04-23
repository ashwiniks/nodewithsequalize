var express = require('express');
var http = require('http');
var path = require('path');
var ejs  = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({
  secret: "cookie_secret",
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
 // send app to router
require('./router')(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());


app.use(express.static(path.join(__dirname, 'static')));
 

app.set('port', 1338);

 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))});
