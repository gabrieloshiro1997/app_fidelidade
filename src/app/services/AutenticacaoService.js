const connection = require('../../database/db');

class AutenticacaoService {
    ObterDadosLoginUsuario = (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM usuario WHERE email = '${email}'`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a autenticação do usuário", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }
}

module.exports = new AutenticacaoService();