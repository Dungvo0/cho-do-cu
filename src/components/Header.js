import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {  IoHome, IoLogOut } from "react-icons/io5";
import { HiBellAlert } from "react-icons/hi2";
import { auth } from '../firebaseConfig'; // Import Firebase Auth
import { FcSearch } from "react-icons/fc";


const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState(''); // State để lưu giá trị ô tìm kiếm

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Cleanup listener khi component unmount
  }, []);

  const handleCreateNew = () => {
    if (currentUser) {
      navigate('/create'); // Điều hướng khi đăng nhập
    } else {
      alert('Vui lòng đăng nhập trước!');
    }
  };

  const handleChat = () => {
    if (currentUser) {
      navigate('/ChatList'); // Điều hướng khi đăng nhập
    } else {
      alert('Vui lòng đăng nhập trước!');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Đăng xuất người dùng khỏi Firebase
      setCurrentUser(null); // Xóa thông tin người dùng khỏi state
      alert('Bạn đã đăng xuất thành công!');
      navigate('/'); // Điều hướng về trang chủ
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
      alert('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại!');
    }
  };
  const handleHome = () => {
    if (currentUser) {
      navigate('/'); // Điều hướng trang home
    } else {
      alert('lỗi thông tin vui lòng thử laị sau!!! ');
    }
  };

  const handleProfile = () => {
    if (currentUser) {
      navigate('/profile'); // Điều hướng khi đăng nhập
    } else {
      alert('Vui lòng đăng nhập trước!');
    }
  };
  const handleNotificationClick = () => {
    navigate('/Notification');
  };
  const handleLogin = () => {
    navigate('/login'); // Luôn điều hướng đến trang đăng nhập
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchInput); // Truyền giá trị tìm kiếm qua prop onSearch
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <nav className="header-nav">
          <h3 title="Home"><IoHome onClick={handleHome}/> Chợ đồ cũ: "Cũ người mới ta!!!"</h3>
        </nav>
        <div className="header-actions">
          <input 
            type="text" 
            className="header-search" 
            placeholder="Tìm kiếm sản phẩm ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Cập nhật state khi nhập
          />
          <button className="header-search-btn" onClick={handleSearch}>
            <i className="fas fa-search"><FcSearch /></i>
          </button>
        </div>
        <div className="header-user">
          <button className="header-btn" onClick={handleCreateNew} disabled={!currentUser}>
            Đăng Tin 
          </button>
          {currentUser ? (
            <>
              {/* Hiển thị tên tài khoản */}
              <div
                className="header-user-info"
                onClick={handleProfile}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                <FaUserCircle title="Thông tin cá nhân" style={{ fontSize: '2.5rem' }} />
                <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0', color: '#333' }}>
                  {currentUser.displayName || currentUser.email}
                </p>
              </div>
              <div
                className="header-logout-icon"
                onClick={handleLogout}
                style={{
                  cursor: 'pointer',
                  fontSize: '2.5rem',
                }}
              >
                <IoLogOut title="Đăng xuất"/>
              </div>
            </>
          ) : (
            <button className="Login-btn" onClick={handleLogin}>
              Đăng Nhập
            </button>
          )}
          <div
            className="header-chat-icon"
            onClick={handleChat}
            style={{
              cursor: currentUser ? 'pointer' : 'not-allowed',
              fontSize: '2.5rem',
              opacity: currentUser ? 1 : 0.5,
            }}
          >
            <IoChatboxEllipsesOutline title="Danh sách tin nhắn"/>
          </div>
          <div
            className="header-bell-icon"
            onClick={handleNotificationClick}
            style={{
              cursor: currentUser ? 'pointer' : 'not-allowed',
              fontSize: '2.5rem',
              opacity: currentUser ? 1 : 0.5,
            }}
          >
           <div ><HiBellAlert  title="Thông báo" /></div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-links">
          <button onClick={() => navigate('/bat-dong-san')}>Bất động sản</button>
          <button onClick={() => navigate('/xe-co')}>Xe cộ</button>
          <button onClick={() => navigate('/do-dien-tu')}>Đồ điện tử</button>
          <button onClick={() => navigate('/do-gia-dung')}>Đồ gia dụng</button>
          <button onClick={() => navigate('/thoi-trang')}>Thời trang</button>
          <button onClick={() => navigate('/the-thao')}>Thể thao</button>
          <button onClick={() => navigate('/khac')}>Khác</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
