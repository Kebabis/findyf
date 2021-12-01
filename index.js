var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var login = false;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


var load = require('express-load')
load('db').into(app)
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
var dados;
var ide;
 


app.get('/',function(req,res){
  res.render('home.ejs',{'login':login,'resultado':dados})
})

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
app.get('/esqueci',function(req,res){
  res.render('esqueci.ejs')
})

app.get('/animais',function(req,res){
  res.render('animais.ejs',{'login':login,'resultado':dados})
})
app.get('/sobre',function(req,res){
  console.log(dados)
  res.render('sobre.ejs',{'login':login,'resultado':dados})
})
app.get('/login',function(req,res){
  res.render('login.ejs',{'erro':false})
})
app.get('/cadastro',function(req,res){
  res.render('cadastro.ejs',{'login':login,'resultado':dados})
})
app.get('/adotar',function(req,res){
  var conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.queroadotar(function(erro,sucesso){
    if(erro) console.log(erro)
    else{
      var foda = sucesso
      var sla = parseInt(foda[0].dono)
      console.log(sla)
      usuario.buscaid(sla,function(erro,sucess){
        if(erro) console.log(erro)
        else{
          var fodac = sucess
          console.log(sucess)
          res.render('adotar.ejs',{'login':login,'resultado': foda, 'usuario':dados,'dono':sucess})
        }
      })

    }
  })
})
app.get('/info/:id',function(req,res){
  var conexao= app.db.conexao(); id = req.params.id;
  usuario = new app.db.banco(conexao)
  usuario.buscaidani(id,function(erro,sucesso){
    if(erro) console.log(erro)
    else{
      var foda = sucesso
      var sla = parseInt(foda[0].dono)
      console.log(sla)
      usuario.buscaid(sla,function(erro,sucess){
        if(erro) console.log(erro)
        else{
          var fodac = sucess
          console.log(sucess)
          res.render('info.ejs',{'login':login,'resultado': foda, 'usuario':dados,'dono':sucess})
        }
      })

    }
  })
})
app.get('/doar',function(req,res){
  res.render('doar.ejs',{'login':login,'resultado':dados})
})
app.get('/perfil/:id',function(req,res){
  var id = req.params.id; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.buscaid(id,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      dados=sucesso
      res.render('perfil.ejs',{"resultado": sucesso})
    }
  })
})
app.get('/publicados',function(req,res){
  res.render('publicados.ejs',{'login':login,'resultado':dados})
})
app.get('/publicar',function(req,res){
  
  if(login == true){
  res.render('publicar.ejs',{'login':login,'resultado':dados})
}
else{
  res.render('cadastro.ejs')
}})

app.post('/canimal',upload.any(),(req,res)=>{
  var dados = req.body; conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  dados.dono = ide
  usuario.salvaranimal(dados,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      res.render('adotar.ejs',{'login':login,'resultado':sucesso})
      }
      })
    })
  
app.get('/verperfil/:id',function(req,res){
 var id = req.params.id; var conexao = app.db.conexao();
  usuario = new app.db.banco(conexao);
  usuario.buscaid(id,function(erro,sucesso){
    if(erro){
      console.log(erro)
    }
    else{
      app.locals.dados=sucesso
      usuario.buscawhere(id,function(erro,sucess){
        if(erro) console.log(erro)
        else{
          console.log(sucess)
          res.render('verperfil.ejs',{"resultado": sucesso,'login':login,'animais':sucess})
        }
      })
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
    if(dados.nome === '' || dados.email === '' || dados.telefone === '' || dados.estado === '' || dados.cidade === '' || dados.senha === ''){
      res.render('cadastro.ejs',{'erro': true})
    }
    else{
      res.redirect('/login')
          }
        }
      )
      }
  )

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
        login = true;
        dados = sucesso;
        ide = sucesso[0].id;
        res.render('home.ejs',{'resultado': sucesso, 'login': login})
      }
    }
  })
})
const porta=3000
app.listen(porta,function(){
  console.log('ta foda')
})