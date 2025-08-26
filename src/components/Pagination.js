// components/Pagination.js
import React from "react";
import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({ total, pageSize = 10 }) {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const go = (p) => () => {
    const next = new URLSearchParams(sp);
    next.set("page", String(p));
    setSp(next, { replace: true });
  };

  if (pages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);

  return (
    <div className="pagination">
      <button className="page-btn" onClick={go(Math.max(1, page - 1))} disabled={page === 1}>이전</button>
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <button key={p} className={`page-num ${p === page ? "is-active" : ""}`} onClick={go(p)}>
          {p}
        </button>
      ))}
      <button className="page-btn" onClick={go(Math.min(pages, page + 1))} disabled={page === pages}>다음</button>
    </div>
  );
}
