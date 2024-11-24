import React from 'react';
import './css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Về ChợĐồCũ</h1>
        <p>Trang mua bán đồ cũ với phương châm "Cũ người mới ta!"</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Sứ mệnh của chúng tôi</h2>
          <p>
            ChợĐồCũ được thành lập với mục tiêu xây dựng một nền tảng mua bán đồ cũ thân thiện, đáng tin cậy, giúp
            mọi người dễ dàng trao đổi các mặt hàng đã qua sử dụng. Chúng tôi mong muốn giúp giảm thiểu lượng rác thải,
            tối ưu hóa tài nguyên và mang đến cho mọi người những món đồ chất lượng với giá cả hợp lý.
          </p>
        </section>

        <section className="about-section">
          <h2>Lịch sử hình thành</h2>
          <p>
            Được thành lập vào năm 2025, ChợĐồCũ bắt đầu với một nhóm nhỏ các thành viên đam mê công nghệ và muốn tạo
            ra một nền tảng giúp người dùng dễ dàng tìm kiếm, trao đổi đồ cũ. Từ đó đến nay, ChợĐồCũ đã phục vụ hàng ngàn
            khách hàng, tạo ra một cộng đồng đông đảo và thân thiện.
          </p>
        </section>

        <section className="about-section">
          <h2>Cam kết của chúng tôi</h2>
          <p>
            Chúng tôi cam kết mang đến trải nghiệm mua bán an toàn và minh bạch cho người dùng. Với đội ngũ chăm sóc khách
            hàng tận tình, chúng tôi sẵn sàng hỗ trợ, giải đáp mọi thắc mắc của bạn. ChợĐồCũ luôn nỗ lực để cải thiện chất
            lượng dịch vụ và đảm bảo tính bảo mật, an toàn khi giao dịch trên nền tảng của chúng tôi.
          </p>
        </section>

        <section className="about-section">
          <h2>Liên hệ</h2>
          <p>Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, xin đừng ngần ngại liên hệ với chúng tôi qua:</p>
          <ul>
            <li>Email: support@chodocu.com</li>
            <li>Điện thoại: +8477850913</li>
            <li>Địa chỉ: TP Đà Nẵng , Việt Nam</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
