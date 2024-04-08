const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Client extends Model {}

Client.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }   
}, { sequelize, modelName: 'client'});

module.exports = Client;

// (async () => {
//     try {
//         await sequelize.sync();
//         console.log('Client table created');
//     } catch (err) {
//         console.error('Error creating client table', err);
//     }
// })();
