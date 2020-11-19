const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas:perguntas
        });
    });
});

app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

app.post("/salvarperguntas",(req,res)=>{
    //Pegando os valores do formulario 
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
})

//Encontrando perguntas pelo seu ID
app.get("/pergunta/:id", (req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta:pergunta
            });
        } else{
            res.redirect("/");
        }
    })
})

app.listen(8080,()=>{
    console.log("Servidor rodando!");
})