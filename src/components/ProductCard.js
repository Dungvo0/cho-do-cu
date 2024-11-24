import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price} VND</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">Xem chi</Link>
      </div>
    </div>
  );
};

export default ProductCard;
