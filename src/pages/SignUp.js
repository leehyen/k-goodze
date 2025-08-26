// pages/SignUp.js
import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 서버 연동
    alert("회원가입 요청 전송 (데모)");
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card" role="dialog" aria-labelledby="signup-title">
        <h2 id="signup-title" className="auth-title">회원가입</h2>
        <p className="auth-sub">간단한 정보 입력으로 계정을 생성하세요.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            아이디
            <input type="text" name="username" placeholder="아이디" required />
          </label>
          <label>
            이메일
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" placeholder="비밀번호" required />
          </label>
          <label>
            비밀번호 확인
            <input type="password" name="confirm" placeholder="비밀번호 확인" required />
          </label>

          <div className="auth-actions">
            <button type="submit" className="btn--primary">가입하기</button>
          </div>
        </form>

        <div className="auth-footer">
          이미 계정이 있으신가요? <Link to="/signin">로그인</Link>
        </div>
      </div>
    </section>
  );
}
export default SignUp;
