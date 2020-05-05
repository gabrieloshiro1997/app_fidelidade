const EstabelecimentoService = require('../services/EstabelecimentoService');
const { enviarEmailEstabelecimentoAprovado, enviarEmailEstabelecimentoReprovado} =require('../modules/EnviarEmail');

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
}

module.exports = new EstabelecimentoModel();