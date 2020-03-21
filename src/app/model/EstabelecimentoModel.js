const EstabelecimentoService = require('../services/EstabelecimentoService');

class EstabelecimentoModel {
    CriarEstabelecimento = async (e) => {
        console.log(e)
        try {
            if(!e.nomeFantasia || !e.cnpj)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            
            let estabelecimentoExistente = await EstabelecimentoService.ObterEstabelecimentoCNPJ(e.cnpj);

            if(estabelecimentoExistente)
                throw { message: "Já possui estabelecimento cadastrado com o CNPJ informado ", statusCode: 409 };

            let idEstabelecimentoCriado = await EstabelecimentoService.CriarEstabelecimento(e);

            let estabelecimento = await EstabelecimentoService.ObterEstabelecimento(idEstabelecimentoCriado);

            return estabelecimento;

        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new EstabelecimentoModel();