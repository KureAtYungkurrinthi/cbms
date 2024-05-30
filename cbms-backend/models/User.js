const {DataTypes} = require('sequelize');
const sequelize = require('../lib/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id'
    }, name: {
        type: DataTypes.STRING, allowNull: false
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
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at'
    }, updatedAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at'
    }
}, {
    tableName: 'users'
});

module.exports = User;