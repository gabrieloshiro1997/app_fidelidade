const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ message: 'Token não informado', statusCode: 401 });
    
    const parts = authHeader.split(' ');

    if (parts.length != 2)
        return res.status(401).send({ message: 'Partes do token mal formatados', statusCode: 401 });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ message: 'Token mal formatado', statusCode: 401 });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        
        if(err) return res.status(401).send({ message: 'Token inválido', statusCode: 401 });

        req.userId = decoded.id;

        return next();
    })
}