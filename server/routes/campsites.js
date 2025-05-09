const express = require('express');
const router = express.Router();
const { Campsite } = require('../models');
const { validationResult } = require('express-validator');

// 캠핑장 목록 조회
router.get('/', async (req, res) => {
  try {
    const campsites = await Campsite.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(campsites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 캠핑장 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const campsite = await Campsite.findByPk(req.params.id);
    if (!campsite) {
      return res.status(404).json({ error: 'Campsite not found' });
    }
    res.json(campsite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;