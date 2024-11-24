import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';
import { auth, db } from '../firebaseConfig'; // Import Firebase Auth & Firestore
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore để lưu thông tin bổ sung

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    try {
      // Tạo tài khoản trên Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Cập nhật tên hiển thị trong Firebase Authentication
      await updateProfile(user, { displayName: name });

      // Lưu thông tin người dùng vào Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        uid: user.uid,
        createdAt: new Date(),
      });

      alert('Đăng ký thành công!');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      alert('Đã xảy ra lỗi trong quá trình đăng ký!');
    }
  };

  return (
    <div className="register-container">
      <h2>Tạo tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
      <p>Bạn đã có tài khoản? <a href="/login">Đăng nhập ở đây</a></p>
    </div>
  );
};

export default Register;
