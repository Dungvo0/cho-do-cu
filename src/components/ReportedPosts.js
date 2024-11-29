import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Thêm import useNavigate
import './css/ReportedPosts.css';

const ReportedPosts = () => {
  const [reportedPosts, setReportedPosts] = useState([]); // State lưu danh sách bài đăng bị tố cáo
  const navigate = useNavigate(); // Khởi tạo navigate

  // Lấy danh sách bài đăng bị tố cáo từ Firestore
  const fetchReportedPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'report'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReportedPosts(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài đăng bị tố cáo:', error);
    }
  };

  // Xóa bài đăng bị tố cáo
  const deleteReportedPost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'report', postId)); // Xóa bài khỏi Firestore
      setReportedPosts((prev) => prev.filter((post) => post.id !== postId)); // Cập nhật state
      alert('Xóa bài đăng bị tố cáo thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng bị tố cáo:', error);
    }
  };

  // Fetch dữ liệu khi component được render
  useEffect(() => {
    fetchReportedPosts();
  }, []);

  return (
    <div className="reported-posts">
      <h1>Các bài đăng bị tố cáo</h1>
      
      {/* Nút Quay lại */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Quay lại
      </button>

      {reportedPosts.length === 0 ? (
        <p>Không có bài đăng nào bị tố cáo.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Người đăng</th>
              <th>Lý do tố cáo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reportedPosts.map((post) => (
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
                <td>{post.reportReason}</td>
                <td>
                  <button onClick={() => deleteReportedPost(post.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportedPosts;
