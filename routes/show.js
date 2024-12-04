const express = require('express');
const router = express.Router();
const { Show, Reservation, User, sequelize } = require('../models');
const Sequelize = require('sequelize');
const { isLoggedIn } = require('../middlewares/auth');

// 공연 목록 조회
router.get('/', async (req, res, next) => {
    try {
        const shows = await Show.findAll({
            where: {
                status: ['UPCOMING', 'ONGOING']
            },
            order: [['performanceDate', 'ASC']]
        });
        res.json(shows);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 예약 생성 - 인증 체크 추가
router.post('/:showId/reserve', isLoggedIn, async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const show = await Show.findOne({
            where: { id: req.params.showId },
            lock: t.LOCK.UPDATE,
            transaction: t
        });

        if (!show) {
            throw new Error('공연을 찾을 수 없습니다.');
        }

        if (show.remainingSeats < req.body.seatCount) {
            throw new Error('잔여 좌석이 부족합니다.');
        }

        // 테스트를 위해 임시로 userId를 하드코딩
        const reservation = await Reservation.create({
            userId: req.body.userId || 'testuser', // 테스트용 임시 userId
            showId: show.id,
            seatCount: req.body.seatCount,
            totalAmount: show.price * req.body.seatCount
        }, { transaction: t });

        await show.update({
            remainingSeats: show.remainingSeats - req.body.seatCount
        }, { transaction: t });

        await t.commit();
        res.json(reservation);
    } catch (err) {
        await t.rollback();
        console.error(err);
        next(err);
    }
});

module.exports = router; 