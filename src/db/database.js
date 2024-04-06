const Sequelize = require('sequelize');

const sequelize = new Sequelize('car_rental','root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;