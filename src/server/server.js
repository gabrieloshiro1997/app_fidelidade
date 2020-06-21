const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
 
require('../app/controllers/AutenticacaoController')(server);
require('../app/controllers/UsuarioController')(server);
require('../app/controllers/PreCadastroEstabelecimentoController')(server);
require('../app/controllers/EstabelecimentoController')(server);
require('../app/controllers/ClienteController')(server);
require('../app/controllers/RecompensaController')(server);
require('../app/controllers/PontuacaoController')(server);
require('../app/controllers/RetiradaController')(server);
module.exports = server;