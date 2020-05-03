const EstabelecimentoService = require('../services/EstabelecimentoService');

class EstabelecimentoModel {
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
}

module.exports = new EstabelecimentoModel();