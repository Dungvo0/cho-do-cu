import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './css/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'approvedPosts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error('Sản phẩm không tồn tại.');
        }
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 

  const handleGoHome = () => {
    navigate('/'); // Quay lại trang Home
  };

  if (loading) return <p>Đang tải thông tin sản phẩm...</p>;

  if (!product) return <p>Không tìm thấy thông tin sản phẩm.</p>;

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <div className="product-info">
        {product.imageBase64 ? (
          <img
            src={product.imageBase64}
            alt={product.title}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">Hình ảnh không khả dụng</div>
        )}
        <div className="product-meta">
          <p><strong>Danh mục:</strong> {product.category} - {product.subcategory}</p>
          <p><strong>Giá:</strong> {product.price} VND</p>
          <p><strong>Mô tả:</strong> {product.description}</p>
          <p><strong>Tỉnh/Thành phố:</strong> {product.province}</p>
          <p><strong>Địa chỉ:</strong> {product.address}</p>
          <p><strong>Số điện thoại:</strong> {product.phone}</p>
          <p><strong>Email:</strong> {product.email}</p>
        <button className="backhome" onClick={handleGoHome}>Quay lại trang chủ</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
