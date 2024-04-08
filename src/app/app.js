const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
// Rutas
const carRouter = require('../routes/car.routes');
const clientRouter = require('../routes/client.routes')
const reservationRouter = require('../routes/reservation.routes');

const app = express();

// Creamos la funcion para obtener los datos de la API
const getApiData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// pasamos el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));



// Middlewares 
app.use(morgan('dev'));
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));

// Rutas para la vista
app.get('/',async (req,res)=>{
    // Obtenemos los datos de la API
    const data = await getApiData('http://localhost:3000/api/v1/get-cars');
    console.log(data);
    // Renderizamos la vista y pasamos los datos
    res.render('index', { array: data});
});

app.get('/cars', async (req, res) => {
    // Obtenemos los datos de la API
    const data = await getApiData('http://localhost:3000/api/v1/get-cars');
    // Comprobamos si data es un array
    if (Array.isArray(data)) {
        // Renderizamos la vista y pasamos los datos
        res.render('vehiculos', { array: data });
    } else {
        console.log('Data no es un array');
        res.render('vehiculos', { array: data });
    }
});

// Rutas de la API
app.use('/api/v1', carRouter);
app.use('/api/v1', clientRouter);
app.use('/api/v1', reservationRouter);

module.exports = app;