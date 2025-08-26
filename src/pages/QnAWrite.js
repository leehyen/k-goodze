import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Write.css";

const TITLE_MAX = 100;
const CONTENT_MAX = 2000;

export default function QnAWrite() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", secret: false, password: "", files: [] });
  const [preview, setPreview] = useState(false);
  const taRef = useRef(null);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "files") {
      setForm((f) => ({ ...f, files: Array.from(files || []) }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [form.content]);

  const titleLeft = TITLE_MAX - form.title.length;
  const contentLeft = CONTENT_MAX - form.content.length;

  const isValid = useMemo(() => {
    const base =
      form.title.trim().length > 0 &&
      form.title.length <= TITLE_MAX &&
      form.content.trim().length > 0 &&
      form.content.length <= CONTENT_MAX;
    const sec = !form.secret || (form.secret && form.password.trim().length >= 4);
    return base && sec;
  }, [form.title, form.content, form.secret, form.password]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: 실제 API 연동(FormData 권장)
    const payload = {
      ...form,
      files: form.files.map(f => f.name),
    };
    alert("Q&A 등록 요청 (데모)\n" + JSON.stringify(payload, null, 2));
    nav("/qna");
  };

  return (
    <section className="section write-page qna-page">
      <div className="section__head">
        <h2 className="section__title">질문 작성</h2>
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
            <input name="title" value={form.title} onChange={onChange}
                  maxLength={TITLE_MAX} required />
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
            <input type="checkbox" name="secret"
                  checked={form.secret}
                  onChange={onChange} />
            비밀글
          </label>

          {form.secret && (
            <label>
              비밀번호 (4자 이상)
              <input type="password" name="password"
                    value={form.password}
                    onChange={onChange} minLength={4} required />
            </label>
          )}

          <label>
            첨부 이미지 (선택)
            <input type="file" name="files" accept="image/*" multiple onChange={onChange} />
            {form.files?.length > 0 && <span className="write-help">{form.files.length}개 선택됨</span>}
          </label>

          <div className="write-actions">
            <button className="btn" type="submit" disabled={!isValid}>등록</button>
            <a className="btn btn--ghost" href="/qna">취소</a>
          </div>
        </form>

        {/* 우측 패널 */}
        <aside className="write-panel write-aside">
          {preview ? (
            <div className="detail">
              <div className="detail__head">
                <h3 className="detail__title">
                  {form.title || "제목(미리보기)"} {form.secret ? "🔒" : ""}
                </h3>
                <div className="detail__meta">미리보기</div>
              </div>
              <div className="detail__content">{form.content || "내용(미리보기)"}</div>
            </div>
          ) : (
            <div>
              <h4 style={{margin:"0 0 8px"}}>작성 팁</h4>
              <ul style={{margin:0, paddingLeft:18, color:"#666", lineHeight:1.6}}>
                <li>상품명/주문번호 등 핵심 정보를 첫 줄에.</li>
                <li>개인정보 포함 시에만 비밀글 사용.</li>
                <li>필요 자료(사진)는 2~3장 이내 권장.</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );

}
