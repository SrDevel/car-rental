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

module.exports = router;