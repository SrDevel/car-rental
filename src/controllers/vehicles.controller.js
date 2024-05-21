const { getApiData, setApiData, updateApiData, deleteApiData } = require("../utils/api.util")

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
    const data = await getApiData('http://localhost:3000/api/v1/get-offices');
    if (Array.isArray(data)) {
        res.render('admin/new-vehicle', { offices: data });
    } else {
        res.render('admin/new-vehicle', { offices: [] });
    }
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
            image: req.file.filename, // Ruta de la imagen
            officeId: req.body.officeId
        };

        // Subir imagen, reemplazar las barras invertidas por barras normales para que se pueda leer en el navegador
        newCar.image = req.file.path.replace(/\\/g, '/');

        const data = await setApiData('http://localhost:3000/api/v1/create-car', newCar);

        if (data) {
            return res.redirect('/admin/vehicles');
        } else {
            return res.render('admin/new-vehicle');
        }
    } catch (error) {
        console.error("Error al crear el vehículo:", error);
        return res.status(500).send("Error interno del servidor.");
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await deleteApiData(`http://localhost:3000/api/v1/delete-car/${id}`);
        if (data) {
            return res.redirect('/admin/vehicles?deleted=true');
        } else {
            return res.redirect('/admin/vehicles?deleted=false');
        }
    } catch (error) {
        console.error("Error al eliminar el vehículo:", error);
        return res.status(500).send("Error interno del servidor.");
    }
}

const getVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getApiData(`http://localhost:3000/api/v1/get-car/${id}`);
        const offices = await getApiData('http://localhost:3000/api/v1/get-offices');
        if (data && offices) {
            return res.render('admin/update-vehicle', { 
                vehicle: data,
                offices: offices
             });
        } else {
            return res.redirect('/admin/vehicles');
        }
    } catch (error) {
        console.error("Error al obtener el vehículo:", error);
        return res.status(500).send("Error interno del servidor.");
    }
}

const updateVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await updateApiData(`http://localhost:3000/api/v1/update-car/${id}`, req.body);
        if (data) {
            return res.redirect('/admin/vehicles?updated=true');
        } else {
            return res.redirect('/admin/vehicles?updated=false');
        }
    } catch (error) {
        console.error("Error al actualizar el vehículo:", error);
        return res.status(500).send("Error interno del servidor.");
    }
}

module.exports = {
    getVehicles,
    adminVehicles,
    newVehicle,
    createVehicle,
    deleteVehicle,
    getVehicle,
    updateVehicle
}