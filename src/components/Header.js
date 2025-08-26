import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="logo">Museum Shop</h1>

        {/* PC 메뉴 */}
        <nav className="nav nav--desktop">
          <a href="/">Home</a>
          <a href="/category">Category</a>
          <a href="/event">Event</a>
          <a href="/cart">Cart</a>
        </nav>

        {/* 모바일 햄버거 (토글 없이 아이콘만 / 필요 시 상태 추가) */}
        <button className="nav__toggle" aria-label="Open menu">☰</button>
      </div>
    </header>
  );
}

export default Header;
