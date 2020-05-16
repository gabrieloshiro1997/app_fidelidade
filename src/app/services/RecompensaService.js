const connection = require('../../database/db');

class RecompensaService {
    ObterRecompensas = (estabelecimentoId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, pontos, status, data_validade, estabelecimento_id FROM recompensa WHERE estabelecimento_id = ${estabelecimentoId};`, 
                (err, rows) => {
                    if(err) reject({ err, message: "Erro ao realizar a consulta de recompensa", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
	}

    CriarRecompensa = (recompensa) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO recompensa (pontos, status, data_validade, estabelecimento_id) VALUES ('${recompensa.pontos}', '${recompensa.status}', '${recompensa.estabelecimento_id}')`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao criar recompensa", statusCode: 500 });
    
                    else resolve(rows.insertId);
                }
            )}
        )
	}
}

module.exports = new RecompensaService();