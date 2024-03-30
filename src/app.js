const express = require('express');
const { config } = require('dotenv');
const mysql = require('mysql');
const bodyParser = require('body-parser');
config();


// Configuaracción del servidor y su uso para MIDLEWARE
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Conexión exitosa a la base de datos');
    }
});



