// src/components/Banner.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./css/Banner.css"

function Banner({ images }) {
  const settings = {
    dots: true, // Hiển thị các chấm điều khiển bên dưới
    infinite: true, // Lặp lại các ảnh
    speed: 100, // Tốc độ chuyển ảnh
    slidesToShow: 1, // Số lượng ảnh hiển thị mỗi lần
    slidesToScroll: 1, // Số lượng ảnh di chuyển mỗi lần
    autoplay: true, // Tự động chạy
    autoplaySpeed: 3000, // Thời gian chuyển giữa các ảnh (2000ms = 2 giây)
  };

  return (
    <section style={styles.banner}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Banner ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

const styles = {
  banner: {
    marginBottom: '20px',
    background: '#fff',
  },
  image: {
    display: 'block', // Đảm bảo ảnh không bị căn lề
    marginLeft: 'auto', // Căn trái tự động
    marginRight: 'auto', // Căn phải tự động
    width: '40%', // Chiều rộng ảnh (bạn có thể điều chỉnh)
    height: '200px', // Chiều cao ảnh
    objectFit: 'cover', // Đảm bảo ảnh không bị méo
  },
};

export default Banner;
