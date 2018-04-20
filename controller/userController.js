var user = require('../model/user');
var bcrypt = require('bcrypt');
var userfun = {};
var showall = function (req, res) {
    user.User.findAll().then(users => {
        res.render('home', { data: users });
    });
}
/*
login
*/

var login = function (req, res) {
    if (req.method == 'POST') {
        let email = req.body.email;
        let password = req.body.pwd;
        user.User.findOne({ where: { email: email } }).then(users => {
            let hash = users.password;
            bcrypt.compare(password, hash, function (err, result) {
                console.log(err);
                if (result) {
                    // Passwords match
                    res.redirect('/');
                } else {
                    // Passwords don't match
                    res.render('login', { msg: "password incorrect" });
                }
            });
        }).catch((err)=>{
            res.render('login', { msg: "email not found" });
        });


    }
    else {
        res.render('login');
    }
}
/*
handle the add user
*/

var add = function (req, res) {
    if (req.method == 'POST') {
        console.log(req.body.fname);
        let hash = bcrypt.hashSync(req.body.pwd, 10);
        
        user.User.create({ first_name: req.body.fname, last_name: req.body.lname, email: req.body.email, password: hash }).then(task => {
            // you can now access the newly created task via the variable task
            res.redirect('/');
        }).catch(() => {
            res.render('add', { msg: "failure" });
        });

    }
    else {
        res.render('add');
    }

}

/*
handle the Edit user
*/

var edit = function (req, res) {
    id = req.params.id;
    if (req.method == 'POST') {
        console.log(req.body.fname);
        user.User.update({ first_name: req.body.fname, last_name: req.body.lname, email: req.body.email, password: req.body.pwd }, { where: { id: 25 } }).then(user => {
            // you can now access the newly created task via the variable task
           // res.render('edit', { msg: "edited",data :user });
           res.redirect('/');
        }).catch(() => {
            res.render('edit', { msg: "failure" });
        });

    }
    else {

        user.User.findOne({ where: { id: id } }).then(user => {
            res.render('edit', { data: user });


        })

    }

}
/*
delete
*/
var del = function(req,res)
{ 
    id = req.params.id;
    user.User.destroy({ where: { id: id } }).then((result)=>{
    res.redirect('/');
    });

}
userfun.showall = showall;
userfun.add = add;
userfun.edit = edit;
userfun.delete = del;
userfun.login = login;
module.exports = userfun;