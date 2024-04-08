const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Reservation extends Model {}

Reservation.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    office_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driver_age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
}, { sequelize, modelName: "reservation"});

module.exports = Reservation;

// (async () => {
//     try {
//         await sequelize.sync();
//         console.log('Client table created');
//     } catch (err) {
//         console.error('Error creating client table', err);
//     }
// })();