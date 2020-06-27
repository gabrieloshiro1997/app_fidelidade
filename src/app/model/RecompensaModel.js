const RecompensaService = require('../services/RecompensaService');
const { enviarEmailEstabelecimentoAprovado, enviarEmailEstabelecimentoReprovado } = require('../modules/EnviarEmail');

class RecompensaModel {
    ObterRecompensasPorEstabelecimento = async (estabelecimentoId) => {
        try {
            return await RecompensaService.ObterRecompensasPorEstabelecimento(estabelecimentoId);

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	}
	
	ObterRecompensaPorId = async (recompensaId) => {
        try {
            return await RecompensaService.ObterRecompensaPorId(recompensaId);

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    CriarRecompensa = async (r) => {
        try {
            if (!r.preco || !r.descricao || !r.data_validade || !r.estabelecimento_id)
                throw { message: "Preencha todos os campos", statusCode: 400 };

            r.pontos = Math.floor(r.preco * 10);

            let idRecompensaCriada = await RecompensaService.CriarRecompensa(r);

            let recompensa = await RecompensaService.ObterRecompensaPorId(idRecompensaCriada);

            return recompensa;

        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    AtualizarRecompensa = async (r) => {
        try {
            if (!r.id || !r.preco || !r.descricao || !r.data_validade || !r.estabelecimento_id)
                throw { message: "Todos os campos devem ser preenchidos", statusCode: 400 };

            r.pontos = Math.floor(r.preco * 10);

            let recompensa = await RecompensaService.ObterRecompensaPorId(r.id);

            if (!recompensa) {
                throw { message: "recompensa não encontrada", statusCode: 404 };
            }

            await RecompensaService.AtualizarRecompensa(r);

            return r;
        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }

	}
	
	DeletarRecompensa = async (id) => {
		try {
            let r = await RecompensaService.ObterRecompensaPorId(id);
                
            if(!r) {
                throw { message: "Recompensa não encontrada", statusCode: 404 };
            }

            return await RecompensaService.DeletarRecompensa(id);
        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	} 

	AtivarRecompensa = async (idRecompensa) => {
		try {
			let r = await RecompensaService.ObterRecompensaPorId(idRecompensa);
                
            if(!r) {
                throw { message: "Recompensa não encontrada", statusCode: 404 };
            }

            return await RecompensaService.AtivarRecompensa(idRecompensa);
		} catch (e) {
			
			throw { error: e.err, message: e.message, statusCode: e.statusCode };
		}
	}

	InativarRecompensa = async (idRecompensa) => {
		try {
			let r = await RecompensaService.ObterRecompensaPorId(idRecompensa);
                
            if(!r) {
                throw { message: "Recompensa não encontrada", statusCode: 404 };
            }

            return await RecompensaService.InativarRecompensa(idRecompensa);
		} catch (e) {
			
			throw { error: e.err, message: e.message, statusCode: e.statusCode };
		}
	}
}

module.exports = new RecompensaModel();