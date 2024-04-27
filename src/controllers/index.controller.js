const { getApiData, setApiData } = require("../utils/api.util");

const getIndex = async (req, res) => {
    try {
        const data = await getApiData('http://localhost:3000/api/v1/get-offices');
        res.render('index', { array: data });
    } catch (error) {
        console.error('An error occurred getting the index', error);
    }
}

module.exports = {
    getIndex
}