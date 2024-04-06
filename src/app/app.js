const express = require('express');
const morgan = require('morgan');
// Rutas
const carRouter = require('../routes/car.routes');
const clientRouter = require('../routes/client.routes')

const app = express();

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.send('Start page');
});

app.use('/api/v1', carRouter);
app.use('/api/v1', clientRouter);

module.exports = app;