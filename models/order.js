const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Order = sequelize.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        unique: true,
    },
    category: {
        type: Sequelize.STRING,
        unique: true,
    }
});

module.exports = Order;