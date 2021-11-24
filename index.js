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

app.get('/animais',function(req,res){
  res.render('animais.ejs')
})
app.get('/sobre',function(req,res){
  res.render('sobre.ejs')
})
app.get('/login',function(req,res){
  res.render('login.ejs')
})
app.get('/cadastro',function(req,res){
  res.render('cadastro.ejs')
})
app.get('/adotar',function(req,res){
  res.render('adotar.ejs')
})
app.get('/info',function(req,res){
  res.render('info.ejs')
})
app.get('/doar',function(req,res){
  res.render('doar.ejs')
})
app.get('/perfil',function(req,res){
  res.render('perfil.ejs')
})
app.get('/publicados',function(req,res){
  res.render('publicados.ejs')
})
app.get('/publicar',function(req,res){
  if(login == true){
  res.render('publicar.ejs')
}
else{
  res.render('cadastro.ejs')
}})
app.get

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
  console.log('ta foda')
})