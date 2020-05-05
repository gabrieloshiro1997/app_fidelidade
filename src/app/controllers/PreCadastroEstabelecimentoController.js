const express = require('express');
const router = express.Router();

const EstabelecimentoModel = require('../model/EstabelecimentoModel');

router.post('/', async (req, res) => {
    
    try {
        
        let estabelecimento = req.body;
    
        let e = await EstabelecimentoModel.CriarEstabelecimento(estabelecimento);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/preCadastroEstabelecimento', router);