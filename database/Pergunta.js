const sequelize = require('sequelize');
const connection = require("./database");

//Criando uma tabela utilizando o sequelize
const Pergunta = connection.define('pergunta',{
    titulo:{
        type:sequelize.STRING,
        allownull:false
    },
    descricao:{
     type:sequelize.TEXT,
     allownull:false   
    }
});

Pergunta.sync({force:false}).then(()=>{});
module.exports = Pergunta;