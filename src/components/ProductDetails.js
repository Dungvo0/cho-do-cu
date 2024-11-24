import React, { useState } from 'react';
import './css/ProductDetails.css';

const ProductDetails = ({ product }) => {
  // Dữ liệu mẫu cho người bán
  const seller = {
    name: 'John Doe',
    contact: 'johndoe@example.com',
    rating: 4.5
  };

  // Dữ liệu mẫu cho đánh giá sản phẩm
  const [reviews] = useState([
    { id: 1, reviewer: 'Alice', rating: 5, comment: 'Sản phẩm rất tốt!' },
    { id: 2, reviewer: 'Bob', rating: 4, comment: 'Chất lượng ổn, đáng mua.' }
  ]);

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details-right">
        <h2>{product.name}</h2>
        <p><strong>Giá:</strong> ${product.price}</p>
        <p><strong>Mô tả:</strong> {product.description}</p>
        <p><strong>Tình trạng:</strong> {product.condition}</p>
        <p><strong>Người bán:</strong> {seller.name} ({seller.contact})</p>
        <p><strong>Đánh giá người bán:</strong> {seller.rating} / 5</p>

        <button className="contact-button">Liên hệ người bán</button>
        <button className="order-button">Đặt hàng</button>

        <div className="reviews-section">
          <h3>Đánh giá sản phẩm</h3>
          {reviews.map((review) => (
            <div key={review.id} className="review">
              <p><strong>{review.reviewer}</strong> - {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
