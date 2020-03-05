const mysql = require('mysql');
const dbConfig = require('./config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect(error => {
    if (error) throw error;
    console.log("Conexão com o banco de dados realizada com sucesso!");
  });
  
module.exports = connection;