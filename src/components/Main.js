import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import { getAsset } from "../utils/assets";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const FALLBACK = "https://placehold.co/1200x800?text=Korean+Goods";

const slides = [
  {title: "한국의 전통을 감각으로 입다",desc: "한복·노리개·전통 문양에서 영감 받은 굿즈",img: banner1},
  {title: "손끝에서 피어나는 공예의 깊이",desc: "도자기·나전·전통 소품을 담은 디자인",img: banner2},
  {title: "현대적 감성과 전통의 조화",desc: "감각적으로 재해석된 한국의 문양과 디자인",img: banner3},
];

const categories = [
  { slug: "hanbok-accessory", name: "한복 액세서리", img: "banner1.png" },
  { slug: "ceramic-craft",    name: "도자/공예",     img: "banner1.png" },
  { slug: "pattern-poster",   name: "전통문양/포스터", img: "banner1.png" },
  { slug: "stationery-book",  name: "문구/서적",     img: "banner1.png" },
];

const bestItems = [
  { id: 1, title: "봉황 문양 에나멜 키링", price: 12000, img: "cushion.png" },
  { id: 2, title: "백자 머그 (청화)",     price: 18000, img: "ecobag.png" },
  { id: 3, title: "민화 포스터 A3",       price: 9000,  img: "fan.png" },
  { id: 4, title: "한지 노트 세트",       price: 8500,  img: "folding fan.png" },
  { id: 5, title: "노리개 참 장식",       price: 14000, img: "keyring.png" },
  { id: 6, title: "단청 패턴 에코백",     price: 22000, img: "light.png" },
];

function useSafeBg(url) {
  const [bg, setBg] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBg(url);
    img.onerror = () => setBg(null);
    img.src = url;
  }, [url]);
  return bg;
}

export default function Main() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = slides[index];
  const safeBg = useSafeBg(current.img);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div
          className={`hero__image ${safeBg ? "is-loaded" : "is-fallback"}`}
          style={safeBg ? { backgroundImage: `url(${safeBg})` } : undefined}
        />
        <div className="hero__content">
          <h2 className="hero__title">{current.title}</h2>
          <p className="hero__desc">{current.desc}</p>
          {/* Hero 버튼 필요시만 */}
          {/* <div className="hero__actions"><Link className="btn btn--primary" to="/category/hanbok-accessory">굿즈 보러가기</Link></div> */}
        </div>
        <button className="hero__nav hero__nav--prev" onClick={prev}>‹</button>
        <button className="hero__nav hero__nav--next" onClick={next}>›</button>
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === index ? "is-active" : ""}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="section__head"><h3 className="section__title">카테고리</h3></div>
        <div className="cards">
          {categories.map(c => (
            <article key={c.slug} className="card">
              <div className="card__thumb">
                <img src={getAsset(c.img)} alt={c.name} loading="lazy" onError={(e)=>e.currentTarget.src=FALLBACK} />
              </div>
              <div className="card__body">
                <h4 className="card__title">{c.name}</h4>
                <Link className="btn btn--soft" to={`/category/${c.slug}`}>바로가기</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Best Items */}
      <section className="section">
        <div className="section__head"><h3 className="section__title">이유 있는 베스트</h3></div>
        <div className="products">
          {bestItems.map(p => (
            <article key={p.id} className="product">
              <div className="product__thumb">
                <img src={getAsset(p.img)} alt={p.title} loading="lazy" onError={(e)=>e.currentTarget.src=FALLBACK} />
                <span className="badge badge--new">BEST</span>
              </div>
              <h4 className="product__title">{p.title}</h4>
              <div className="product__meta">
                <strong>{p.price.toLocaleString()}원</strong>
                <button className="btn btn--tiny">담기</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
