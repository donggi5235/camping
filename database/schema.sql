CREATE DATABASE IF NOT EXISTS camping_reservation;
USE camping_reservation;

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

-- 예약 테이블
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campsite_id INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  guests INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campsite_id) REFERENCES campsites(id)
);

-- 초기 데이터 삽입
INSERT INTO campsites (name, description, location, price_per_night, capacity, amenities, image_url)
VALUES 
('파인 포레스트', '아름다운 숲 속의 캠핑장', '강원도 평창군', 50000, 4, '전기, 온수, 화장실, 샤워장', 'https://example.com/image1.jpg'),
('써니 비치', '바다가 보이는 캠핑장', '부산광역시 해운대구', 70000, 6, '바베큐장, 수영장, 와이파이', 'https://example.com/image2.jpg'),
('마운틴 뷰', '산 정상의 전망을 즐길 수 있는 캠핑장', '경상북도 청송군', 60000, 5, '난방시설, 주방용품, 개수대', 'https://example.com/image3.jpg');