const { getApiData, setApiData, updateApiData, deleteApiData } = require("../utils/api.util")

const getOffices = async (req, res) => {
    try {
        const data = await getApiData('http://localhost:3000/api/v1/get-offices');
        if (Array.isArray(data)) {
            res.render('offices', { offices: data });
        } else {
            console.log('Data no es un array');
            res.render('offices', { offices: data });
        }
    } catch (error) {
        console.error('An error occurred getting the offices', error);
    }
}

// Funciones para el administrador
const adminOffices = async(req, res) => {
    const data = await getApiData('http://localhost:3000/api/v1/get-offices');
    if (Array.isArray(data)) {
        res.render('admin/offices', { offices: data });
    } else {
        console.log('Data no es un array');
        res.render('admin/offices', { offices: data });
    }
}

// Funciones del administrador
const newOffice = (req, res) => {
    res.render('admin/new-office');
}

const createOffice = async (req, res) => {
    const { name, address, phone, opening_time, latitude, longitude } = req.body;
    try {
        const data = await setApiData('http://localhost:3000/api/v1/create-office', { name, address, phone, opening_time, latitude, longitude });
        if (data.id) {
            res.redirect('/admin/offices');
        } else {
            console.log('Error creating office');
            res.redirect('/admin/new-office');
        }
    }
    catch (error) {
        console.error('An error occurred creating the office', error);
    }
}


module.exports = {
    getOffices,
    adminOffices,
    newOffice,
    createOffice
}