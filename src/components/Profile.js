import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './css/Profile.css';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [postsPending, setPostsPending] = useState([]); // Bài đăng chờ duyệt
  const [postsApproved, setPostsApproved] = useState([]); // Bài đăng đã duyệt
  const navigate = useNavigate();

  // Lấy thông tin người dùng
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Lấy bài viết chờ duyệt của người dùng
  useEffect(() => {
    if (currentUser) {
      const getPendingPosts = async () => {
        const q = query(collection(db, 'waitingApproval'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPostsPending(userPosts);
      };

      const getApprovedPosts = async () => {
        const q = query(collection(db, 'approvedPosts'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPostsApproved(userPosts);
      };

      getPendingPosts();
      getApprovedPosts();
    }
  }, [currentUser]);

  // Xóa bài viết
  const handleDelete = async (postId, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, postId));
      if (collectionName === 'waitingApproval') {
        setPostsPending(postsPending.filter((post) => post.id !== postId));
      } else {
        setPostsApproved(postsApproved.filter((post) => post.id !== postId));
      }
      alert('Bài viết đã bị xóa!');
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  // Chỉnh sửa bài viết
  const handleEdit = (postId, collectionName) => {
    navigate(`/edit/${collectionName}/${postId}`);
  };
  

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      <div className="profile-info">
        <p><strong>Tên hiển thị:</strong> {currentUser.displayName || 'Chưa cập nhật'}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>UID:</strong> {currentUser.uid}</p>
      </div>

      {/* Hiển thị bài đăng chờ duyệt */}
      <h2>Bài đăng đang chờ duyệt:</h2>
      <div className="posts-container">
        {postsPending.length === 0 ? (
          <p>Không có bài đăng nào đang chờ duyệt.</p>
        ) : (
          postsPending.map((post) => (
            <div key={post.id} className="post-item">
              <p><strong>Tiêu đề:</strong> {post.title}</p>
              <p><strong>Mô tả:</strong> {post.description}</p>
              <p><strong>Giá:</strong> {post.price}</p>
              <div className="post-actions">
              <button onClick={() => handleEdit(post.id, 'waitingApproval')}>Sửa</button>
                <button onClick={() => handleDelete(post.id, 'waitingApproval')}>Xóa</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Hiển thị bài đăng đã duyệt */}
      <h2>Bài đăng đã được duyệt:</h2>
      <div className="posts-container">
        {postsApproved.length === 0 ? (
          <p>Không có bài đăng nào đã được duyệt.</p>
        ) : (
          postsApproved.map((post) => (
            <div key={post.id} className="post-item">
              <p><strong>Tiêu đề:</strong> {post.title}</p>
              <p><strong>Mô tả:</strong> {post.description}</p>
              <p><strong>Giá:</strong> {post.price}</p>
              <div className="post-actions">
              <button onClick={() => handleEdit(post.id, 'approvedPosts')}>Sửa</button>
                <button onClick={() => handleDelete(post.id, 'approvedPosts')}>Xóa</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="profile-btn" onClick={() => navigate('/')}>Quay lại Trang Chủ</button>
    </div>
  );
};

export default Profile;
