const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');

const CampsiteModel = require('./campsite');
const ReservationModel = require('./reservation');
const UserModel = require('./user');

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
const User = UserModel(sequelize);

// 모델 관계 설정
Campsite.hasMany(Reservation, { foreignKey: 'campsite_id' });
Reservation.belongsTo(Campsite, { foreignKey: 'campsite_id' });

User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  Campsite,
  Reservation,
  User
};