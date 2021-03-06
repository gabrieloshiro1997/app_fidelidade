const EstabelecimentoService = require('../services/EstabelecimentoService');
const { enviarEmailEstabelecimentoAprovado, enviarEmailEstabelecimentoReprovado, enviarEmailRedefinirSenha} =require('../modules/EnviarEmail');
const AutenticacaoService = require('../services/AutenticacaoService');

class EstabelecimentoModel {
	ObterEstabelecimentos = async () => {
		try {
            
            return await EstabelecimentoService.ObterEstabelecimentos();

        } catch (e) {
            
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	}
    CriarEstabelecimento = async (e) => {
        try {
            if(!e.nomeFantasia || !e.cnpj || !e.email)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            
            let estabelecimentoExistente = await EstabelecimentoService.ObterEstabelecimentoCNPJ(e.cnpj, e.email);

            if(estabelecimentoExistente)
                throw { message: "Já possui um cadastro de um estabelecimento os dados informados", statusCode: 409 };

            let idEstabelecimentoCriado = await EstabelecimentoService.CriarEstabelecimento(e);

            let estabelecimento = await EstabelecimentoService.ObterEstabelecimento(idEstabelecimentoCriado);

            return estabelecimento;

        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	}
	
	AprovarEstabelecimento = async (id) => {

		try {
			if(!id)
				throw { message: "Informe o estabelecimento", statusCode: 400 };
			
			let estabelecimento = await EstabelecimentoService.ObterEstabelecimento(id);
	
			if(!estabelecimento) {
				throw { message: "Estabelecimento não encontrado", statusCode: 400 };
			}

			const senha = Math.random().toString(36).slice(-8);

			var estabelecimentoAtualizado = await EstabelecimentoService.AprovarEstabelecimento(id, senha);
			
			await enviarEmailEstabelecimentoAprovado(estabelecimento.email, senha)

			estabelecimento = await EstabelecimentoService.ObterEstabelecimento(estabelecimentoAtualizado);
			
			return estabelecimento;
		} catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
			
		}
	}

	ReprovarEstabelecimento = async (id) => {

		try {
			if(!id)
				throw { message: "Informe o estabelecimento", statusCode: 400 };
			
			let estabelecimento = await EstabelecimentoService.ObterEstabelecimento(id);
	
			if(!estabelecimento) {
				throw { message: "Estabelecimento não encontrado", statusCode: 400 };
			}

			var estabelecimentoAtualizado = await EstabelecimentoService.ReprovarEstabelecimento(id);
			
			await enviarEmailEstabelecimentoReprovado(estabelecimento.email);

			estabelecimento = await EstabelecimentoService.ObterEstabelecimento(estabelecimentoAtualizado);
			
			return estabelecimento;
		} catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
			
		}
	}

	EnviarEmailRedefinirSenha = async (email) => {
		try {
			let u = await EstabelecimentoService.ObterEstabelecimentoEmail(email);

			if (!u) {
				throw { message: "Estabelecimento não encontrado", statusCode: 404 };
			} else {

				const token = AutenticacaoService.JwtSign(u.id, u.acesso_usuario_id);
				let urlToken;

				urlToken = `http://localhost:3001/RedefinirSenha/${token}/${email}`

				enviarEmailRedefinirSenha(u.email, urlToken);
				return {
					mensagem: `Uma mensagem foi enviada para a redefinição de senha no email ${u.email.replace(/\D\D\D@/i, '***')}`
				}
			}

		} catch (e) {

			throw { error: e.err, message: e.message, statusCode: e.statusCode };
		}
	}

	RedefinirSenha = async (email, senha) => {
		try {

			let estabelecimento = await EstabelecimentoService.ObterEstabelecimentoEmail(email);

			if(!estabelecimento) {
				throw { message: "Estabelecimento não encontrado", statusCode: 404 };
			} 

			if(!senha) {
				throw { message: "Insira uma senha", statusCode: 400 };
			} 

			return await EstabelecimentoService.AtualizarSenha(email, senha);
		} catch (e) {

			throw { error: e.err, message: e.message, statusCode: e.statusCode };

		}
	}

}

module.exports = new EstabelecimentoModel();