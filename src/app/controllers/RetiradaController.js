const express = require('express');
const router = express.Router();

const RetiradaModel = require('../model/RetiradaModel');
const authMiddleware =  require('../middleware/auth');
router.use(authMiddleware);

router.get('/historico/:estabelecimentoId', async (req, res) => {

    try {
        let estabelecimentoId = req.params.estabelecimentoId;
        let e = await RetiradaModel.ObterRecompensasPorEstabelecimento(estabelecimentoId);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});


router.post('/', async (req, res) => {

    try {
        let recompensa = req.body;
        let r = await RetiradaModel.RetirarRecompensa(recompensa);

        return res.status(200).send(r);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/retirada', router);
