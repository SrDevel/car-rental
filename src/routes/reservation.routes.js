const exrpess = require('express');
const Reservation = require('../models/reservation.model');
const router = exrpess.Router();
const path = require('path');

// Middleware para parsear el body de las peticiones
router.use(exrpess.json());

// Middleware para obtener reservación
const getReservation = async (req, res, next) =>{
    let reservation;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({message: 'Invalid id'});
    };

    try {
        reservation = await Reservation.findOne({
            where: {
                id: id
            }
        })
        if (!reservation){
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }
    } catch (err){
        console.error(err);
        return res.status.json({
            message: 'Error getting reservation, sorry'
        });
    }

    res.reservation = reservation;
    next();
}

// Obtener todas las reservaciones
router.get('/get-reservations',async (req, res)=>{
    try{
        const reservations = await Reservation.findAll();
        if(reservations.length === 0){
            return res.status(204).json({
                message: 'No reservations found yet'
            })
        }
        res.status(200).json(reservations);
    } catch (err){
        res.status(400).json({message: 'Error getting reservations'});
        console.error(err);
    }
});

// Obtener una reservación
router.get('/get-reservation/:id', getReservation,async (req, res)=>{
    console.log(res.reservation)
    res.json(res.reservation);
});

// Crear una reservación
router.post('/new-reservation', async (req, res) => {
    const { id_car, id_office, start_date, end_date, total } = req.body;
    try {
        const reservation = await Reservation.create({
            id_car,
            id_office,
            start_date,
            end_date,
            total
        });
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({message: 'Error creating reservation'});
        console.error(err);
    }
});

// Actualizar una reservación
router.put('/update-reservation/:id', getReservation, async (req, res) => {
    const { id_car, id_office, start_date, end_date, total } = req.body;
    try {
        await Reservation.update({
            id_car,
            id_office,
            start_date,
            end_date,
            total
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Reservation updated'});
    } catch (err) {
        res.status(400).json({message: 'Error updating reservation'});
        console.error(err);
    }
});

// Eliminar una reservación
router.delete('/delete-reservation/:id', getReservation, async (req, res) => {
    try {
        await Reservation.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: 'Reservation deleted'});
    } catch (err) {
        res.status(400).json({message: 'Error deleting reservation'});
        console.error(err);
    }
});

module.exports = router;