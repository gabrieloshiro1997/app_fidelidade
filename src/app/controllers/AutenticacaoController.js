const express = require('express');
const router = express.Router();

const AutenticacaoModel = require('../model/AutenticacaoModel.js');

router.post('/', async (req, res) => {
    try {
        let usuario = req.body;
    
        let u = await AutenticacaoModel.AutenticarUsuario(usuario);
        
        return res.status(200).send(u);
    } catch (e) {
        
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.post('/estabelecimento', async (req, res) => {
    try {
        let estabelecimento = req.body;
    
        let e = await AutenticacaoModel.AutenticarEstabelecimento(estabelecimento);
        
        return res.status(200).send(e);
    } catch (e) {
        
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/autenticacao', router);