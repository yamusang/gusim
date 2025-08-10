// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';


import './App1.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainBoardPage from './pages/MainBoardPage';
import WriteBoardPage from './pages/WriteBoardPage';
import BoardPage from './pages/BoardPage';
import AlbumPage from './pages/AlbumPage';
import GuestbookPage from './pages/GuestbookPage';
import Header from './components/Header';

// 🔒 로그인 여부 확인용 컴포넌트
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            {/* 🔓 공개 라우트 */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/auth/kakao/callback" element={<KakaoCallback />} /> */}

            {/* 🔐 보호된 라우트 */}
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />

            <Route path="/board" element={<PrivateRoute><MainBoardPage /></PrivateRoute>} />
            <Route path="/board/write" element={<PrivateRoute><WriteBoardPage /></PrivateRoute>} />
            <Route path="/board/:postId" element={<PrivateRoute><BoardPage /></PrivateRoute>} />

            <Route path="/album/user/:userId" element={<PrivateRoute><AlbumPage /></PrivateRoute>} />
            <Route path="/guestbook/user/:userId" element={<PrivateRoute><GuestbookPage /></PrivateRoute>} />

            {/* ❓ 잘못된 경로 처리 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
