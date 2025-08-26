// components/SearchFilter.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filter.css";

export default function SearchFilter({ placeholder = "검색어를 입력하세요" }) {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [sort, setSort] = useState(sp.get("sort") || "latest");

  useEffect(() => {
    setQ(sp.get("q") || "");
    setSort(sp.get("sort") || "latest");
  }, [sp]);

  const apply = (e) => {
    e?.preventDefault();
    const next = new URLSearchParams(sp);
    next.set("page", "1"); // 검색/정렬 바꾸면 1페이지로
    q ? next.set("q", q) : next.delete("q");
    sort ? next.set("sort", sort) : next.delete("sort");
    setSp(next, { replace: true });
  };

  return (
    <form className="filter" onSubmit={apply}>
      <input
        className="filter__input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
      <select className="filter__select" value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">최신순</option>
        <option value="oldest">오래된순</option>
        <option value="title">제목순</option>
      </select>
      <button className="btn" type="submit">검색</button>
    </form>
  );
}
