var user = require('../model/user');
var userfun = {};
var showall = function (req, res) {
    user.User.findAll().then(users => {
        res.render('home', { data: users });
    });
}

/*
handle the add user
*/

var add = function (req, res) {
    if (req.method == 'POST') {
        console.log(req.body.fname);
        user.User.create({ first_name: req.body.fname, last_name: req.body.lname, email: req.body.email, password: req.body.pwd }).then(task => {
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
module.exports = userfun;