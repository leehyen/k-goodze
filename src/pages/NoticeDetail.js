import React from "react";
import { useParams, Link } from "react-router-dom";

import "./Detail.css";

const data = [
  { id: 1, title: "배송 지연 안내 (8/26)", date: "2025-08-26", content: "택배사 물량 증가로 지연될 수 있습니다." },
  { id: 2, title: "시스템 점검 공지", date: "2025-08-20", content: "8/28 02:00~04:00 점검 예정입니다." },
];

export default function NoticeDetail() {
  const { id } = useParams();
  const item = data.find(d => String(d.id) === String(id));
  if (!item) return <p>존재하지 않는 공지입니다.</p>;

  return (
    <section className="section">
      <div className="actions actions--right">
        <Link className="btn btn--ghost" to="/notice">목록</Link>
      </div>

      <div className="detail">
        <div className="detail__head">
          <h2 className="detail__title">{item.title}</h2>
          <div className="detail__meta"><time>{item.date}</time></div>
        </div>
        <div className="detail__content">{item.content}</div>
      </div>
    </section>
  );
}
