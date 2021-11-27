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
