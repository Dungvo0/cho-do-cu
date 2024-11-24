// src/App.js
import React, { useState } from 'react'; // Import useState để quản lý state
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CreateNew from './components/CreateNew';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs';
import About from './components/About';
import Admin from './components/Admin';
import Chat from './components/Chat';

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State lưu từ khóa tìm kiếm
  const location = useLocation();

  // Ẩn Header và Footer trên các trang Login và CreateNew
  const hideHeaderFooter = ["/login", "/create", "/admin", "/profile", "/register"].includes(location.pathname.toLowerCase());

  const images = [
    'http://surl.li/mwozah',
    'http://surl.li/tvbfmb',
    'http://surl.li/rujqjn',
    'http://surl.li/emcdab',
    'http://surl.li/uugwme',
    'http://surl.li/uzuzya',
    'https://gstatic.gvn360.com/2023/04/Ghostblade_-17.jpg',
    'https://gstatic.gvn360.com/2023/04/Ghostblade_-19.jpg',
  ];

  return (
    <div>
      {/* Truyền setSearchQuery vào Header */}
      {!hideHeaderFooter && <Header onSearch={setSearchQuery} />}
      {!hideHeaderFooter && <Banner images={images} />}

      <Routes>
        {/* Truyền searchQuery vào Home */}
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
