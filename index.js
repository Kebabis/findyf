var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var load = require('express-load')
load('db').into(app)

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
  res.render('home.ejs')
})

app.get('/adotar',function(req,res){
  res.render('adotar.ejs')
})

app.get('/sobre',function(req,res){
  res.render('sobre.ejs')
})
app.post('/cadastro',function(req,res){
  var dados = req.body; conexao = app.db.conexao();
  usuario = new app.db.usuario(conexao);
  usuario.salvar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
  })
})

const porta=3000
app.listen(porta,function(){
  console.log('ta funcionando')
})