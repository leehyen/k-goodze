import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Detail.css";

const data = [
  { id: 101, title: "주문번호 변경 가능할까요?", author: "guest1", date: "2025-08-25", content: "주문번호는 변경이 어렵고 재주문을 권장드립니다." },
  { id: 102, title: "교환/환불 절차 문의", author: "hy***", date: "2025-08-24", content: "수령 후 7일 이내 미사용·미개봉에 한해 가능합니다." },
];

export default function QnADetail() {
  const { id } = useParams();
  const item = data.find(d => String(d.id) === String(id));
  if (!item) return <p>존재하지 않는 게시글입니다.</p>;

  return (
    <section className="section">
      <div className="actions actions--right">
        <Link className="btn btn--ghost" to="/qna">목록</Link>
      </div>

      <div className="detail">
        <div className="detail__head">
          <h2 className="detail__title">{item.title}</h2>
          <div className="detail__meta">
            <em>{item.author}</em> · <time>{item.date}</time>
          </div>
        </div>
        <div className="detail__content">{item.content}</div>
      </div>
    </section>
  );
}
