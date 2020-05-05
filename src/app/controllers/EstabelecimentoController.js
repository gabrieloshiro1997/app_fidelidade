const express = require('express');
const router = express.Router();

const EstabelecimentoModel = require('../model/EstabelecimentoModel');
const authMiddleware =  require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    
    try {
        
        let estabelecimentos = await EstabelecimentoModel.ObterEstabelecimentos();
    
        return res.status(200).send(estabelecimentos);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.put('/aprovar', async (req, res) => {
	try {

		let idEstabelecimento =  req.body.id;
	
		let e = await EstabelecimentoModel.AprovarEstabelecimento(idEstabelecimento);

        return res.status(200).send(e);

	} catch (e) {
		
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
	}
})

router.put('/reprovar', async (req, res) => {
	try {

		let idEstabelecimento =  req.body.id;
	
		let e = await EstabelecimentoModel.ReprovarEstabelecimento(idEstabelecimento);

        return res.status(200).send(e);

	} catch (e) {
		
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
	}
});

module.exports = app => app.use('/api/estabelecimento', router);