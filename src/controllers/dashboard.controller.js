const { getApiData } = require('../utils/api.util');

const getDashboard = async (req, res) => {
    // Datos
    const vehicles = await getApiData('http://localhost:3000/api/v1/get-cars');
    const offices = await getApiData('http://localhost:3000/api/v1/get-offices');
    const clients = await getApiData('http://localhost:3000/api/v1/get-clients');
    const reservations = await getApiData('http://localhost:3000/api/v1/get-reservations');
    res.render('dashboard', { vehicles, offices, clients, reservations });
}


module.exports = {
    getDashboard
}
