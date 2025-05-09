module.exports = (sequelize, DataTypes) => {
  const Campsite = sequelize.define('Campsite', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
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
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'campsites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Campsite;
};