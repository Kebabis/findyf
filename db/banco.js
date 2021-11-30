//aqui ficam as SQLs que cadastram, buscam, editam e excluem dados da tabela usuário
function usuarioBanco(conexao){
    this._conexao=conexao;
  }
  
  usuarioBanco.prototype.salvar = function(dados,callback){
    this._conexao.query('insert into usuario set ?',dados,callback);
  }
  
  usuarioBanco.prototype.buscaid = function(parametro, callback){
    this._conexao.query('SELECT * FROM usuario WHERE id = ?',parametro,callback);
  }
  

  usuarioBanco.prototype.queroadotar = function(callback){
    this._conexao.query('SELECT * FROM animal')
  }

usuarioBanco.prototype.salvaranimal = function(dados,callback){
  this._conexao.query('insert into animal set ?',dados,callback)
}


  usuarioBanco.prototype.buscarNome = function(nome,callback){
    var parametro = nome;
    console.log(parametro)
    this._conexao.query('SELECT * FROM usuario WHERE email = ? AND senha = ?',[parametro.email, parametro.senha],callback);
  }
  
  usuarioBanco.prototype.deletar = function(id,callback){
    this._conexao.query('DELETE * FROM usuario WHERE id = ?',id,callback);
  }
  module.exports = function(){
    return usuarioBanco;
  }
  