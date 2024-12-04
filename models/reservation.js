const Sequelize = require('sequelize');

module.exports = class Reservation extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            reservationNumber: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                unique: true
            },
            seatCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalAmount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
                defaultValue: 'PENDING'
            },
            paymentStatus: {
                type: Sequelize.ENUM('WAITING', 'PAID', 'REFUNDED'),
                defaultValue: 'WAITING'
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Reservation',
            tableName: 'reservations',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Reservation.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
        db.Reservation.belongsTo(db.Show, { foreignKey: 'showId', targetKey: 'id' });
    }
}; 