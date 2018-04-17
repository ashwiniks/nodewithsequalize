var db=require('./config');

var sequelize =db.sequelize;
var Sequelize = db.Sequelize;

// Routes
module.exports = function(app){
    
   // Main Routes
    
   app.get('/',function(req,res){
    const User = sequelize.define('profile', {
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        }
      });
      
      // force: true will drop the table if it already exists
    /*  User.sync({force: false}).then(() => {
        // Table created
        return User.create({
          firstName: 'John2',
          lastName: 'Hancock'
        });
      });
   }); */
   User.findAll().then(users => {
    res.send(users);
  });

});
}