const {DataTypes} = require('sequelize');
const sequelize = require('../lib/database');

const User = sequelize.define('User', {
    id: {
        field: 'user_id', type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    }, name: {
        type: DataTypes.STRING, allowNull: false,
    }, email: {
        type: DataTypes.STRING, allowNull: false, validate: {
            isEmail: true
        }
    }, role: {
        type: DataTypes.ENUM('admin', 'member'), allowNull: false
    }, hash: {
        type: DataTypes.CHAR(128), allowNull: false
    }, salt: {
        type: DataTypes.CHAR(32), allowNull: false
    }, token: {
        type: DataTypes.CHAR(128), allowNull: true
    }, createdAt: {
        field: 'created_at', type: DataTypes.DATE, defaultValue: DataTypes.NOW
    }, updatedAt: {
        field: 'updated_at', type: DataTypes.DATE, defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users'
});

module.exports = User;