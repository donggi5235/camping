const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    },
    special_requests: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    modelName: "Reservation",
    tableName: 'reservations',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: "utf8",
    collate: "utf8_general_ci",
  });

  return Reservation;
};