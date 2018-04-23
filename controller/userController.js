var user = require('../model/user');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var userfun = {};
var showall = function (req, res) {
    user.User.findAll().then(users => {
        res.render('home', { data: users, name: req.session.email });
    });
}
/*
login
*/

var login = function (req, res) {
    //console.log(req.session);
    if (req.method == 'POST') {
        let email = req.body.email;
        let password = req.body.pwd;
        user.User.findOne({ where: { email: email } }).then(users => {
            let hash = users.password;
            bcrypt.compare(password, hash, function (err, result) {
                console.log(err);
                if (result) {
                    // Passwords match

                    var sessionexp = req.session;
                    sessionexp.uid = users.id;
                    res.redirect('/');
                } else {
                    // Passwords don't match
                    res.render('login', { msg: "password incorrect" });
                }
            });
        }).catch((err) => {
            res.render('login', { msg: "email not found" });
        });


    }
    else {

        //console.log(sessionexp);
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
var del = function (req, res) {
    id = req.params.id;
    user.User.destroy({ where: { id: id } }).then((result) => {
        res.redirect('/');
    });

}

/*
logout 
*/

var logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login');
}


/*
contact us 
*/

var contact = function (req, res) {
    if (req.method == 'POST') {
        let fname = req.body.fname;
        let lname = req.body.lname;
        let email = req.body.email;
        let comment = req.body.comment;
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ashwini.singh@mobileprogramming.net', // Your email id
                pass: 'Reecha@1985' // Your password
            }
        });
        var text = 'Hello world from \n\n' + fname + " " + lname;
        var mailOptions = {
            from: 'ashwini.singh@mobileprogramming.net', // sender address
            to: 'ashwini.jss@gmail.com', // list of receivers
            subject: 'Email Example', // Subject line
            text: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.render("contact", { msg: "oops !!!" });
            } else {
                res.render("contact", { msg: "success !!!" });
            };
        });




    }
    else {
        res.render('contact');
    }
}

userfun.showall = showall;
userfun.add = add;
userfun.edit = edit;
userfun.delete = del;
userfun.login = login;
userfun.logout = logout;
userfun.contact = contact;
module.exports = userfun;