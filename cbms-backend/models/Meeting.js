const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Room = require('./Room');
const Document = require('./Document');
const Agenda = require('./Agenda');
const User = require('./User');

class Meeting extends Model {
  static associate(models) {
    Meeting.belongsTo(models.Room, {
      foreignKey: 'roomId',
      onDelete: 'CASCADE'
    });
    Meeting.hasMany(models.Document, {
      foreignKey: 'meetingId',
      onDelete: 'CASCADE'
    });
    Meeting.hasMany(models.Agenda, {
      foreignKey: 'meetingId',
      onDelete: 'CASCADE'
    });
    Meeting.belongsTo(models.User, {
      foreignKey: 'created_by',
      onDelete: 'CASCADE'
    });
  }
}

class Meeting extends Model {
    static init(sequelize) {
      super.init(
        {
          start_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
              isBefore: 'end_time',
            },
          },
          end_time: {
            type: DataTypes.TIME,
            allowNull: false,
          },
        },
        
        {
          sequelize,
          modelName: 'Meeting',
        }
      );
    }
  }

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 255
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 255
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: true,
      max: 255
    },
    is_publish: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Meeting',
    timestamps: false
  }
);

module.exports = Meeting;