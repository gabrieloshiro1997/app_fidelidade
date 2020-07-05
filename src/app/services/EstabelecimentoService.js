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

	ObterEstabelecimentos = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome_fantasia, cnpj, email, status_estabelecimento_id FROM estabelecimento`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de estabelecimentos", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
	}
	
    ObterEstabelecimento = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome_fantasia, cnpj, email, status_estabelecimento_id FROM estabelecimento WHERE id = '${id}'`, 
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
	
	AprovarEstabelecimento = (idEstabelecimento, senha) => {
		return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE estabelecimento SET status_estabelecimento_id = '2', senha = '${senha}' WHERE id = '${idEstabelecimento}'`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao alterar o status do estabelecimento", statusCode: 500 });
    
                    else resolve(rows.insertId);
                }
            )}
        )
	}

	ReprovarEstabelecimento = (idEstabelecimento) => {
		return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE estabelecimento SET status_estabelecimento_id = '3' WHERE id = '${idEstabelecimento}'`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao alterar o status do estabelecimento", statusCode: 500 });
    
                    else resolve(rows.insertId);
                }
            )}
        )
	}

	ObterEstabelecimentoEmail = (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM estabelecimento WHERE email = '${email}'`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de estabelecimento", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
	}

	AtualizarSenha = (email, senha) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE estabelecimento SET senha = '${senha}' WHERE email = '${email}'`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao atualizar senha", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }
}

module.exports = new EstabelecimentoService();