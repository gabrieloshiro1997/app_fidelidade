const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
 
require('../app/controllers/UsuarioController')(server);
require('../app/controllers/AutenticacaoController')(server);

module.exports = server;