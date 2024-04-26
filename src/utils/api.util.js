const axios = require('axios');

const getApiData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("An error occurred");
    }
}

const setApiData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log("An error occurred");
    }
}

module.exports = { 
    getApiData,
    setApiData
};