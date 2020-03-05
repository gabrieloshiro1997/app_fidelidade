const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

require('../app/controllers/UsuarioController')(server);
require('../app/controllers/AutenticacaoController')(server);

module.exports = server;