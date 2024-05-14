const { getApiData } = require("../utils/api.util")

const getOffices = async (req, res) => {
    try {
        const data = await getApiData('http://localhost:3000/api/v1/get-offices');
        if (Array.isArray(data)) {
            res.render('offices', { array: data });
        } else {
            console.log('Data no es un array');
            res.render('offices', { array: data });
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


module.exports = {
    getOffices,
    adminOffices
}