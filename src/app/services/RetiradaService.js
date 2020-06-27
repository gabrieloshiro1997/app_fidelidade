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
	ObterResgastesPorUsuario = (userId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT * FROM retirada WHERE usuario_id = ${userId};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de recompensa por usuário", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}
	ObterResgastesPorEstabelecimento = (estabelecimentoId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT * FROM retirada WHERE recompensa_id IN (
					SELECT id FROM recompensa WHERE estabelecimento_id = ${estabelecimentoId}
					);`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de recompensa por estabelecimento", statusCode: 500 });

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
	ObterEstabelecimentoId = (retiradaId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT *
				 FROM recompensa WHERE id = ${retiradaId};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao retirar recompensa", statusCode: 500 });

					else resolve(rows[0]);
				}
			)
		}
		)
	}

	ResgatarRecompensa = (r, pontosGastos) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`
				INSERT INTO retirada
				(
				pontos_gastos,
				usuario_id,
				recompensa_id)
				VALUES
				(
				${pontosGastos},
				${r.usuarioId},
				${r.recompensaId});
				
				`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao resgatar recompensa", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}
}

module.exports = new RecompensaService();