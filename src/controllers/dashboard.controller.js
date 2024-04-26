const { getApiData } = require('../utils/api.util');

const getDashboard = async (req, res) => {
    res.render('dashboard');
}

module.exports = {
    getDashboard
}
