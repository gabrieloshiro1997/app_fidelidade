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
				`SELECT * FROM retirada WHERE usuario_id = ${userId} ORDER BY data_retirada DESC;`,
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
				`SELECT distinct r.id, u.nome, u.cpf, r.data_retirada , r.pontos_gastos FROM retirada r, usuario u WHERE usuario_id = u.id
				 AND r.recompensa_id IN
				 (
					SELECT id FROM recompensa WHERE estabelecimento_id = ${estabelecimentoId}
				 ) ORDER BY data_retirada DESC;`,
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

	ObterHistoricoRetiradaClientePorEstabelecimento = (idUsuario, idEstabelecimento) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`select rec.descricao, ret.pontos_gastos pontos_gastos, ret.data_retirada from retirada ret
				inner join recompensa rec on rec.id = ret.recompensa_id 
				where ret.usuario_id = ${idUsuario}
				and rec.estabelecimento_id = ${idEstabelecimento}
				order by ret.data_retirada desc;`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta do historico de retirada", statusCode: 500 });

					else resolve(rows);
				}
			)
		})
	}
}

module.exports = new RecompensaService();