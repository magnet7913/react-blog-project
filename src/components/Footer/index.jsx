import './footer.css';

function Footer() {
  return (
    <footer id="footer" className="bg-white">
      <div className="tcl-container">
        <div className="footer">
          <div className="tcl-row">
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className="footer-logo">
                <img src="/assets/images/logo.png" alt="NuxtBlog Logo" />
              </div>
              <p>© 2020, All Rights Reserved.</p>
              <p>
                Created by{' '}
                <a href="https://www.facebook.com/congluc1902" target="_blank" rel="noreferrer">
                  Luctc
                </a>
              </p>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-2">
              <div className="footer-title">
                <p>Categories</p>
              </div>
              <ul className="footer-content__list">
                <li>
                  <a href="/">ReactJs</a>
                </li>
                <li>
                  <a href="/">Javascript</a>
                </li>
                <li>
                  <a href="/">Angular</a>
                </li>
                <li>
                  <a href="/">HTML, HTML5</a>
                </li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className="footer-title">
                <p>Liên hệ</p>
              </div>
              <ul className="footer-content__list">
                <li>219/78 Trần Văn Đang - Quận 10 - Thành phố Hồ chí Minh</li>
                <li>0343 261 825</li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-4">
              <div className="footer-title">
                <p>Fanpage</p>
              </div>
              <div className="footer-facebook">
                <div
                  className="fb-page"
                  data-href="https://www.facebook.com/HocLapTrinhWebTrenProjectsThucTe/"
                  data-tabs
                  data-width
                  data-height
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                >
                  <blockquote
                    cite="https://www.facebook.com/HocLapTrinhWebTrenProjectsThucTe/"
                    className="fb-xfbml-parse-ignore"
                  >
                    <a href="https://www.facebook.com/HocLapTrinhWebTrenProjectsThucTe/">
                      Học Lập Trình Web Thông Qua Projects Thực Tế
                    </a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
