const axios = require('axios');

const getApiData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("Ha ocurrido un error durante la petición (GET)", error);
    }
}

const setApiData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log("Ha ocurrido un error durante la petición (POST)", error);
    }
}

const updateApiData = async (url, data) => {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        console.log("Ha ocurrido un error durante la petición (PUT)", error);
    }
}

const deleteApiData = async (url) => {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.log("Ha ocurrido un error durante la petición (DELETE)", error);
    }
}

module.exports = { 
    getApiData,
    setApiData,
    updateApiData,
    deleteApiData
};