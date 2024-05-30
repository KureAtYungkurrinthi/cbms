const {DataTypes} = require('sequelize');
const sequelize = require('../lib/database');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'room_id'
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, location: {
        type: DataTypes.STRING, allowNull: false
    }, capacity: {
        type: DataTypes.INTEGER, allowNull: false
    }, createdAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at'
    }, updatedAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at'
    }
}, {
    tableName: 'rooms'
});

module.exports = Room;