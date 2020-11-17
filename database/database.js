const sequelize = require('sequelize');
const connection = new sequelize('guiadeperguntas','root', '12345',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=connection;