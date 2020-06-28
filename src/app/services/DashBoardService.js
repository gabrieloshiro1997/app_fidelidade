const connection = require('../../database/db');

class DashBoardService {
    ObterPontosXSexo = (estabelecimentoId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT u.sexo, SUM(p.valor) as valor FROM usuario u, pontuacao p
                    WHERE p.usuario_id = u.id
                    AND p.estabelecimento_id = ${estabelecimentoId} 
                    GROUP BY u.sexo;`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de Sexo X Pontos", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
    }
    ObterPontuacaoMensal = (estabelecimentoId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT MONTH(p.data_pontuacao) as mes, SUM(p.valor) as valor FROM usuario u, pontuacao p
                    WHERE p.usuario_id = u.id
                    AND p.estabelecimento_id = ${estabelecimentoId}
                    GROUP BY MONTH(p.data_pontuacao);`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de Mes X Pontos", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
    }
    ObterRecompensasRetirada = (estabelecimentoId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT rec.descricao, count(ret.id) as quantidade
                FROM estabelecimento e, retirada ret, recompensa rec
                WHERE ret.recompensa_id = rec.id
                AND rec.estabelecimento_id = e.id
                AND e.id = ${estabelecimentoId}
                GROUP BY rec.id;`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de Retirada X Recompensa", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
	}
}

module.exports = new DashBoardService();