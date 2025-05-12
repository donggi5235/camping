const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: '인증에 실패했습니다.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };