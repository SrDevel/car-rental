const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Office = require('./office.model');

// Define la clase Car que extiende de Model
class Car extends Model { }
// Agregramos un campo para el tipo de auto (carros | camionetas | furgonetas...)
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    officeId: {
        type: DataTypes.UUID,
        references: {
            model: Office, 
            key: 'id'
        }
    }
}, { sequelize, modelName: 'car' });

Car.belongsTo(Office);
Office.hasMany(Car);


module.exports = Car;

// (async () =>{
//     try {
//          await sequelize.sync({force: true});
//          console.log('Todos los modelos sincronizados');
//     } catch (error) {
//           console.error(error);
//           console.warn('Error al sincronizar los modelos');
//      }
//  })();