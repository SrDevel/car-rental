const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    expiresIn: '2h'
}

const verifyToken = (req, res, next) => {
    console.log('Verifying token...');
    const token = req.cookies.token;
    if (!token){
        return res.redirect('/login?message=Token no encontrado');
    }
    try {
        const decoded = jwt.verify(token, jwtConfig.secret, {
            algorithms: jwtConfig.algorithms
        });
        req.user = decoded;
        next();
    } catch (err){
        return res.redirect('/login?message=Token inválido');
    }
}

const generateToken = (user) => {
    const token = jwt.sign(user, jwtConfig.secret, {
        algorithm: jwtConfig.algorithms[0],
        expiresIn: jwtConfig.expiresIn
    });
    console.log('Token generated:', token);
    return token;
}

const destroyToken = (res) => {
    res.clearCookie('token');
}

module.exports = {
    generateToken,
    verifyToken,
    destroyToken
}
