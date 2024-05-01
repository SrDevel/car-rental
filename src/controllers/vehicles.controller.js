const { getApiData, setApiData } = require("../utils/api.util")

const getVehicles = async (req, res) => {
    const data = await getApiData('http://localhost:3000/api/v1/get-cars');
    if (Array.isArray(data)) {
        res.render('vehicles', { array: data });
    } else {
        res.render('vehicles', { array: [] });
    }
}


// Funciones del administrador
const adminVehicles = async (req, res) => {
    const data = await getApiData('http://localhost:3000/api/v1/get-cars');
    if (Array.isArray(data)) {
        res.render('admin/vehicles', { vehicles: data });
    } else {
        res.render('admin/vehicles', { vehicles: [] });
    }
}

const newVehicle = async (req, res) => {
    res.render('admin/new-vehicle');
}

const createVehicle = async (req, res) => {
    try {
        // Verificar si se subió una imagen
        if (!req.file) {
            console.log(req.file);
            return res.status(400).render('admin/new-vehicle', { error: 'No se subió una imagen' });
        }

        // Crear el objeto de nuevo vehículo con los datos del formulario y la ruta de la imagen
        const newCar = {
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            available: req.body.available,
            transmission: req.body.transmission,
            fuel: req.body.fuel,
            doors: req.body.doors,
            passengers: req.body.passengers,
            luggage: req.body.luggage,
            type: req.body.type,
            image: req.file.filename // Ruta de la imagen
        };

        // Subir imagen
        newCar.image = req.file.path.replace(/\\/g, '/');

        // Llamar a la función para enviar los datos al servidor API
        const data = await setApiData('http://localhost:3000/api/v1/create-car', newCar);

        // Redirigir si la creación del vehículo fue exitosa
        if (data) {
            return res.redirect('/admin/vehicles');
        } else {
            // Renderizar nuevamente el formulario si falla la creación del vehículo
            return res.render('admin/new-vehicle');
        }
    } catch (error) {
        console.error("Error al crear el vehículo:", error);
        return res.status(500).send("Error interno del servidor.");
    }
};


module.exports = {
    getVehicles,
    adminVehicles,
    newVehicle,
    createVehicle
}