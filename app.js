var express = require('express');
var http = require('http');
var path = require('path');
var ejs  = require('ejs');
var app = express();
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 // send app to router
require('./router')(app,urlencodedParser);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
 
app.use(express.static(path.join(__dirname, 'static')));
 

app.set('port', 1338);

 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))});
