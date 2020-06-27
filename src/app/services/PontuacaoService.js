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
	ObterPontuacaoHistoricoCliente = (userId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT distinct p.id, e.nome_fantasia, p.descricao,p.data_pontuacao, p.valor 
				FROM pontuacao p, estabelecimento e, saldo s
				WHERE p.usuario_id = ${userId}
				AND e.id = p.estabelecimento_id
                AND s.usuario_id = p.usuario_id
				AND s.estabelecimento_id = e.id
				ORDER BY p.data_pontuacao DESC;`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de pontuacao", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}
	ObterSaldoTotalCliente = (userId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT distinct s.id, s.saldo
				FROM  saldo s
                WHERE s.usuario_id = ${userId};`,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de saldo", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}
	ObterPontuacaoEstabelecimento = (estabelecimentoId) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`SELECT u.nome,u.cpf,p.descricao,p.valor 
				FROM pontuacao p, usuario u
				WHERE p.estabelecimento_id = ${estabelecimentoId}
				AND u.id = p.usuario_id
				ORDER BY data_pontuacao; `,
				(err, rows) => {
					if (err) reject({ err, message: "Erro ao realizar a consulta de pontuacao", statusCode: 500 });

					else resolve(rows);
				}
			)
		}
		)
	}
	
}

module.exports = new PontuacaoService();