const connection = require('../../database/db');

class PontuacaoService {
	CriarPontuacao = (pontuacao, estabelecimentoId, clienteId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`INSERT INTO pontuacao
				(
				descricao,
				valor,
				estabelecimento_id,
				usuario_id)
				VALUES
				(
				'${pontuacao.descricao}',
				${pontuacao.valor},
				${estabelecimentoId},
				${clienteId});
				`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao criar recompensa", statusCode: 500 });

					else resolve(rows.insertId);
				}
			)
		}
		)
	}
	AtualizarPontucao = (pontuacao) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`
				UPDATE pontuacao
				SET
				valor = ${pontuacao.valor}
				WHERE id = ${pontuacao.id};
				`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao criar recompensa", statusCode: 500 });

					else resolve(rows.insertId);
				}
			)
		}
		)
	}
	BuscarPontosUserId = (userId, estabelecimentoId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT * FROM pontuacao WHERE usuario_id = ${userId} AND estabelecimento_id = ${estabelecimentoId}; `,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de pontuacao", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		}
		)
	}

}

module.exports = new PontuacaoService();