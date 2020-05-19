const express = require('express');
const router = express.Router();

const RecompensaModel = require('../model/RecompensaModel');
const authMiddleware =  require('../middleware/auth');

router.get('/estabelecimento/:estabelecimentoId', async (req, res) => {

    try {
        let estabelecimentoId = req.params.estabelecimentoId;
        let e = await RecompensaModel.ObterRecompensasPorEstabelecimento(estabelecimentoId);

        return res.status(200).send(e);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.get('/:recompensaId', async (req, res) => {

    try {
        let recompensaId = req.params.recompensaId;
        let e = await RecompensaModel.ObterRecompensaPorId(recompensaId);

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

router.delete('/:id', async (req, res) => {

    try {
        
        let id = req.params.id;
        
        await RecompensaModel.DeletarRecompensa(id);

        return res.status(204).end();
    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.put('/ativar/:idRecompensa', async(req, res) => {

	try {
		let idRecompensa = req.params.idRecompensa;

		await RecompensaModel.AtivarRecompensa(idRecompensa);

		return res.status(201).end();
	} catch (e) {

		return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
	}
})

router.put('/inativar/:idRecompensa', async(req, res) => {

	try {
		let idRecompensa = req.params.idRecompensa;

		await RecompensaModel.InativarRecompensa(idRecompensa);

		return res.status(201).end();
	} catch (e) {

		return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
	}
})

module.exports = app => app.use('/api/recompensa', router);
