const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Show = require('./show');
const Reservation = require('./reservation');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Comment,
    Show,
    Reservation
};

User.init(sequelize);
Comment.init(sequelize);
Show.init(sequelize);
Reservation.init(sequelize);

User.associate(db);
Comment.associate(db);
Show.associate(db);
Reservation.associate(db);

module.exports = db;
