import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import SignUp from "./pages/SignUp"; /*회원가입*/
import SignIn from "./pages/SignIn"; /*로그인 */

import NoticeBoard from "./pages/NoticeBoard";
import NoticeDetail from "./pages/NoticeDetail";
import NoticeWrite from "./pages/NoticeWrite";

import QnABoard from "./pages/QnABoard";
import QnADetail from "./pages/QnADetail";
import QnAWrite from "./pages/QnAWrite";  
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
           <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 공지 */}
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/notice/write" element={<NoticeWrite />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />

            {/* Q&A */}
            <Route path="/qna" element={<QnABoard />} />
            <Route path="/qna/write" element={<QnAWrite />} />
            <Route path="/qna/:id" element={<QnADetail />} />

            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
