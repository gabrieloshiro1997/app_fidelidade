const express = require('express');
const router = express.Router();

const DashBoardModel = require('../model/DashBoardModel.js');

router.get('/:estabelecimentoId', async (req, res) => {
    try {
        let estabelecimentoId = req.params.estabelecimentoId;
        let dados = await DashBoardModel.ObterDadosDashBoard(estabelecimentoId);
        
        return res.status(200).send(dados);
    } catch (e) {
        
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/dashboard', router);