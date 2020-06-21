const connection = require('../../database/db');

class SaldoService {
	AtualizarSaldo = (pontuacao, estabelecimentoId, clienteId, retirada) => {
		return new Promise((resolve, reject) => {
			connection.query(
				`
				SELECT saldo FROM saldo
				WHERE usuario_id = ${clienteId}
				AND estabelecimento_id = ${estabelecimentoId};`,
				(er, consultaSaldo) => {
					if (er) reject({ er, message: "Erro ao atualizar saldo", statusCode: 500 });

					if (consultaSaldo.length == 0) {
						connection.query(
							`
						INSERT INTO saldo
						(
						usuario_id,
						estabelecimento_id,
						saldo)
						VALUES
						(
						${clienteId},
						${estabelecimentoId},
						${pontuacao});
						`,
							(err, rows) => {
								if (err) reject({ err, message: "Erro ao atualizar saldo", statusCode: 500 });

								else resolve(rows);
							})
					}
					else {
						let saldoAtual = 0;
						if (retirada) {
							saldoAtual = consultaSaldo[0].saldo - pontuacao;
						} else {
							saldoAtual = consultaSaldo[0].saldo + pontuacao;
						}
						if (consultaSaldo[0].saldo < pontuacao && retirada) {
							reject({ err: null, message: "Saldo insuficiente", statusCode: 500 });
						}
						else {
							connection.query(
								`
								UPDATE saldo
								SET
								saldo = ${saldoAtual}
								WHERE usuario_id = ${clienteId} 
								AND estabelecimento_id = ${estabelecimentoId};
							`,
								(err, rows) => {
									if (err) reject({ err, message: "Erro ao atualizar saldo", statusCode: 500 });

									else resolve(rows);
								})
						}
					}
				})
		})
	}
}

module.exports = new SaldoService();