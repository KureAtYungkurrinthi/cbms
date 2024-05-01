const {DataTypes} = require('sequelize');
const sequelize = require('../lib/database');

const Room = require('./Room');
const User = require('./User');

const Meeting = sequelize.define('Meeting', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'meeting_id'
    }, title: {
        type: DataTypes.STRING, allowNull: false
    }, startTime: {
        type: DataTypes.DATE, allowNull: false, field: 'start_time'
    }, endTime: {
        type: DataTypes.DATE, allowNull: false, field: 'end_time'
    }, roomId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'room_id', references: {
            model: Room, key: 'id',
        },
    }, notes: {
        type: DataTypes.STRING
    }, createdAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at'
    }, updatedAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at'
    }
}, {
    tableName: 'meetings'
});

const Attendee = sequelize.define('Attendee', {
    meetingId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'meeting_id', references: {
            model: Meeting, key: 'id',
        },
    }, userId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'user_id', references: {
            model: User, key: 'id',
        },
    }, isPresenter: {
        type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_presenter'
    }, createdAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at'
    }, updatedAt: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at'
    }
}, {
    tableName: 'attendees'
});

Room.hasMany(Meeting);
Meeting.belongsTo(Room);

User.belongsToMany(Meeting, {through: Attendee});

module.exports = {Meeting, Attendee}