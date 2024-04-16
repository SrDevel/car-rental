const express = require('express');
const router = express.Router();
const { json } = require('body-parser');
const Office = require('../models/office.model');
const { where } = require('sequelize');

// Middleware para parsear el body de las peticiones
router.use(express.json());

// Middleware para obtener oficina
const getOffice = async (req, res, next) => {
    let office;
    const { id } = req.office;

    if (!id){
        return res.status(400).json({
            message: 'Invalid id'
        });
    } 

    try {
        office = await Office.findOne({
            where: {
                id: id
            }
        })
        if (!office){
            return res.status(404).json({
                message: 'Office not found'
            });
        }
    } catch (err){
        res.status(500).json({
            message: 'Error getting office, sorry'
        });
    }
    res.office = office;
    next();
}

// Obtener todas las oficinas
router.get('/get-offices', async (req, res) => {
    try{
        const offices = await Office.findAll();
        if (offices.length === 0){
            return res.status(204).json({
                message: 'No offices found yet'
            });
        }
        res.status(200).json(offices);

    } catch (err){
        res.status(400).json({
            message: 'Error getting offices'
        });
        console.error(err);
    }
});

// Obtener una oficina
router.get('/get-office/:id', getOffice, (req, res) => {
    res.status(200).json(res.office);
});

// Crear una oficina
router.post('/create-office', async (req, res) => {
    const { name, address, phone, opening_time, latitude, longitude } = req.body;
    if (!name || !address || !phone || !opening_time || !latitude || !longitude){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }

    try {
        const office = await Office.create({
            name,
            address,
            phone,
            opening_time,
            latitude,
            longitude
        });
        res.status(201).json(office);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating office'
        });
        console.error(error);
    }
});

// Actualizar una oficina
router.put('/update-office/:id', getOffice, async (req, res) => {
    const { name, address, phone, email, latitud, longitud } = req.body;
    if (!name || !address || !phone || !email || !latitud || !longitud){
        return res.status(400).json({
            message: 'Missing fields'
        });
    }

    try {
        await Office.update({
            name,
            address,
            phone,
            email,
            latitud,
            longitud
        }, {
            where: {
                id: req.office.id
            }
        });
        res.status(200).json({
            message: 'Office updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating office'
        });
        console.error(error);
    }
});

// Eliminar una oficina
router.delete('/delete-office/:id', getOffice, async (req, res) => {
    try {
        await Office.destroy({
            where: {
                id: req.office.id
            }
        });
        res.status(200).json({
            message: 'Office deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting office'
        });
        console.error(error);
    }
});

module.exports = router;