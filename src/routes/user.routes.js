const exrpess = require('express');
const router = exrpess.Router();
const User = require('../models/user.model');
const { encrypt, decrypt } = require('../security/password.operations');
const { verifyToken } = require('../security/jwt.config');

// Middleware para parsear el body de las peticiones
router.use(exrpess.json());

// Middleware para obtener usuario
const getUser = async (req, res, next) => {
    let user;
    const { id } = req.User;

    if (!id){
        return res.status(400).json({
            message: 'Invalid id'
        });
    } 

    try {
        user = await User.findOne({
            where: {
                id: id
            }
        })
        if (!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err){
        res.status(500).json({
            message: 'Error getting user, sorry'
        });
    }
    res.User = user;
    next();
}

// Obtener todos los usuarios
router.get('/get-users', async (req, res) => {
    try{
        const users = await User.findAll();
        if (users.length === 0){
            return res.status(204).json({
                message: 'No users found yet'
            });
        }
        res.status(200).json(users);

    } catch (err){
        res.status(400).json({
            message: 'Error getting users'
        });
        console.error(err);
    }
});

// Obtener un usuario
router.get('/get-user/:id', getUser, async (req, res) => {
    res.json(res.User);
});

// Crear un usuario
router.post('/create-user', verifyToken, async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }
    const encryptedPassword = await encrypt(password);
    try {
        const newUser = await User.create({
            username,
            password: encryptedPassword
        });
        res.status(201).json(newUser);
    } catch (err){
        res.status(500).json({
            message: 'Error creating user'
        });
        console.error(err);
    }
});

// Actualizar un usuario
router.put('/update-user/:id', verifyToken, getUser, async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }

    try {
        const updatedUser = await res.User.update({
            username,
            password
        });
        res.status(200).json(updatedUser);
    } catch (err){
        res.status(500).json({
            message: 'Error updating user'
        });
        console.error(err);
    }
});

// Eliminar un usuario
router.delete('/delete-user/:id', verifyToken, getUser, async (req, res) => {
    try {
        await res.User.destroy();
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (err){
        res.status(500).json({
            message: 'Error deleting user'
        });
        console.error(err);
    }
});

// Validar usuario y contraseña
router.post('/validate-user', async (req, res) => {
    console.log(req.body, 'validate user');
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }

    try {
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isValid = await decrypt(password, user.password);

        if(!isValid){
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        res.status(200).json({
            message: 'Valid user'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error validating user'
        });
        console.error(err);
    }
});



module.exports = router;