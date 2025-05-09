const { Sequelize } = require('sequelize');
const config = require('../config/config');
const CampsiteModel = require('./campsite');
const ReservationModel = require('./reservation');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool
  }
);

const Campsite = CampsiteModel(sequelize);
const Reservation = ReservationModel(sequelize);

// 모델 관계 설정
Campsite.hasMany(Reservation, { foreignKey: 'campsite_id' });
Reservation.belongsTo(Campsite, { foreignKey: 'campsite_id' });

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  Sequelize,
  Campsite,
  Reservation,
  User
};