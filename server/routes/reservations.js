const express = require('express');
const router = express.Router();
const { Campsite, Reservation, User } = require('../models');
const { validationResult, body } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth');

// 예약 생성 (인증 필요)
router.post('/', 
  authMiddleware,
  [
    body('campsite_id').isInt().withMessage('Invalid campsite ID'),
    body('start_date').isDate().withMessage('Invalid start date'),
    body('end_date').isDate().withMessage('Invalid end date'),
    body('guests').isInt({ min: 1 }).withMessage('At least 1 guest required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const campsite = await Campsite.findByPk(req.body.campsite_id);
      if (!campsite) {
        return res.status(404).json({ error: 'Campsite not found' });
      }

      if (req.body.guests > campsite.capacity) {
        return res.status(400).json({ error: 'Exceeds campsite capacity' });
      }

      const reservation = await Reservation.create({
        campsite_id: req.body.campsite_id,
        user_id: req.user.id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        guests: req.body.guests,
        special_requests: req.body.special_requests || null
      });

      res.status(201).json(reservation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// 사용자 예약 목록 조회 (인증 필요)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Campsite, attributes: ['id', 'name', 'location', 'image_url'] }
      ],
      order: [['start_date', 'DESC']]
    });
    
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 예약 상세 조회 (인증 필요)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      where: { 
        id: req.params.id,
        user_id: req.user.id 
      },
      include: [
        { model: Campsite, attributes: ['id', 'name', 'location', 'image_url'] },
        { model: User, attributes: ['id', 'name', 'email', 'phone'] }
      ]
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found or not authorized' });
    }

    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;