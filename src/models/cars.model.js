const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

// Define the Car model
class Car extends Model { }
// Agrefamos un campo para la imagen del carro
Car.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    transmission: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fuel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doors: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    passengers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    luggage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { sequelize, modelName: 'car' });

module.exports = Car;

// // método para testear la conexión a la base de datos, se usa una función autoejecutable
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully :) we are the best');
//     } catch (err) {
//         console.error('Unable to connect to the database :( we did something wrong', err);
//     }
// })();

// método para sincronizar la base de datos, sin borrado de datos
// (async () => {
//     try {
//         await sequelize.sync();
//         console.log('Database synchronized successfully :)');
//     } catch (err) {
//         console.error('Unable to synchronize the database :( we did something wrong', err);
//     }
// })();

