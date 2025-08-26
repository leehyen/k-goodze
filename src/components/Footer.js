import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2025 Museum Shop. All rights reserved.</p>
        <p className="links">
          <a href="/terms">이용약관</a>
          <span>·</span>
          <a href="/privacy">개인정보처리방침</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
