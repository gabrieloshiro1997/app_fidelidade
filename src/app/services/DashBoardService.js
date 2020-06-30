const connection = require('../../database/db');

class DashBoardService {
    ObterPontosXSexo = (estabelecimentoId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT sexo, COUNT( distinct u.id) quantidade, SUM(p.valor) pontos FROM usuario u
				INNER JOIN pontuacao p ON
				u.id = p.usuario_id
				WHERE p.estabelecimento_id = ${estabelecimentoId}
				GROUP BY sexo;`, 
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
					GROUP BY MONTH(p.data_pontuacao)
					ORDER BY mes ASC;`, 
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
                `select rec.descricao produto, sum(ret.pontos_gastos) pontuacao from recompensa rec
				inner join retirada ret on
				rec.id = ret.recompensa_id
				where estabelecimento_id = ${estabelecimentoId}
				group by rec.id;`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de Retirada X Recompensa", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
	}
}

module.exports = new DashBoardService();