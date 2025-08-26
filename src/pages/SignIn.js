// pages/SignIn.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 서버 연동 후 토큰/세션 저장
    alert("로그인 요청 전송 (데모)");
    navigate("/"); // 로그인 성공 가정
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card" role="dialog" aria-labelledby="signin-title">
        <h2 id="signin-title" className="auth-title">로그인</h2>
        <p className="auth-sub">계정으로 계속 진행하세요.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            아이디 또는 이메일
            <input type="text" name="id" placeholder="아이디 또는 이메일" required />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" placeholder="비밀번호" required />
          </label>

          <div className="auth-actions">
            <button type="submit" className="btn--primary">로그인</button>
          </div>
        </form>

        <div className="auth-footer">
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </section>
  );
}
export default SignIn;
