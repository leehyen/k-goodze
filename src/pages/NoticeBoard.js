import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

import "./Board.css";

const data = [
  { id: 1, title: "배송 지연 안내 (8/26)", date: "2025-08-26", isNew: true },
  { id: 2, title: "시스템 점검 공지", date: "2025-08-20" },
  { id: 3, title: "추석 연휴 배송 안내", date: "2025-08-18" },
];

export default function NoticeBoard() {
  const [sp] = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase();
  const sort = sp.get("sort") || "latest";
  const page = Number(sp.get("page") || 1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let items = data.filter(d => d.title.toLowerCase().includes(q));
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
        <h2 className="section__title">공지사항</h2>
        <div className="section__tools">
          <Link className="btn" to="/notice/write">글쓰기</Link>
        </div>
      </div>

      <SearchFilter placeholder="제목 검색" />

      {/* 헤더 */}
      <div className="board__head">
        <div>제목</div>
        <div style={{textAlign:"center"}}>구분</div>
        <div style={{textAlign:"right"}}>등록일</div>
      </div>

      {/* 행들 */}
      <div className="board">
        {pageItems.map(n => (
          <div key={n.id} className="board__row">
            <div className="board__title">
              <span className="badge badge--notice">공지</span>
              <Link to={`/notice/${n.id}`}>{n.title}</Link>
              {n.isNew && <span className="badge badge--new">NEW</span>}
            </div>
            <div style={{textAlign:"center"}}>-</div>
            <div className="board__meta"><time>{n.date}</time></div>
          </div>
        ))}
      </div>

      <Pagination total={total} pageSize={pageSize} />
    </section>
  );
}
