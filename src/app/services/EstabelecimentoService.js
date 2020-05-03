const connection = require('../../database/db');

class EstabelecimentoService {

    ObterEstabelecimentoCNPJ = (cnpj, email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome_fantasia, cnpj, status_estabelecimento_id FROM estabelecimento WHERE cnpj = '${cnpj}' OR email = '${email}'`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de estabelecimento", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }
    ObterEstabelecimento = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome_fantasia, cnpj, status_estabelecimento_id FROM estabelecimento WHERE id = '${id}'`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de estabelecimento", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }

    CriarEstabelecimento = (estabelecimento) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO estabelecimento (nome_fantasia, email, cnpj, status_estabelecimento_id) VALUES ('${estabelecimento.nomeFantasia}', '${estabelecimento.email}', '${estabelecimento.cnpj}', '1')`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao criar estabelecimento", statusCode: 500 });
    
                    else resolve(rows.insertId);
                }
            )}
        )
    }
}

module.exports = new EstabelecimentoService();