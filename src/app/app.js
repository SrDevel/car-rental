const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { verifyToken } = require('../security/jwt.config');

// Configuración de variables de entorno y middlewares de express para parsear datos de formularios y cookies
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
const logoutController = require('../controllers/logout.controller');

// Inicializamos la app de express
const app = express();

// Configuración de la app
app.use(cookieParser());

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
app.get('/dashboard', verifyToken, dashboardController.getDashboard);
app.get('/logout', logoutController.logout);

// Rutas para el administrador
app.get('/admin/vehicles', verifyToken, carController.adminVehicles);


// Rutas de la API
app.use('/api/v1', carRouter);
app.use('/api/v1', clientRouter);
app.use('/api/v1', reservationRouter);
app.use('/api/v1', officeRouter);
app.use('/api/v1', userRouter);

module.exports = app;
