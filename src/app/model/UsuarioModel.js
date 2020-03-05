const UsuarioService = require('../services/UsuarioService');

class UsuarioModel {

    ObterUsuarios = async () => {
        try {
            
            return await UsuarioService.ObterUsuarios();

        } catch (e) {
            
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    ObterUsuario = async (id) => {
        
        try {
            
            if(!id) 
                throw { message: "Id do usuário não identificado", statusCode: 400 };
            
            let usuario = await UsuarioService.ObterUsuario(id);
            
            if(!usuario)
                throw { message: "Usuário não encontrado", statusCode: 404 };

            return usuario;

        } catch (e) {
            
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    CriarUsuario = async (u) => {
        
        try {

            if(!u.nome || !u.cpf || !u.email || !u.senha)
                throw { message: "Preencha todos os campos", statusCode: 400 };

            let usuarioExistente = await UsuarioService.ObterUsuarioEmailCPF(u.email, u.cpf);

            if(usuarioExistente)
                throw { message: "Já possui cadastro com os dados informados", statusCode: 409 };

            let idUsuarioCriado = await UsuarioService.CriarUsuario(u);

            let usuario = await UsuarioService.ObterUsuario(idUsuarioCriado);

            return usuario;

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    AtualizarUsuario = async (u) => {
        
        try {

            if(!u.id || !u.nome || !u.cpf || !u.email || !u.senha)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            
            let usuario = await UsuarioService.ObterUsuario(u.id);
                
            if(!usuario) {
                throw { message: "Usuário não encontrado", statusCode: 404 };
            }
    
            await UsuarioService.AtualizarUsuario(u);

            return u;
        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }    
    }

    DeletarUsuario = async (id) => {

        try {
            let u = await UsuarioService.ObterUsuario(id);
                
            if(!u) {
                throw { message: "Usuário não encontrado", statusCode: 404 };
            }

            return await UsuarioService.DeletarUsuario(id);
        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new UsuarioModel();