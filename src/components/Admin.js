import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import './css/Admin.css';

const Admin = () => {
  const [waitingPosts, setWaitingPosts] = useState([]); // Bài đăng chờ duyệt
  const [approvedPosts, setApprovedPosts] = useState([]); // Bài đăng đã duyệt
  const [users, setUsers] = useState([]); // Quản lý tài khoản

  // Lấy dữ liệu bài đăng từ Firestore
  const fetchPosts = async () => {
    try {
      const waitingSnapshot = await getDocs(collection(db, 'waitingApproval'));
      const approvedSnapshot = await getDocs(collection(db, 'approvedPosts'));

      const waitingData = waitingSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const approvedData = approvedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWaitingPosts(waitingData);
      setApprovedPosts(approvedData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu bài đăng:', error);
    }
  };

  // Lấy danh sách người dùng từ Firestore
  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const userData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userData);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  // Phê duyệt bài đăng
  const approvePost = async (post) => {
    try {
      await addDoc(collection(db, 'approvedPosts'), post); // Thêm bài vào collection approvedPosts
      await deleteDoc(doc(db, 'waitingApproval', post.id)); // Xóa bài khỏi collection waitingApproval
      await sendNotification(
        post.email,
        `Bài đăng "${post.title}" của bạn đã được phê duyệt!`
      );
      alert('Phê duyệt bài thành công!');
      fetchPosts(); // Cập nhật dữ liệu
    } catch (error) {
      console.error('Lỗi khi phê duyệt bài:', error);
    }
  };

  // Xóa bài đăng
  const deletePost = async (collectionName, postId, userEmail, postTitle) => {
    try {
      await deleteDoc(doc(db, collectionName, postId)); // Xóa tài liệu khỏi Firestore
  
      // Cập nhật danh sách bài đăng trong state
      if (collectionName === 'approvedPosts') {
        setApprovedPosts((prev) => prev.filter((post) => post.id !== postId));
      } else if (collectionName === 'waitingApproval') {
        setWaitingPosts((prev) => prev.filter((post) => post.id !== postId));
      }
  
      await sendNotification(
        userEmail,
        `Bài đăng "${postTitle}" của bạn đã bị xóa.`
      );
      alert('Xóa bài đăng thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
    }
  };
  // Gửi thông báo đến người dùng
  const sendNotification = async (userEmail, message) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        email: userEmail,
        message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
    }
  };

  // Xóa người dùng
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId)); // Xóa tài liệu khỏi Firestore
      alert('Xóa tài khoản thành công!');
      fetchUsers(); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error);
    }
  };

  // Fetch dữ liệu khi component được render
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  return (
    <div className="admin">
      <h1> Admin </h1>

      {/* Quản lý bài đăng chờ duyệt */}
      <div className="section">
        <h2>Bài đăng chờ duyệt</h2>
        {waitingPosts.length === 0 ? (
          <p>Không có bài đăng chờ duyệt.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Hình ảnh</th>
                <th>Người đăng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {waitingPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    {post.imageBase64 && (
                      <img
                        src={post.imageBase64}
                        alt="Post"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td>{post.email}</td>
                  <td>
                    <button onClick={() => approvePost(post)}>Phê duyệt</button>
                    <button
                      onClick={() =>
                        deletePost('waitingApproval', post.id, post.email, post.title)
                      }
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quản lý bài đã duyệt */}
      <div className="section">
        <h2>Bài đã duyệt</h2>
        {approvedPosts.length === 0 ? (
          <p>Không có bài đã duyệt.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Hình ảnh</th>
                <th>Người đăng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {approvedPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    {post.imageBase64 && (
                      <img
                        src={post.imageBase64}
                        alt="Post"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td>{post.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        deletePost('approvedPosts', post.id, post.email, post.title)
                      }
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quản lý tài khoản */}
      <div className="section">
        <h2>Quản lý tài khoản</h2>
        {users.length === 0 ? (
          <p>Không có tài khoản nào.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => deleteUser(user.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
