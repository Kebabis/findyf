//aqui ficam as SQLs que cadastram, buscam, editam e excluem dados da tabela usuário
function usuarioBanco(conexao){
    this._conexao=conexao;
  }
  
  usuarioBanco.prototype.salvar = function(dados,callback){
    this._conexao.query('insert into usuarios set ?',dados,callback);
  }
  
  usuarioBanco.prototype.buscarGeral = function(callback){
    this._conexao.query('SELECT * FROM perfil',callback);
  }

  usuarioBanco.prototype.login = function(callback){
    this._conexao.query('SELECT * FROM usuarios WHERE ?',callback);
  }
  
  usuarioBanco.prototype.buscarNome = function(nome,callback){
    var parametro = nome.nomeBusca;
    this._conexao.query('SELECT * FROM usuario WHERE nome = ?',parametro,callback);
  }
  
  usuarioBanco.prototype.deletar = function(id,callback){
    this._conexao.query('DELETE * FROM usuario WHERE id = ?',id,callback);
  }
  module.exports = function(){
    return usuarioBanco;
  }
  