import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <footer className={`footer ${styles["footer"]}`}>
        <div className={`container-fluid ${styles["container-footer"]}`}>
          <div className="row g-3">
            <div className="col-md-5 col-lg-3">
              <h5>UNIOLO lắng nghe bạn!</h5>
              <p>
                Chúng tôi luôn chân trọng và mong đợi nhận được mọi ý kiến đóng
                góp từ khách hàng để có thể nâng cấp trải ngiệm dịch vụ sản phẩm
                tốt hơn nữa
              </p>

              <div className="row">
                <div className="col-md-5 col-lg-3">icon</div>
                <div className="col-md-5 col-lg-3">0896011xxx</div>
              </div>

              <div className="row">
                <div className="col-md-5 col-lg-3">icon</div>
                <div className="col-md-5 col-lg-3">aaaa@gmail.com</div>
              </div>
              <div className="row">
                <div className="col-md-5 col-lg-3">
                  <a href="">icon</a>
                </div>
                <div className="col-md-5 col-lg-3">
                  <a href="">icon</a>
                </div>
                <div className="col-md-5 col-lg-3">
                  <a href="">icon</a>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <h5>Dịch vụ khách hàng</h5>
              <ul>
                <li>Hỏi đáp - FAQs</li>
                <li>Chính sách đổi trả</li>
                <li>Liên hệ</li>
                <li>Thành viên</li>
                <li>Khách hàng hài lòng 100%</li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className="col-md-5 col-lg-3">
              <h5>Tài liệu - Tuyển dụng</h5>
              <ul>
                <li>Thông tin tuyển dụng</li>
                <li>Đăng ký tuyển dụng</li>
              </ul>
            </div>
            <div className="col-md-5 col-lg-3">
              <h5>Địa chỉ cơ sở</h5>
              <ul>
                <li>Địa chỉ 1</li>
                <li>Địa chỉ 2</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
