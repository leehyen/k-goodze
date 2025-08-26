import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2025 Museum Shop. All rights reserved.</p>
        <p className="links">
          <Link to="/terms">이용약관</Link>
          <span>·</span>
          <Link to="/privacy">개인정보처리방침</Link>
          <span>·</span>
          <Link to="/signup">회원가입</Link>
          <span>·</span>
          <Link to="/notice">공지사항</Link>
          <span>·</span>
          <Link to="/qna">Q&A</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
