const {DataTypes} = require('sequelize');
const sequelize = require('../lib/database');

const {Meeting} = require("./Meeting");
const User = require('./User');

const Agenda = sequelize.define('Agenda', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'agenda_id'
    }, meetingId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'meeting_id', references: {
            model: Meeting, key: 'id'
        }
    }, position: {
        type: DataTypes.INTEGER, allowNull: false
    }, heading: {
        type: DataTypes.STRING, allowNull: false
    }, content: {
        type: DataTypes.TEXT
    }, duration: {
        type: DataTypes.INTEGER
    }, presenterId: {
        type: DataTypes.INTEGER, field: 'presenter_id', references: {
            model: User, key: 'id'
        }
    }, createdAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at'
    }, updatedAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at'
    }
}, {
    tableName: 'agendas'
});

Meeting.hasMany(Agenda, {foreignKey: 'meetingId', onDelete: 'SET NULL'});
Agenda.belongsTo(Meeting, {foreignKey: 'meetingId', onDelete: 'SET NULL'});

User.hasMany(Agenda, {foreignKey: 'presenterId'});
Agenda.belongsTo(User, {foreignKey: 'presenterId'});

module.exports = {Agenda, Meeting, User};