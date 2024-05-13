const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/database');

class Office extends Model { }

Office.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
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

// (async () => {
//     try {
//         await  sequelize.sync({ force: true });
//         console.log('La tabla Office ha sido creada');
//     } catch (error) {
//         console.error('Error creando la tabla Office', error);
//     }
// })();