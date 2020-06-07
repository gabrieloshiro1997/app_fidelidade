const express = require('express');
const router = express.Router();

const PontuacaoModel = require('../model/PontuacaoModel');
const authMiddleware =  require('../middleware/auth');
router.use(authMiddleware);

router.get('/:userId', async (req, res) => {

    try {
        let recompensaId = req.params.recompensaId;
        // @ts-ignore
        let e = await PontuacaoModel.ObterRecompensaPorId(recompensaId);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});


router.post('/', async (req, res) => {

    try {
        // @ts-ignore
        let estabelecimentoId = req.userId;
        let pontuacao = req.body;
        let r = await PontuacaoModel.CriarPontuacao(pontuacao,estabelecimentoId);

        return res.status(200).send(r);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/pontuacao', router);
