const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Office extends Model { }

Office.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        opening_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false
        }
    },{sequelize, modelName: 'office'}
);

module.exports = Office;

// (async () =>{
//    try {
//         await sequelize.sync({force: true});
//         console.log('Modelo Office sincronizado');
//    } catch (error) {
//          console.error(error);
//          console.warn('Error al sincronizar el modelo Office');
//     }
// })();