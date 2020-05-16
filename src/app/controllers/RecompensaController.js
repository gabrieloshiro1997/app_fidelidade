const express = require('express');
const router = express.Router();

const RecompensaModel = require('../model/RecompensaModel');
const authMiddleware =  require('../middleware/auth');

router.get('/:estabelecimentoId', async (req, res) => {

    try {
        let estabelecimentoId = req.params.estabelecimentoId;
        let e = await RecompensaModel.ObterRecompensas(estabelecimentoId);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/recompensa', router);
