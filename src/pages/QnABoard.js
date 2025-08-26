import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

import "./Board.css";

const data = [
  { id: 101, title: "주문번호 변경 가능할까요?", author: "guest1", date: "2025-08-25", secret:false, isNew:true },
  { id: 102, title: "교환/환불 절차 문의", author: "hy***", date: "2025-08-24", secret:true,  isNew:false },
];

export default function QnABoard() {
  const [sp] = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase();
  const sort = sp.get("sort") || "latest";
  const page = Number(sp.get("page") || 1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let items = data.filter(d =>
      d.title.toLowerCase().includes(q) || d.author.toLowerCase().includes(q)
    );
    if (sort === "latest") items.sort((a,b)=> (a.date < b.date ? 1 : -1));
    if (sort === "oldest") items.sort((a,b)=> (a.date > b.date ? 1 : -1));
    if (sort === "title") items.sort((a,b)=> a.title.localeCompare(b.title));
    return items;
  }, [q, sort]);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">Q&A</h2>
        <div className="section__tools">
          <Link className="btn" to="/qna/write">질문하기</Link>
        </div>
      </div>

      <SearchFilter placeholder="제목/작성자 검색" />

      {/* 헤더 */}
      <div className="board__head">
        <div>제목</div>
        <div style={{textAlign:"center"}}>작성자</div>
        <div style={{textAlign:"right"}}>등록일</div>
      </div>

      {/* 행들 */}
      <div className="board">
        {pageItems.map(q => (
          <div key={q.id} className="board__row">
            <div className="board__title">
              {q.secret && <span className="badge badge--lock">비밀글</span>}
              <Link to={`/qna/${q.id}`}>{q.title}</Link>
              {q.isNew && <span className="badge badge--new">NEW</span>}
            </div>
            <div style={{textAlign:"center"}} className="board__meta">
              <em>{q.author}</em>
            </div>
            <div className="board__meta"><time>{q.date}</time></div>
          </div>
        ))}
      </div>

      <Pagination total={total} pageSize={pageSize} />
    </section>
  );
}
