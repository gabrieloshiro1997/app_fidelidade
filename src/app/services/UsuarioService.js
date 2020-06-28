const connection = require('../../database/db');

class UsuarioService {

    ObterUsuarios = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT id, nome, cpf, email FROM usuario WHERE acesso_usuario_id = 3", 
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

    CriarUsuario = (usuario, senha) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO usuario (nome, cpf, email, senha, acesso_usuario_id, data_nasc, sexo)
                VALUES ('${usuario.nome}', '${usuario.cpf}', '${usuario.email}', '${senha}', '${usuario.acessoUsuario}','${usuario.dataNascimento}','${usuario.sexo}');`, 
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
                `UPDATE usuario SET nome = '${usuario.nome}', cpf = '${usuario.cpf}', email = '${usuario.email}' WHERE id = '${usuario.id}'`, 
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