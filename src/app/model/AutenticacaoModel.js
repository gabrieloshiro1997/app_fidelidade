const AutenticacaoService = require('../services/AutenticacaoService');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');
class AutenticacaoModel {

    AutenticarUsuario = async (u) => {

        try {
            
            if(!u.email || !u.senha)
                throw { message: "Insira o usuário e a senha para realizar o login", statusCode: 400 };
    
            let usuario = await AutenticacaoService.ObterDadosLoginUsuario(u.email);

            if(!usuario)
                throw { message: "Usuário não encontrado", statusCode: 404 };

            if(usuario.senha != u.senha){
                throw { message: "Senha inválida", statusCode: 400 };
            }

            const token = jwt.sign({ id: u.id }, authConfig.secret, {
                expiresIn: 43200
            });

            return { usuario, token};

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new AutenticacaoModel();