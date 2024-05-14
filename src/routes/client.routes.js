const exrpess = require('express');
const router = exrpess.Router();
const Client = require('../models/client.model');
const { verifyToken } = require('../security/jwt.config');

// Middleware para parsear el body de las peticiones
router.use(exrpess.json());

// Middleware para obtener cliente
const getClient = async (req, res, next) => {
    let client;
    const { id } = req.Client;

    if (!id){
        return res.status(400).json({
            message: 'Invalid id'
        });
    } 

    try {
        client = await Client.findOne({
            where: {
                id: id
            }
        })
        if (!client){
            return res.status(404).json({
                message: 'Client not found'
            });
        }
    } catch (err){
        res.status(500).json({
            message: 'Error getting client, sorry'
        });
    }
    res.Client = client;
    next();
}

// Obtener todos los clientes 
router.get('/get-clients', async (req, res) => {
    try{
        const clients = await Client.findAll();
        if (clients.length === 0){
            return res.status(204).json({
                message: 'No clients found yet'
            });
        }
        res.status(200).json(clients);

    } catch (err){
        res.status(400).json({
            message: 'Error getting clients'
        });
        console.error(err);
    }
});

// Obtener un cliente
router.get('/get-client/:id', getClient, async (req, res) => {
    res.json(res.Client);
})

// Crear un cliente
router.post('/create-client', verifyToken, async (req, res) => {
    const client = req.body;
    if (!client.name || !client.email || !client.phone){
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    try {
        const newClient = await Client.create({
            name: client.name,
            email: client.email,
            phone: client.phone
        });
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({
            message: 'Error creating client, sorry'
        });
        console.error(err);
    }
})

// Actualizar un cliente
router.put('/update-client/:id', verifyToken, getClient, async (req, res) => {
    try {
        const client = res.client;
        client.name = req.body.name || client.name;
        client.email = req.body.email || client.email;
        client.phone = req.body.phone || client.phone;

        await client.save();
        res.status(200).json({
            message: 'Client updated successfully'
        });
    } catch (err) {
        res.status(400).json({
            message: 'Error updating client'
        })
        console.error(err)
    }
});

// Eliminar un cliente
router.delete('/delete-client/:id', verifyToken, getClient, async (req, res) =>{
    try {
        const client = res.client;
        client.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            message: 'Client deleted successfully'
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting client'
        })
    }
})

module.exports = router;