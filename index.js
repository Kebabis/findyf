var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const url = require('url');    
const querystring = require('querystring');    

//Coisas para perguntar pro professor: 
// variavel global
// res.redirect

var load = require('express-load')
load('db').into(app)

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.locals.login = false
app.locals.id = 0

app.get('/',function(req,res){
  res.render('home.ejs',{'login':false})
})

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
app.get('/esqueci',function(req,res){
  res.render('esqueci.ejs')
})

app.get('/animais',function(req,res){
  res.render('animais.ejs')
})
app.get('/sobre',function(req,res){
  res.render('sobre.ejs')
})
app.get('/login',function(req,res){
  res.render('login.ejs',{'erro':false})
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
app.get('/perfil/:id',function(req,res){
  res.render('perfil.ejs')
})
app.get('/publicados',function(req,res){
  res.render('publicados.ejs')
})
app.get('/publicar',function(req,res){
  var login=true;
  if(login == true){
  res.render('publicar.ejs')
}
else{
  res.render('cadastro.ejs')
}})

app.post('/canimal',function(req,res){
  var dados = req.body; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  dados.dono = id;
  usuario.salvaranimal(dados,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      res.render('adotar.ejs',{'resultado': sucesso})
    }
  })
})

app.get('/verperfil/:id',function(req,res){
  var id = req.params.id; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.buscaid(id,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      console.log(sucesso)
      res.render('verperfil.ejs',{"resultado": sucesso})
    }
  })
})

app.post('/ccadastro',function(req,res){
  var dados = req.body; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.salvar(dados,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    res.redirect('/')
  })
})

app.get('/clogin',function(req,res){
  res.redirect('/')
})


app.post('/clogin',function(req,res){
  var dados= req.body; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.buscarNome(dados,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      if(isEmpty(sucesso)){
        res.render('login.ejs',{'erro':true})
      }
      else{
        login = true
        id = sucesso.id
        res.render('home.ejs',{'resultado': sucesso, 'login': true})
      }
    }
  })
})
const porta=3000
app.listen(porta,function(){
  console.log('ta foda')
})