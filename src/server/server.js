const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
 
require('../app/controllers/AutenticacaoController')(server);
require('../app/controllers/UsuarioController')(server);
require('../app/controllers/EstabelecimentoController')(server);
require('../app/controllers/ClienteController')(server);

module.exports = server;