const RecompensaService = require('../services/RecompensaService');
const { enviarEmailEstabelecimentoAprovado, enviarEmailEstabelecimentoReprovado} = require('../modules/EnviarEmail');

class RecompensaModel {
    ObterRecompensas = async (estabelecimentoId) => {
		try {
            return await RecompensaService.ObterRecompensas(estabelecimentoId);

        } catch (e) {
            
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    
    CriarRecompensa = async (e) => {
        try {
            if(!e.pontos || !e.status || !e.data_validade || !e.estabelecimento_id)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            
            // let estabelecimentoExistente = await EstabelecimentoService.ObterEstabelecimentoCNPJ(e.cnpj, e.email);

            if(estabelecimentoExistente)
                throw { message: "Já possui um cadastro de um estabelecimento os dados informados", statusCode: 409 };

            let idEstabelecimentoCriado = await EstabelecimentoService.CriarEstabelecimento(e);

            let estabelecimento = await EstabelecimentoService.ObterEstabelecimento(idEstabelecimentoCriado);

            return estabelecimento;

        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	}
}


module.exports = new RecompensaModel();