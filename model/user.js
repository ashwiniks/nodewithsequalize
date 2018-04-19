var db=require('../config');

var sequelize =db.sequelize;
var Sequelize = db.Sequelize;

const User = sequelize.define('users', {
    id : {type : Sequelize.INTEGER,autoIncrement: true,primaryKey:true},
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password :Sequelize.STRING,
    createdAt : Sequelize.DATE,
    updatedAt : Sequelize.DATE,
  })

  module.exports.User=User;