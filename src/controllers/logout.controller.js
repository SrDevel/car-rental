const { destroyToken } = require('../security/jwt.config');

const logout = (req, res) => {
    destroyToken(res);
    res.redirect('/login');
}

module.exports = {
    logout
}