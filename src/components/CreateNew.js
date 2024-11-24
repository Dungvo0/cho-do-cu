import React, { useState } from 'react';
import Select from 'react-select'; // Import thư viện react-select
import { db } from '../firebaseConfig'; // Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore
import { useAuth } from '../Auth_Context'; // Giả sử bạn có AuthContext để lấy thông tin người dùng
import './css/CreateNew.css';
import { useNavigate } from 'react-router-dom';

const CreateNew = () => {
  const navigate = useNavigate(); 
  const { currentUser } = useAuth(); // Lấy thông tin người dùng hiện tại
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Lưu chuỗi Base64
  const [province, setProvince] = useState(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState(''); // Thêm state cho giá cả

  const categories = {
    "Bất động sản": ["Nhà ở", "Phòng trọ", "Chung cư"],
    "Xe cộ": ["Ô tô", "Xe máy", "Xe đạp", "Phương tiện khác"],
    "Đồ điện tử": ["Máy tính", "Điện thoại", "Âm thanh", "Thiết bị đeo", "Khác"],
    "Đồ gia dụng": ["Bàn ghế", "Tủ", "Giường", "Bếp", "Quạt", "Khác..."],
    "Thời trang": ["Nam", "Nữ"],
    "Thể thao, Giải trí": ["Nhạc cụ", "Sách", "Đồ thể thao", "Thiết bị chơi game", "Khác..."],
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
  ].map((province) => ({ value: province, label: province }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Lưu chuỗi Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Bạn cần đăng nhập để đăng tin.');
      return;
    }

    const newPost = {
      category,
      subcategory,
      title,
      description,
      price,
      imageBase64: image, // Lưu chuỗi Base64
      province: province?.value,
      address,
      phone,
      userId: currentUser.uid, // Lấy ID người dùng
      email: currentUser.email, // Email người dùng
      createdAt: new Date().toISOString(),
    };

    try {
      // Lưu dữ liệu vào Firestore
      await addDoc(collection(db, 'waitingApproval'), newPost);
      alert('Đăng tin thành công! Bài đăng của bạn đang chờ duyệt.');
      navigate('/');
      // Reset form
      setCategory('');
      setSubcategory('');
      setTitle('');
      setDescription('');
      setImage(null);
      setProvince(null);
      setAddress('');
      setPhone('');
      setPrice('');
    } catch (error) {
      console.error('Lỗi khi đăng tin:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return (
    <div className="create-new">
      <h2>Đăng Tin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Danh mục:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Chọn danh mục --</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {category && categories[category].length > 0 && (
          <>
            <label htmlFor="subcategory">Loại:</label>
            <select id="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              {categories[category].map((subcat) => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Mô tả:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="price">Giá cả:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="image">Hình ảnh:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />

        <label htmlFor="province">Tỉnh/Thành phố:</label>
        <Select
          id="province"
          options={provinces}
          value={province}
          onChange={(selectedOption) => setProvince(selectedOption)}
          placeholder="Chọn tỉnh/thành phố"
          isClearable
        />

        {province && (
          <>
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </>
        )}

        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">Đăng Tin</button>
      </form>
    </div>
  );
};

export default CreateNew;
