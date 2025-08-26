import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <h1 className="logo">
            <Link to="/" aria-label="Museum Shop Home">Museum Shop</Link>
          </h1>

          {/* 데스크톱 메뉴 */}
          <nav className="nav nav--desktop" aria-label="Primary">
            <Link to="/">Home</Link>
            <Link to="/notice">공지사항</Link>
            <Link to="/qna">Q&A</Link>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </nav>

          {/* 모바일 토글 */}
          <button
            className="nav__toggle"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* 오버레이 */}
      {open && <button className="overlay" aria-label="Close menu" onClick={() => setOpen(false)} />}

      {/* 모바일 드로어 */}
      <aside id="mobile-menu" className={`drawer ${open ? "drawer--open" : ""}`} aria-hidden={!open}>
        <div className="drawer__header">
          <span className="drawer__title">Menu</span>
          <button className="drawer__close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
        </div>
        <nav className="drawer__nav" aria-label="Mobile">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/notice" onClick={() => setOpen(false)}>공지사항</Link>
          <Link to="/qna" onClick={() => setOpen(false)}>Q&A</Link>
          <hr style={{ margin: "8px 0", borderColor: "#eee" }} />
          <Link to="/signin" onClick={() => setOpen(false)}>로그인</Link>
          <Link to="/signup" onClick={() => setOpen(false)}>회원가입</Link>
        </nav>
      </aside>
    </>
  );
}

export default Header;