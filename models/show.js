const Sequelize = require('sequelize');

module.exports = class Show extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            performanceDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalSeats: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            remainingSeats: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'),
                defaultValue: 'UPCOMING'
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Show',
            tableName: 'shows',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Show.hasMany(db.Reservation, { foreignKey: 'showId', sourceKey: 'id' });
    }
};