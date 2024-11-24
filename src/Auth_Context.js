import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Đường dẫn đến cấu hình Firebase

// Tạo Context
const AuthContext = createContext();

// Provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe thay đổi trạng thái đăng nhập
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Cập nhật người dùng hiện tại
      setLoading(false);
    });

    // Cleanup listener khi component bị unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
