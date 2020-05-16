const express = require('express');
const router = express.Router();

const RecompensaModel = require('../model/RecompensaModel');
const authMiddleware =  require('../middleware/auth');

router.get('/:estabelecimentoId', async (req, res) => {

    try {
        let estabelecimentoId = req.params.estabelecimentoId;
        let e = await RecompensaModel.ObterRecompensasPorEstabelecimento(estabelecimentoId);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.post('/', async (req, res) => {

    try {
        let recompensa = req.body;
        let r = await RecompensaModel.CriarRecompensa(recompensa);

        return res.status(200).send(r);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.put('/', async (req, res) => {

    try {
    
        let recompensa =  req.body;
    
        let u = await RecompensaModel.AtualizarRecompensa(recompensa);

        return res.status(200).send(u);

    } catch (e) {
        
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
    }
});

module.exports = app => app.use('/api/recompensa', router);
