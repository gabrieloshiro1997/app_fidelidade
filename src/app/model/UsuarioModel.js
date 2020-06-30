const UsuarioService = require('../services/UsuarioService');
const { enviarEmail } = require('../modules/EnviarEmail');

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
    ObterUsuarioCPF = async (cpf) => {
        
        try {
            
            if(!cpf) 
                throw { message: "cpf do usuário não identificado", statusCode: 400 };
            
            let usuario = await UsuarioService.ObterUsuarioEmailCPF(null,cpf);
            
            if(!usuario)
                throw { message: "Usuário não encontrado", statusCode: 404 };

            return usuario;

        } catch (e) {
            
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    CriarUsuario = async (u) => {
        
        try {

            if(!u.nome || !u.cpf || !u.email|| !u.sexo || !u.dataNascimento)
                throw { message: "Preencha todos os campos", statusCode: 400 };

            let usuarioExistente = await UsuarioService.ObterUsuarioEmailCPF(u.email, u.cpf);

            if(usuarioExistente)
                throw { message: "Já possui um cadastro de um usuário com os dados informados", statusCode: 409 };

				
			const senha = Math.random().toString(36).slice(-8);

            let idUsuarioCriado = await UsuarioService.CriarUsuario(u, senha);

			await enviarEmail(u.email, senha);

            let usuario = await UsuarioService.ObterUsuario(idUsuarioCriado);

            return usuario;

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    AtualizarUsuario = async (u) => {
        
        try {

            if(!u.id || !u.nome || !u.cpf || !u.email || !u.sexo || !u.dataNascimento)
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