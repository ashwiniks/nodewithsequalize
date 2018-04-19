
var user =require('./controller/userController');


// Routes
module.exports = function(app,urlencodedParser){
    
   // Main Routes
    
   app.get('/',user.showall);
   app.get('/add',user.add);
   app.post('/add',urlencodedParser,user.add);
   app.post('/edit',urlencodedParser,user.edit);
   app.get('/edit/:id',user.edit);
   app.get('/delete/:id',user.delete);
   
}