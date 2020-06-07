const PontuacaoService = require('../services/PontuacaoService');
const ClienteService = require('../services/UsuarioService')
class PontuacaoModel {

    CriarPontuacao = async (pontuacao, estabelecimentoId) => {
        try {
            if (!pontuacao.descricao || !pontuacao.valor || !pontuacao.cpfUsuario)
                throw { message: "Preencha todos os campos", statusCode: 400 };
            pontuacao.valor = Math.floor(pontuacao.valor * 10);
            let cliente = await ClienteService.ObterUsuarioEmailCPF(null, pontuacao.cpfUsuario);
            if(cliente == undefined){
                throw { message: "Cliente não encontrado", statusCode: 400 };
            }
            let buscaPontuacao = await PontuacaoService.BuscarPontosUserId(cliente.id, estabelecimentoId);
            if (!buscaPontuacao) {
                let criarPontuacao = await PontuacaoService.CriarPontuacao(pontuacao,estabelecimentoId,cliente.id);
            } else {
                pontuacao.valor += buscaPontuacao.valor;
                pontuacao.id = buscaPontuacao.id;
                let atualizarPontuacao = await PontuacaoService.AtualizarPontucao(pontuacao)
            }
            return pontuacao;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new PontuacaoModel();