import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Thêm auth để kiểm tra người dùng đăng nhập
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Để điều hướng
import './css/Home.css';

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [province, setProvince] = useState('');
  const [query, setQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // Trạng thái người dùng đăng nhập

  const navigate = useNavigate();

  const categories = {
    "Bất động sản": ["Nhà ở", "Phòng trọ", "Chung cư"],
    "Xe cộ": ["Ô tô", "Xe máy", "Xe đạp", "Phương tiện khác"],
    "Đồ điện tử": ["Máy tính", "Điện thoại", "Âm thanh", "Thiết bị đeo", "Khác"],
    "Đồ gia dụng": ["Bàn ghế", "Tủ", "Giường", "Bếp", "Quạt", "Khác"],
    "Thời trang": ["Nam", "Nữ"],
    "Thể thao, Giải trí": ["Nhạc cụ", "Sách", "Đồ thể thao", "Thiết bị chơi game", "Khác"],
    "Khác": []
  };

  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh",
    "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau",
    "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
    "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội",
    "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
    "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
    "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
    "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
    "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh",
    "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  useEffect(() => {
    // Kiểm tra người dùng đăng nhập
    auth.onAuthStateChanged((user) => {
      if (user) setCurrentUser(user);
    });
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'approvedPosts'));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    }
  };

  const savePost = async (product) => {
    if (!currentUser) {
      alert('Bạn cần đăng nhập để lưu tin.');
      return;
    }
    try {
      const savedPostRef = doc(
        collection(db, 'users', currentUser.uid, 'savedPosts'),
        product.id
      );
      await setDoc(savedPostRef, product);
      alert('Tin đã được lưu thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu tin:', error);
      alert('Không thể lưu tin. Vui lòng thử lại.');
    }
  };

  const viewPost = (productId) => {
    navigate(`/post/${productId}`); // Điều hướng đến trang chi tiết bài viết
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (category) filtered = filtered.filter((product) => product.category === category);
    if (subcategory) filtered = filtered.filter((product) => product.subcategory === subcategory);
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      filtered = filtered.filter(
        (product) =>
          product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
      );
    }
    if (province) filtered = filtered.filter((product) => product.province === province);
    if (query) filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [query, category, subcategory, priceRange, province, products]);

  return (
    <div className="home">
      <h2 className="spdd">Sản Phẩm Đã Đăng</h2>
      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">Chọn danh mục</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {category && categories[category].length > 0 && (
          <select onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
            <option value="">Chọn loại</option>
            {categories[category].map((subcat) => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        )}

        <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
          <option value="">Chọn mức giá</option>
          <option value="0-100000">Dưới 100,000 VND</option>
          <option value="100000-500000">100,000 - 500,000 VND</option>
          <option value="500000-1000000">500,000 - 1,000,000 VND</option>
          <option value="1000000-5000000">1,000,000 - 5,000,000 VND</option>
        </select>

        <Select
          className="tinh"
          onChange={(option) => setProvince(option?.value || '')}
          options={provinces.map((prov) => ({ label: prov, value: prov }))}
          placeholder="Chọn tỉnh/thành phố"
        />
        <button onClick={filterProducts}>Lọc</button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Không có sản phẩm nào được đăng.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.imageBase64 ? (
                <img src={product.imageBase64} alt={product.title} className="product-image" />
              ) : (
                <div className="product-image-placeholder">Hình ảnh không khả dụng</div>
              )}
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>Giá: {product.price}</p>
                <p>{product.description}</p>
                <p>Liên hệ: {product.phone}</p>
                <p>Email: {product.email}</p>
                <div className="product-actions">
                  <button onClick={() => savePost(product)}>Lưu tin</button>
                  <button onClick={() => viewPost(product.id)}>Xem</button>
                  <button>Chat</button>
                  <button>Spam</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
