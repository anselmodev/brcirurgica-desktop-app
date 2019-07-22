const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const ini = require('ini');
const { dialog } = require("electron");

let getIniFile = null;
let dbConn = null;

/* config.ini */ 
const pathIniFile = path.join(__dirname, '../config.ini');

if(fs.existsSync(pathIniFile)) {
  getIniFile = fs.readFileSync(pathIniFile, 'utf-8');
} else {
  dialog.showErrorBox('Erro de Inicialização', `
  Não foi possível encontrar o arquivo "config.ini"!

  Verifique o caminho correto durante o build da aplicação.
  
  FILE: ${pathIniFile}
  `);
}

const config = ini.parse(getIniFile);

const dbCredencials = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    multipleStatements: true
};

const initDb = () => {
  return new Promise((resolve, reject) => {
    if(dbConn === null) {
      dbConn = mysql.createConnection(dbCredencials);
      dbConn.connect(err_conn => {
        if (err_conn) {
          // dialog error
          dialog.showErrorBox('Erro de Conexão com o Banco', `
          Error: ${err_conn}
          
          errno: ${err_conn.errno}
          code: ${err_conn.code}
          syscall: ${err_conn.syscall}
          address: ${err_conn.address}
          port: ${err_conn.port}
          fatal: ${err_conn.fatal}
          `);

          reject({
            errService: 'DB_CONNECION_ERROR',
            message: err_conn
          });
          return false;
        }
        resolve(dbConn);
      })
    } else {
      resolve(dbConn);
    }
  });
};
  
module.exports = initDb;