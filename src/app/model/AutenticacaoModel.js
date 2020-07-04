const AutenticacaoService = require('../services/AutenticacaoService');

class AutenticacaoModel {

    AutenticarUsuario = async (u) => {

        try {

            if (!u.email || !u.senha)
                throw { message: "Insira o usuário e a senha para realizar o login", statusCode: 400 };

            let usuario = await AutenticacaoService.ObterDadosLoginUsuario(u.email);

            if (!usuario)
                throw { message: "Usuário não encontrado", statusCode: 401 };

            if (usuario.senha != u.senha) {
                throw { message: "Senha inválida", statusCode: 401 };
            }
            const token = AutenticacaoService.JwtSign(usuario.id, usuario.acesso_usuario_id);
            delete usuario.senha;
            return { usuario, token };

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }

    AutenticarEstabelecimento = async (e) => {

        try {

            if (!e.email || !e.senha)
                throw { message: "Insira o usuário e a senha para realizar o login", statusCode: 400 };

            let estabelecimento = await AutenticacaoService.ObterDadosLoginEstabelecimento(e.email);

            if (!estabelecimento)
                throw { message: "Estabelecimento não encontrado", statusCode: 401 };

            if (estabelecimento.status_estabelecimento_id == 1) {
                throw { message: "Aguarde a aprovação do seu estabelecimento para poder realizar o login", statusCode: 401 };
            }

            if (estabelecimento.status_estabelecimento_id == 3) {
                throw { message: "Estabelecimento está inativo. Entre em contato para mais informações", statusCode: 401 };
            }

            if (estabelecimento.senha != e.senha) {
                throw { message: "Senha inválida", statusCode: 401 };
            }
            const token = AutenticacaoService.JwtSign(estabelecimento.id, 2);
            delete estabelecimento.senha;
            return { estabelecimento, token };

        } catch (e) {

            throw { error: e.err, message: e.message, statusCode: e.statusCode };
        }
    }
}

module.exports = new AutenticacaoModel();