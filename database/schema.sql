-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS camping_reservation;
USE camping_reservation;

-- 사용자 테이블
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 캠핑장 테이블
CREATE TABLE campsites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  capacity INT NOT NULL,
  amenities TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 예약 테이블 (user_id 추가)
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campsite_id INT NOT NULL,
  user_id INT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  guests INT NOT NULL,
  special_requests TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (campsite_id) REFERENCES campsites(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 초기 데이터 삽입 (테스트용)
INSERT INTO users (name, email, password, phone, role) VALUES
('관리자', 'admin@example.com', '$2a$10$xJwL5v6JzrJm9UZDW5TZU.EY7X7qo7b7p2Qg5YJjvRvNQ3q1Jjz1K', '010-1234-5678', 'admin'),
('일반 사용자', 'user@example.com', '$2a$10$xJwL5v6JzrJm9UZDW5TZU.EY7X7qo7b7p2Qg5YJjvRvNQ3q1Jjz1K', '010-9876-5432', 'user');

-- 비밀번호는 모두 'password123'으로 암호화된 값입니다.

INSERT INTO campsites (name, description, location, price_per_night, capacity, amenities, image_url) VALUES
('파인 포레스트', '아름다운 숲 속의 캠핑장', '강원도 평창군', 50000, 4, '전기, 온수, 화장실, 샤워장', 'https://example.com/image1.jpg'),
('써니 비치', '바다가 보이는 캠핑장', '부산광역시 해운대구', 70000, 6, '바베큐장, 수영장, 와이파이', 'https://example.com/image2.jpg'),
('마운틴 뷰', '산 정상의 전망을 즐길 수 있는 캠핑장', '경상북도 청송군', 60000, 5, '난방시설, 주방용품, 개수대', 'https://example.com/image3.jpg');

INSERT INTO reservations (campsite_id, user_id, start_date, end_date, guests, special_requests, status) VALUES
(1, 2, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 2, '애완동물 동반 가능한지 문의', 'confirmed'),
(2, 2, DATE_ADD(CURDATE(), INTERVAL 14 DAY), DATE_ADD(CURDATE(), INTERVAL 16 DAY), 4, NULL, 'pending');