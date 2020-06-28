const express = require('express');
const router = express.Router();

const UsuarioModel = require('../model/UsuarioModel');
const authMiddleware =  require('../middleware/auth');


//lista de usuarios
router.get('/',authMiddleware, async (req, res) => {
    try {
        
        let usuarios = await UsuarioModel.ObterUsuarios();

        return res.status(200).send(usuarios);

    } catch (error) {
        
        return res.status(error.statusCode).send({ statusCode: error.statusCode, message: error.message, error: error.teste });
    }
});
//get usuario by ID
router.get('/:id',authMiddleware, async (req, res) => {
    try {
        let id = req.params.id;
        
        let usuario = await UsuarioModel.ObterUsuario(id);
        
        if(!usuario)
            return res.status(404).send({ statusCode: 404, message: 'Usuário não encontrado' });

        return res.status(200).send(usuario);
    
    } catch (e) {
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

//get usuario by CPF
router.get('/cpf/:cpf',authMiddleware, async (req, res) => {
    try {
        let cpf = req.params.cpf;
        
        let usuario = await UsuarioModel.ObterUsuarioCPF(cpf);
        
        if(!usuario)
            return res.status(404).send({ statusCode: 404, message: 'Usuário não encontrado' });

        return res.status(200).send(usuario);
    
    } catch (e) {
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});


router.post('/', async (req, res) => {
    
    try {
        
        let usuario = req.body;
    
        let u = await UsuarioModel.CriarUsuario(usuario);
        
        return res.status(200).send(u);

    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
});

router.put('/',authMiddleware, async (req, res) => {

    try {
    
        let usuario =  req.body;
    
        let u = await UsuarioModel.AtualizarUsuario(usuario);

        return res.status(200).send(u);

    } catch (e) {
        
        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, e: e.error });
    }
});

router.delete('/:id',authMiddleware, async (req, res) => {

    try {
        
        let id = req.params.id;
        
        await UsuarioModel.DeletarUsuario(id);

        return res.status(204).end();
    } catch (e) {

        return res.status(e.statusCode).send({ statusCode: e.statusCode, message: e.message, error: e.error });
    }
})

module.exports = app => app.use('/api/usuario', router);