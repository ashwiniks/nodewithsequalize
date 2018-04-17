//Including dependency
var db={};
var Sequelize = require("sequelize");

//Setting up the config
var sequelize = new Sequelize('nodeapp', 'root', '', {
   host: "localhost",
   port: 3306,
   dialect: 'mysql'
});


//Checking connection status
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err) => {
    console.log('Unable to connect to the database:', err);
});

   db.sequelize= sequelize;
   db.Sequelize= Sequelize;
   module.exports=db;