const connection = require('../../database/db');

class RecompensaService {
	ObterRecompensasPorEstabelecimento = (estabelecimentoId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT id, pontos, status, data_validade, preco, descricao, estabelecimento_id FROM recompensa WHERE estabelecimento_id = ${estabelecimentoId};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de recompensa", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}

	ObterRecompensaPorId = (recompensaId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT id, pontos, status, descricao, preco, DATE_FORMAT(data_validade, '%Y-%m-%d') as data_validade, estabelecimento_id FROM recompensa WHERE id = ${recompensaId};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de recompensa", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		}
		)
	}

	CriarRecompensa = (recompensa) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`INSERT INTO recompensa (pontos, status, preco, descricao, data_validade, estabelecimento_id) VALUES ('${recompensa.pontos}', '1', '${recompensa.preco}', '${recompensa.descricao}', '${recompensa.data_validade}', '${recompensa.estabelecimento_id}')`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao criar recompensa", statusCode: 500 });

					else resolve(rows.insertId);
				}
			)
		}
		)
	}

	AtualizarRecompensa = (recompensa) => {

		return new Promise((resolve, reject) => {
			connection.query(
				`UPDATE recompensa SET pontos = '${recompensa.pontos}', preco = '${recompensa.preco}',  descricao = '${recompensa.descricao}',  data_validade = '${recompensa.data_validade}' WHERE id = '${recompensa.id}'`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao atualizar recompensa", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		}
		)
	}

	DeletarRecompensa = (idRecompensa) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`DELETE FROM recompensa WHERE id = ${idRecompensa};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao deletar recompensa", statusCode: 500 });

					else resolve();
				}
			)
		});
	}

	AtivarRecompensa = (idRecompensa) => {

		return new Promise((resolve, reject) => {
			connection.query(
				`UPDATE recompensa SET status = '1' WHERE id = '${idRecompensa}'`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao atualizar recompensa", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		});
	}

	InativarRecompensa = (idRecompensa) => {

		return new Promise((resolve, reject) => {
			connection.query(
				`UPDATE recompensa SET status = '0' WHERE id = '${idRecompensa}'`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao atualizar recompensa", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		});
	}

}

module.exports = new RecompensaService();