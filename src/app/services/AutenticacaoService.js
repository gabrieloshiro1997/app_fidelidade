const connection = require('../../database/db');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

class AutenticacaoService {
    ObterDadosLoginUsuario = (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM usuario WHERE email = '${email}'`,
                (err, rows) => {
                    if (err) reject({ err, message: "Erro ao realizar a autenticação do usuário", statusCode: 500 });

                    else resolve(rows[0]);
                }
            )
        }
        )
    }

    ObterDadosLoginEstabelecimento = (email) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM estabelecimento WHERE email = '${email}'`,
                (err, rows) => {
                    if (err) reject({ err, message: "Erro ao realizar a autenticação do estabelecimento", statusCode: 500 });

                    else resolve(rows[0]);
                }
            )
        }
        )
    }
    JwtSign = (userId, userAccess) => {
        const token = jwt.sign({
            id: userId,
            tipoUsuario: userAccess
        },
            authConfig.secret,
            {
                expiresIn: 43200
            });
        return token;
    }
}

module.exports = new AutenticacaoService();