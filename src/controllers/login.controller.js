    const { setApiData } = require('../utils/api.util');
    const { generateToken } = require('../security/jwt.config');

    const getLogin = (req, res) => {
        const message = req.query.message || '';
        res.render('login', { message: message });
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
                // Generamos el token
                const token = generateToken(user);
                // Guardamos el token en una cookie
                res.cookie('token', token, { httpOnly: false });
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