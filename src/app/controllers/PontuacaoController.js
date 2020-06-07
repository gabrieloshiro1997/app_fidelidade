const express = require('express');
const router = express.Router();

const PontuacaoModel = require('../model/PontuacaoModel');
const authMiddleware =  require('../middleware/auth');
router.use(authMiddleware);

router.get('/usuario/', async (req, res) => {

    try {
        // @ts-ignore
        let listaPontuacao = await PontuacaoModel.ObterPontuacaoCliente(req.userId);

        return res.status(200).send(listaPontuacao);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.get('/estabelecimento/', async (req, res) => {

    try {
        // @ts-ignore
        let listaPontuacao = await PontuacaoModel.ObterPontuacaoEstabelecimento(req.userId);

        return res.status(200).send(listaPontuacao);

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
