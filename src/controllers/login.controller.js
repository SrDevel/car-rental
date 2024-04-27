const { setApiData } = require('../utils/api.util');

const getLogin = (req, res) => {
    res.render('login', { message: '' });
}

const postLogin = async (req, res) => {
    console.log('Validating user...');
    const { username, password } = req.body;
    if (!username || !password){
        return res.render('login', { message: 'Campos vacíos, por favor llena todos los campos' });
    }
    try {
        const user = await setApiData('http://localhost:3000/api/v1/validate-user', {
            username,
            password
        });
        if (user){
            res.redirect('/dashboard');
        } else {
            res.render('login', { message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err){
        res.render('login', { message: 'Estamos teniendo problemas, intenta más tarde' });
        console.error(err);
    }
}

module.exports = {
    getLogin,
    postLogin
}