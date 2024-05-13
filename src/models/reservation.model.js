const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Office = require('./office.model');
const Client = require('./client.model')



// class Reservation extends Model {}

// Reservation.init({
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//     },
//     start_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     end_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     total_price: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     car_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     office_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     driver_age: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     client_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
    
// }, { sequelize, modelName: "reservation"});

// Reservation.belongsTo(Office, { foreignKey: 'office_id' });
// Client.belongsTo(Office, { foreignKey: 'client_id' });

// module.exports = Reservation;

// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo Reservation sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo Reservation');
//     }
// })();