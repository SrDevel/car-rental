const { getApiData } = require("../utils/api.util")

const getVehicles = async (req, res) => {
    const data = await getApiData('http://localhost:3000/api/v1/get-cars');
    if (Array.isArray(data)) {
        res.render('vehicles', { array: data });
    } else {
        res.render('vehicles', { array: [] });
    }
}

module.exports = {
    getVehicles
}