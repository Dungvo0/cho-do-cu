import React, { useState, useEffect } from 'react';
import './css/ProductListing.css';

const productsData = [
  // Dữ liệu mẫu sản phẩm
  { id: 1, name: 'Điện thoại Samsung', category: 'Electronics', price: 200, condition: 'New' },
  { id: 2, name: 'Tủ lạnh LG', category: 'Appliances', price: 300, condition: 'Used' },
  { id: 3, name: 'Áo khoác', category: 'Clothing', price: 50, condition: 'New' },
  { id: 4, name: 'Laptop Dell', category: 'Electronics', price: 600, condition: 'Used' },
  { id: 5, name: 'Máy giặt Toshiba', category: 'Appliances', price: 250, condition: 'New' },
  // Thêm các sản phẩm khác
];

const ProductListing = () => {
  const [products, setProducts] = useState(productsData);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  useEffect(() => {
    // Lọc sản phẩm theo danh mục, giá, và tình trạng
    let filteredProducts = productsData;

    if (filterCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === filterCategory);
    }
    if (filterPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseInt(filterPrice));
    }
    if (filterCondition) {
      filteredProducts = filteredProducts.filter(product => product.condition === filterCondition);
    }

    // Sắp xếp sản phẩm
    if (sortOrder === 'low-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(filteredProducts);
  }, [filterCategory, filterPrice, filterCondition, sortOrder]);

  // Paginate
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-listing-container">
      <h2>Danh sách sản phẩm</h2>

      <div className="filters">
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          <option value="Electronics">Điện tử</option>
          <option value="Appliances">Đồ gia dụng</option>
          <option value="Clothing">Quần áo</option>
        </select>

        <select onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="">Mọi mức giá</option>
          <option value="100">Dưới 100$</option>
          <option value="300">Dưới 300$</option>
          <option value="500">Dưới 500$</option>
        </select>

        <select onChange={(e) => setFilterCondition(e.target.value)}>
          <option value="">Tất cả tình trạng</option>
          <option value="New">Mới</option>
          <option value="Used">Đã qua sử dụng</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="low-high">Giá: Thấp đến Cao</option>
          <option value="high-low">Giá: Cao đến Thấp</option>
        </select>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Danh mục: {product.category}</p>
            <p>Giá: VND{product.price}</p>
            <p>Tình trạng: {product.condition}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="page-item">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
