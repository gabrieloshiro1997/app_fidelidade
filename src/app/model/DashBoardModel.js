const DashBoardService = require('../services/DashBoardService');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');
class DashBoardModel {

    ObterDadosDashBoard = async (estabelecimentoId) => {

        try {
            let dados = {};
            let promisseSexoPontos = DashBoardService.ObterPontosXSexo(estabelecimentoId);
            let promissePontosMensais = DashBoardService.ObterPontuacaoMensal(estabelecimentoId);
            let promisseRecompensasRetiradas = DashBoardService.ObterRecompensasRetirada(estabelecimentoId);
            await Promise.all([promisseSexoPontos, promissePontosMensais, promisseRecompensasRetiradas])
                .then((values) => {
                    dados.sexoPontos = values[0];
                    dados.pontosMensais = values[1];
                    dados.recompensasRetiradas = values[2];
                })
            return dados;
        } catch (e) {
            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new DashBoardModel();