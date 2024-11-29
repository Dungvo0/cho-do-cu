import React, { useState } from 'react';
import './css/Login.css';
import { auth, googleProvider, db } from '../firebaseConfig'; 
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Đăng nhập bằng email và mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Lấy thông tin người dùng từ Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData?.role === 'admin') {
        navigate('/admin'); // Chuyển hướng tới trang Admin
      } else {
        navigate('/'); // Chuyển hướng tới trang Home
      }

      alert(`Đăng nhập thành công, chào mừng ${user.email}!`);
    } catch (error) {
      console.error('Lỗi đăng nhập bằng email/password:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  // Đăng nhập bằng Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Lấy thông tin người dùng từ Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData?.role === 'admin') {
        navigate('/admin'); // Chuyển hướng tới trang Admin
      } else {
        navigate('/'); // Chuyển hướng tới trang Home
      }

      // Cập nhật thông tin người dùng trong Firestore
      await setDoc(
        doc(db, 'users', user.uid),
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          lastLogin: new Date(),
        },
        { merge: true }
      );

      alert(`Chào mừng, ${user.displayName}!`);
    } catch (error) {
      console.error('Lỗi khi đăng nhập với Google:', error);
      alert('Đăng nhập với Google thất bại.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng Nhập</h2>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Đăng Nhập</button>

        <div className="google-signin" onClick={handleGoogleSignIn}>
          <h4>G</h4><span>Đăng nhập với Google</span>
        </div>

        <p className="signup-text">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
