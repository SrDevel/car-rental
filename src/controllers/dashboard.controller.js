const { getApiData } = require('../utils/api.util');

const getDashboard = async (req, res) => {
    // Datos
    const vehicles = await getApiData('http://localhost:3000/api/v1/get-vehicles');
    const offices = await getApiData('http://localhost:3000/api/v1/get-offices');
    const clients = await getApiData('http://localhost:3000/api/v1/get-clients');
    res.render('dashboard', { vehicles, offices, clients });
}


module.exports = {
    getDashboard
}
