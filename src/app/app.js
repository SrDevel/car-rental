const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = express.Router();

dotenv.config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Rutas
const carRouter = require('../routes/car.routes');
const clientRouter = require('../routes/client.routes')
const reservationRouter = require('../routes/reservation.routes');
const officeRouter = require('../routes/office.routes');
const userRouter = require('../routes/user.routes');


// Importamos los controladores
const carController = require('../controllers/vehicles.controller');
const loginController = require('../controllers/login.controller');
const dashboardController = require('../controllers/dashboard.controller');
const officeController = require('../controllers/offices.controller');
const indexController = require('../controllers/index.controller');

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
// Para poder leer los datos de los formularios, es necesario usar estos middlewares de express para parsear los datos de las peticiones
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas para la vista
app.get('/', indexController.getIndex);
app.get('/vehicles', carController.getVehicles);
app.get('/offices', officeController.getOffices);
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
app.get('/dashboard', dashboardController.getDashboard);


// Rutas de la API
app.use('/api/v1', carRouter);
app.use('/api/v1', clientRouter);
app.use('/api/v1', reservationRouter);
app.use('/api/v1', officeRouter);
app.use('/api/v1', userRouter);

module.exports = app;