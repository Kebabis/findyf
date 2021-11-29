<<<<<<< HEAD
var mysql = require('mysql');
function criarConexao(){

  return mysql.createConnection ({
    host:'localhost',
    user: 'root',
    password: 'usbw',
    database: 'tcc_findyf',
    insecureAuth: 'true',
    multipleStatements: 'true'



  });


}

module.exports = function(){
  return criarConexao;
}
=======
var mysql = require('mysql');
function criarConexao(){

  return mysql.createConnection ({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'tcc_findyf',
    insecureAuth: 'true',
    multipleStatements: 'true'



  });


}
module.exports = function(){
  return criarConexao;
}
>>>>>>> 0333db10ba00889b957d4bc1ff617015cdbbf114
