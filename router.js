
var user = require('./controller/userController');


// Routes
module.exports = function (app) {
    //console.log(session);
    // Main Routes
    app.get('/login', user.login);
    app.post('/login', user.login);
    app.get('/contact', user.contact);
    app.post('/contact', user.contact);
    app.use(function (req, res, next) {
        if(typeof req.session.uid !== "undefined"){
            app.get('/', user.showall);
            next();
        }
        else {
            res.redirect('/login');
        }
        

    });
    app.get('/', user.showall);
    app.get('/add', user.add);
    app.post('/add', user.add);
    app.post('/edit', user.edit);
    app.get('/edit/:id', user.edit);
    app.get('/delete/:id', user.delete);
    app.get('/logout',user.logout);
   
}