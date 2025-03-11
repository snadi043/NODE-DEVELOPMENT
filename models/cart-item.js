const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Cart = require('./cart');

const CartItem = sequelize.define('cart-item', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = CartItem;