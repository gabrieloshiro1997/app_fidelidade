const RetiradaService = require('../services/RetiradaService');
const SaldoService = require('../services/SaldoService');

class RetiradaModel {
    ObterRecompensasPorEstabelecimento = async (estabelecimentoId) => {
        try {
            return await RetiradaService.ObterRecompensasPorEstabelecimento(estabelecimentoId);

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    ObterResgastesPorUsuario = async (userId) => {
        try {
            return await RetiradaService.ObterResgastesPorUsuario(userId);

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    ObterResgastesPorEstabelecimento = async (estabelecimentoId) => {
        try {
            return await RetiradaService.ObterResgastesPorEstabelecimento(estabelecimentoId);

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    RetirarRecompensa = async (r) => {
        try {
            if ( !r.recompensaId || !r.usuarioId)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            let recompensa = await RetiradaService.ObterEstabelecimentoId(r.recompensaId);
            await SaldoService.AtualizarSaldo(recompensa.pontos, recompensa.estabelecimento_id, r.usuarioId, true)
            await RetiradaService.ResgatarRecompensa(r,recompensa.pontos);
            return r;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
	}
	
	ObterHistoricoRetiradaClientePorEstabelecimento = async (userId, idEstabelecimento) => {
		try {
			let historico = await RetiradaService.ObterHistoricoRetiradaClientePorEstabelecimento(userId, idEstabelecimento);
			return historico;
		} catch (e) {
			throw { error: e.err, message: e.message, statusCode: e.statusCode };
		}
	}
}

module.exports = new RetiradaModel();