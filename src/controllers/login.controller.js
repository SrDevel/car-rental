const { setApiData } = require('../utils/api.util');

const getLogin = (req, res) => {
    res.render('login');
}

const postLogin = async (req, res) => {
    console.log('Validating user...');
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }
    try {
        const user = await setApiData('http://localhost:3000/api/v1/validate-user', {
            username,
            password
        });
        if (user){
            res.redirect('/dashboard');
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (err){
        res.status(500).json({
            message: 'Error logging in'
        });
        console.error(err);
    }
}

module.exports = {
    getLogin,
    postLogin
}