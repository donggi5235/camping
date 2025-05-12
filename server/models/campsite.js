const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Campsite = sequelize.define('Campsite', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    price_per_night: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      },
      precision: 10,
      scale: 2
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    }
  }, {
    tableName: 'campsites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Campsite;
};