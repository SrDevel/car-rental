const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    expiresIn: '2h'
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.redirect('/login?message=Parece que no has iniciado sesión, por favor hazlo para continuar');
    }
    try {
        const decoded = jwt.verify(token, jwtConfig.secret, {
            algorithms: jwtConfig.algorithms
        });
        req.user = decoded;
        next();
    } catch (err){
        return res.redirect('/login?message=Tu sesión ha expirado, por favor inicia sesión de nuevo');
    }
}

const getToken = (req) => {
    return req.cookies.token;
}

// Creamos un middleware para validar el token para los endpoints
const validateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({
            message: 'Necesitas estar logueado para acceder a este recurso'
        });
    }
    try {
        const decoded = jwt.verify(token, jwtConfig.secret, {
            algorithms: jwtConfig.algorithms
        });
        req.user = decoded;
        next();
    } catch (err){
        return res.status(401).json({
            message: 'El token no es válido'
        });
    }
}

const generateToken = (user) => {
    const token = jwt.sign(user, jwtConfig.secret, {
        algorithm: jwtConfig.algorithms[0],
        expiresIn: jwtConfig.expiresIn
    });
    console.log('Token generado', token);
    return token;
}

const destroyToken = (res) => {
    res.clearCookie('token');
}

const getDataFromToken = (token) => {
    return jwt.verify(token, jwtConfig.secret, {
        algorithms: jwtConfig.algorithms
    });
}

module.exports = {
    generateToken,
    verifyToken,
    destroyToken,
    validateToken,
    getDataFromToken,
    getToken
}
