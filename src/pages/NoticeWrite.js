import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Write.css";

const TITLE_MAX = 100;
const CONTENT_MAX = 2000;

export default function NoticeWrite() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", files: [] });
  const [preview, setPreview] = useState(false);
  const taRef = useRef(null);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setForm((f) => ({ ...f, files: Array.from(files || []) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // textarea autosize
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [form.content]);

  const titleLeft = TITLE_MAX - form.title.length;
  const contentLeft = CONTENT_MAX - form.content.length;

  const isValid = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.title.length <= TITLE_MAX &&
      form.content.trim().length > 0 &&
      form.content.length <= CONTENT_MAX
    );
  }, [form.title, form.content]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: 실제 API 연동(FormData 권장 - files 포함)
    alert("공지 등록 요청 (데모)\n" + JSON.stringify({ ...form, files: form.files.map(f => f.name) }, null, 2));
    nav("/notice");
  };

  return (
    <section className="section write-page notice-page">
      <div className="section__head">
        <h2 className="section__title">공지 작성</h2>
        <div className="section__tools">
          <button type="button" className="btn btn--ghost" onClick={() => setPreview(p=>!p)}>
            {preview ? "편집하기" : "미리보기"}
          </button>
        </div>
      </div>

      <div className="write-grid">
        {/* 좌측 폼 */}
        <form className="write-form write-desktop-2col write-panel" onSubmit={onSubmit}>
          <label>
            제목
            <input name="title" value={form.title} onChange={onChange} maxLength={TITLE_MAX} required />
            <span className="write-help">{TITLE_MAX - form.title.length} / {TITLE_MAX}</span>
          </label>

          <label className="field-wide">
            내용
            <textarea ref={taRef} name="content" value={form.content}
                      onChange={onChange} maxLength={CONTENT_MAX} required />
            <span className={`write-help ${CONTENT_MAX - form.content.length < 0 ? "is-error" : ""}`}>
              {CONTENT_MAX - form.content.length} / {CONTENT_MAX}
            </span>
          </label>

          <label>
            첨부 이미지 (선택)
            <input type="file" name="files" accept="image/*" multiple onChange={onChange} />
            {form.files?.length > 0 && <span className="write-help">{form.files.length}개 선택됨</span>}
          </label>

          <div className="write-actions">
            <button className="btn" type="submit" disabled={!isValid}>등록</button>
            <a className="btn btn--ghost" href="/notice">취소</a>
          </div>
        </form>

        {/* 우측 패널 */}
        <aside className="write-panel write-aside">
          {preview ? (
            <div className="detail">
              <div className="detail__head">
                <h3 className="detail__title">{form.title || "제목(미리보기)"}</h3>
                <div className="detail__meta">미리보기</div>
              </div>
              <div className="detail__content">{form.content || "내용(미리보기)"}</div>
            </div>
          ) : (
            <div>
              <h4 style={{margin:"0 0 8px"}}>작성 가이드</h4>
              <ul style={{margin:0, paddingLeft:18, color:"#666", lineHeight:1.6}}>
                <li>제목은 30~50자 내로 요점을 먼저.</li>
                <li>날짜/대상/영향 범위를 본문 첫 줄에 명시.</li>
                <li>첨부 파일은 3개 이하, 5MB 이하 권장.</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
