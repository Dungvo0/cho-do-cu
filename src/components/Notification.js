import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Firebase config của bạn
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import "./css/Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // State lưu danh sách thông báo
  const [loading, setLoading] = useState(true); // State hiển thị trạng thái tải dữ liệu
  const [userEmail, setUserEmail] = useState(""); // Email của người dùng hiện tại

  // Lấy thông báo từ Firestore
  const fetchNotifications = async (email) => {
    try {
      const q = query(
        collection(db, "notifications"),
        where("email", "==", email), // Lọc thông báo theo email của người dùng
        orderBy("timestamp", "desc") // Sắp xếp theo timestamp từ mới nhất
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thông báo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser; // Lấy người dùng hiện tại
    if (user) {
      const email = user.email; // Lấy email của người dùng hiện tại
      setUserEmail(email); // Cập nhật email trong state
      fetchNotifications(email); // Lấy thông báo cho email người dùng
    } else {
      setLoading(false);
      console.error("Chưa đăng nhập!");
    }
  }, []);

  return (
    <div className="notifications">
      <h1>Thông báo của bạn</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : notifications.length === 0 ? (
        <p>Không có thông báo nào.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <p className="message">{notification.message}</p>
              <p className="timestamp">
                {new Date(notification.timestamp).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
