const express = require('express');
const router = express.Router();

const EstabelecimentoModel = require('../model/EstabelecimentoModel');
const authMiddleware =  require('../middleware/auth');
const EstabelecimentoService = require('../services/EstabelecimentoService');

router.get('/',authMiddleware, async (req, res) => {
    
    try {
        
        let estabelecimentos = await EstabelecimentoModel.ObterEstabelecimentos();
    
        return res.status(200).send(estabelecimentos);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.put('/aprovar', authMiddleware, async (req, res) => {
	try {

		let idEstabelecimento =  req.body.id;
	
		let e = await EstabelecimentoModel.AprovarEstabelecimento(idEstabelecimento);

        return res.status(200).send(e);

	} catch (e) {
		
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
	}
})

router.put('/reprovar', authMiddleware, async (req, res) => {
	try {

		let idEstabelecimento =  req.body.id;
	
		let e = await EstabelecimentoModel.ReprovarEstabelecimento(idEstabelecimento);

        return res.status(200).send(e);

	} catch (e) {
		
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
	}
});


router.post('/EsqueciMinhaSenha', async (req, res) => {
    try {
        let email = req.body.email;
        const succes = await EstabelecimentoModel.EnviarEmailRedefinirSenha(email);

        return res.status(200).send(succes);
    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.post('/RedefinirSenha', authMiddleware, async (req, res) => {
    try {
		let { email, senha } = req.body;

        const succes = await EstabelecimentoModel.RedefinirSenha(email, senha);

        return res.status(200).send(succes);
    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

module.exports = app => app.use('/api/estabelecimento', router);