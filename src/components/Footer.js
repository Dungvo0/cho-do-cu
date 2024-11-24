import React from 'react';
import './css/Footer.css';
import { FaPhoneVolume   } from "react-icons/fa6";
import { MdEmail     } from "react-icons/md";


const Footer = () => {
  return (
    <footer className="footer bg-dark text-light text-center text-lg-start">
      <div className="footer-container container p-4">
        {/* Phần liên kết nhanh */}
        <div className="footer-section">
          <h5 className="text-uppercase">Về ChợĐồCũ</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="/about" className="text-light">Giới thiệu:</a></li>
            <li><a href="/terms" className="text-light">Điều khoản sử dụng</a></li>
            <li><a href="/privacy" className="text-light">Chính sách bảo mật</a></li>
            <li><a href="/help" className="text-light">Trợ giúp</a></li>
          </ul>
        </div>

        {/* Phần liên hệ */}
        <div className="footer-section">
          <h5 className="text-uppercase">Liên hệ:</h5>
          <ul className="list-unstyled mb-0">
            <li><span><MdEmail />  Email: support@chodocu.com</span></li>
            <li><span><FaPhoneVolume />  Điện thoại: +84 123 456 789</span></li>
            <li><span>Địa chỉ: TP Đà Nẵng, Việt Nam</span></li>
          </ul>
        </div>

        {/* Phần liên kết mạng xã hội */}
        <div className="footer-section">
          <h5 className="text-uppercase">Theo dõi chúng tôi:</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="https://www.facebook.com/tiendung.vo.5203" className="text-light">Facebook</a></li>
            <li><a href="https://instagram.com" className="text-light">Instagram</a></li>
            <li><a href="https://twitter.com" className="text-light">Twitter</a></li>
          </ul>
        </div>

        {/* Phần tải ứng dụng */}
        <div className="footer-section">
          <h5 className="text-uppercase">Tải ứng dụng tại:</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="/appstore" className="text-light">App Store</a></li>
            <li><a href="/playstore" className="text-light">Google Play</a></li>
          </ul>
        </div>
      </div>

      {/* Phần bản quyền */}
      <div className="text-center p-3 bg-secondary">
        © 2025 ChợĐồCũ. All rights reserved. 
        <a className="text-light" href="https://chotot.com/"> .com</a>
      </div>
    </footer>
  );
};

export default Footer;
