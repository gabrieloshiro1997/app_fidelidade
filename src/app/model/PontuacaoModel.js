const PontuacaoService = require('../services/PontuacaoService');
const ClienteService = require('../services/UsuarioService')
const SaldoService = require('../services/SaldoService')
class PontuacaoModel {

    CriarPontuacao = async (pontuacao, estabelecimentoId) => {
        try {
            if (!pontuacao.descricao || !pontuacao.valor || !pontuacao.cpfUsuario)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            pontuacao.valor = Math.floor(pontuacao.valor * 10);
            let cliente = await ClienteService.ObterUsuarioEmailCPF(null, pontuacao.cpfUsuario);
            if (cliente == undefined) {
                throw { message: "Cliente não encontrado", statusCode: 404 };
            }
            await PontuacaoService.CriarPontuacao(pontuacao, estabelecimentoId, cliente.id);
            await SaldoService.AtualizarSaldo(pontuacao.valor, estabelecimentoId, cliente.id, false);
            return pontuacao;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    ObterPontuacaoCliente = async (userId) => {
        try {
            let listaPontuacao = await PontuacaoService.ObterPontuacaoCliente(userId);
            return listaPontuacao;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
    ObterPontuacaoEstabelecimento = async (estabelecimentoId) => {
        try {
            let listaPontuacao = await PontuacaoService.ObterPontuacaoEstabelecimento(estabelecimentoId);
            return listaPontuacao;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new PontuacaoModel();