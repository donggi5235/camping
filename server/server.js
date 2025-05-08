require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 캠핑장 목록 조회
app.get('/api/campsites', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campsites');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 캠핑장 상세 정보 조회
app.get('/api/campsites/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campsites WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Campsite not found');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 예약 생성
app.post('/api/reservations', async (req, res) => {
  try {
    const { campsite_id, user_name, user_phone, user_email, start_date, end_date, guests } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO reservations (campsite_id, user_name, user_phone, user_email, start_date, end_date, guests) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [campsite_id, user_name, user_phone, user_email, start_date, end_date, guests]
    );
    
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});