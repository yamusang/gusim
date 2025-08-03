import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainBoardPage from './pages/MainBoardPage';
import BoardPage from './pages/BoardPage';
import AlbumPage from './pages/AlbumPage';
import GuestbookPage from './pages/GuestbookPage';
import './App.css';

// 로그인이 필요한 페이지를 감싸는 PrivateRoute 컴포넌트
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/board" element={<PrivateRoute><MainBoardPage /></PrivateRoute>} />
            <Route path="/board/:postId" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
            <Route path="/album/user/:userId" element={<PrivateRoute><AlbumPage /></PrivateRoute>} />
            <Route path="/guestbook/user/:userId" element={<PrivateRoute><GuestbookPage /></PrivateRoute>} />
            {/* 기본 경로를 /로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;