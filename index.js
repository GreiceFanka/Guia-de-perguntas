const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//Database teste de conexão
connection.authenticate()
.then(()=>{
    console.log('Conexão realizada!')
}).catch((error)=>{
    console.log('erro ao conectar')
})

//Estou dizendo para o express usar EJS 
app.set('view engine', 'ejs');
//Usar arquivos estáticos
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res) =>{

    res.render("index",{
    });
})

app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

app.post("/salvarperguntas",(req,res)=>{
    //Pegando os valores do formulario 
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("Formulário recebido!");
})

app.listen(8080,()=>{
    console.log("Servidor rodando!");
})