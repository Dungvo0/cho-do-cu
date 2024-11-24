import React, { useState } from 'react';
import './css/Cart.css';

const Cart = () => {
  // Sản phẩm trong giỏ hàng (dummy data)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Điện thoại iPhone 12', price: 800, quantity: 1 },
    { id: 2, name: 'Tủ lạnh Samsung', price: 500, quantity: 1 },
    { id: 3, name: 'Laptop Dell', price: 600, quantity: 1 },
  ]);

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} className="remove-button">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="cart-total">
        <h3>Tổng tiền: ${calculateTotal()}</h3>
        <button className="checkout-button">Thanh toán</button>
      </div>
    </div>
  );
};

export default Cart;
