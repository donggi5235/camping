require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const campsitesRouter = require('./routes/campsites');
const reservationsRouter = require('./routes/reservations');

const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/api/campsites', campsitesRouter);
app.use('/api/reservations', reservationsRouter);

// 데이터베이스 연결 확인 및 서버 시작
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    
    // 개발 환경에서만 테이블 재생성
    if (process.env.NODE_ENV === 'development') {
      sequelize.sync({ force: false }) // force: true는 테이블을 삭제 후 재생성
        .then(() => {
          console.log('Database synced');
          startServer();
        })
        .catch(err => console.error('Sync error:', err));
    } else {
      startServer();
    }
  })
  .catch(err => console.error('Connection error:', err));

function startServer() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});