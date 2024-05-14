const exrpess = require('express');
const router = exrpess.Router();
const Car = require('../models/cars.model');
const { verifyToken } = require('../security/jwt.config');

// Middleware para parsear el body de las peticiones
router.use(exrpess.json());

// Middleware para obtener vehículo 
const getCar = async (req, res, next) =>{
    let car;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({message: 'Invalid id'});
    };

    try {
        car = await Car.findOne({
            where: {
                id: id
            }
        })
        if (!car){
            return res.status(404).json({
                message: 'Car not found'
            });
        }
    } catch (err){
        console.error(err);
        return res.status.json({
            message: 'Error getting car, sorry'
        });
    }

    res.car = car;
    next();
}

// Optener todos los carros
router.get('/get-cars',async (req, res)=>{
    try{
        const cars = await Car.findAll();
        if(cars.length === 0){
            return res.status(204).json({
                message: 'No cars found yet'
            })
        }
        res.status(200).json(cars);
    } catch (err){
        res.status(400).json({message: 'Error getting cars'});
        console.error(err);
    }
});

// Obtener un carro
router.get('/get-car/:id', getCar,async (req, res)=>{
    console.log(res.car)
    res.json(res.car);
});

// Crear un carro
router.post('/create-car', verifyToken, async (req, res)=>{
    const newCar = req.body;
    if(!newCar.brand || !newCar.model || !newCar.year || !newCar.color || !newCar.price || !newCar.available || !newCar.transmission || !newCar.fuel || !newCar.doors || !newCar.passengers || !newCar.type ||  !newCar.luggage || !newCar.officeId){
        res.status(400).json({message: 'All fields are required'});
    } else {
        try{
            Car.sync();
            const car = await Car.create({
                brand: newCar.brand,
                model: newCar.model,
                year: newCar.year,
                color: newCar.color,
                price: newCar.price,
                available: newCar.available,
                transmission: newCar.transmission,
                fuel: newCar.fuel,
                doors: newCar.doors,
                passengers: newCar.passengers,
                luggage: newCar.luggage,
                type: newCar.type,
                image: newCar.image,
                officeId: newCar.officeId
            });
            res.status(201).json({message: 'Car created successfully'});
        } catch (err){
            res.status(400).json({message: 'Error creating car'});
            console.error(err);
        }
    }
});

// Actualizar un carro
router.put('/get-car/:id', verifyToken, getCar, async (req, res)=>{
    try {
        const car = res.car;

        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.color = req.body.color || car.color;
        car.price = req.body.price || car.price;
        car.available = req.body.available || car.available;
        car.transmission = req.body.transmission || car.transmission;
        car.fuel = req.body.fuel || car.fuel;
        car.doors = req.body.doors || car.doors;
        car.passengers = req.body.passengers || car.passengers;
        car.luggage = req.body.luggage || car.luggage;
        car.type = req.body.type || car.type;
        car.image = req.body.image || car.image;
        car.officeId = req.body.officeId || car.officeId;

        await car.save();
        res.status(200).json({
            message: 'Car updated successfully'
        })
    } catch (err){
        res.status(400).json({
            message: 'Error updating car'
        })
        console.error(err);
    }
});

// Eliminar un carro
router.delete('/delete-car/:id', verifyToken, getCar, async (req, res)=>{
    try {
        const car = res.car;
        await car.destroy({
            where: {
                id: car.id
            }
        });
        res.status(200).json({
            message: 'Car deleted successfully'
        })
    } catch (err) {
        res.status(400).json({
            message: 'Error deleting car'
        })
        console.error(err);
    }

});

router.put('/update-car/:id', verifyToken, getCar, async (req, res)=>{
    try {
        const car = res.car;
        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.color = req.body.color || car.color;
        car.price = req.body.price || car.price;
        car.available = req.body.available || car.available;
        car.transmission = req.body.transmission || car.transmission;
        car.fuel = req.body.fuel || car.fuel;
        car.doors = req.body.doors || car.doors;
        car.passengers = req.body.passengers || car.passengers;
        car.luggage = req.body.luggage || car.luggage;
        car.type = req.body.type || car.type;
        car.image = req.body.image || car.image;
        car.officeId = req.body.officeId || car.officeId;

        await car.save();
        res.status(200).json({
            message: 'Car updated successfully'
        })
    } catch (err){
        res.status(400).json({
            message: 'Error updating car'
        })
        console.error(err);
    }
});
module.exports = router;