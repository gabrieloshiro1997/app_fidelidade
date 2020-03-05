const connection = require('../../database/db');

class UsuarioService {

    ObterUsuarios = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT id, nome, cpf, email FROM usuario", 
                (err, rows) => {                                                
                    if(err) reject({ err, message: "Erro ao realizar a consulta de usuários", statusCode: 500 });
    
                    else resolve(rows);
                }
            )}
        )
    }

    ObterUsuario = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome, cpf, email FROM usuario WHERE id = ${id}`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de usuário", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }

    CriarUsuario = (usuario) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO usuario (nome, cpf, email, senha) VALUES ('${usuario.nome}', '${usuario.cpf}', '${usuario.email}', '${usuario.senha}')`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao criar usuário", statusCode: 500 });
    
                    else resolve(rows.insertId);
                }
            )}
        )
    }

    AtualizarUsuario = (usuario) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE usuario SET nome = '${usuario.nome}', cpf = '${usuario.cpf}', email = '${usuario.email}', senha = '${usuario.senha}' WHERE id = '${usuario.id}'`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao atualizar usuário", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }

    DeletarUsuario = (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `DELETE FROM usuario WHERE id = ${id}`, 
                (err, rows) => {                                          
                    if(err) reject({ err, message: "Erro ao deletar usuário", statusCode: 500 });
    
                    else resolve();
                }
            )}
        )
    }

    ObterUsuarioEmailCPF = (email, cpf) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, nome, cpf, email FROM usuario WHERE (email = '${email}' OR cpf = '${cpf}')`, 
                (err, rows) => {                                             
                    if(err) reject({ err, message: "Erro ao realizar a consulta de usuário", statusCode: 500 });
    
                    else resolve(rows[0]);
                }
            )}
        )
    }
}

module.exports = new UsuarioService();