// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css'; // HomePage 전용 CSS 임포트

const HomePage = () => {
  const { user } = useAuth();

  // PrivateRoute에 의해 user 객체는 항상 존재하지만, 방어 코드를 추가합니다.
  if (!user) {
    return (
      <div className="homepage-container">
        <p>사용자 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 오늘 날짜 정보
  const today = new Date();
  const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;


  return (
    <div className="homepage-container">
      <div className="minihompy-layout">
        
        <header className="minihompy-header">
          <span className="title">{user.miniHompyName || `${user.nickname}의 미니홈피`}</span>
          <span className="today-info">Today is... {dateString}</span>
        </header>

        <main className="minihompy-content">
          <div className="profile-section">
            <img 
              src={user.profilePictureUrl || `https://via.placeholder.com/150/282c34/61dafb?text=${user.nickname}`} 
              alt="프로필 사진" 
              className="profile-picture"
            />
            <p className="profile-nickname">{user.nickname}</p>
            <p className="profile-intro">싸이월드에 오신 것을 환영합니다! 💙</p>
          </div>

          <div className="main-display">
            <h3 className="welcome-message">
              {user.nickname}님의 미니홈피에 오신 것을 환영합니다.
            </h3>
            <p>오늘 하루는 어떠셨나요? <br /> 소중한 일상을 기록하고 친구들과 공유해보세요.</p>
          </div>
        </main>

        <nav className="minihompy-menu">
          <Link to="/board" className="menu-item">게시판</Link>
          <Link to={`/album/user/${user.userId}`} className="menu-item">사진첩</Link>
          <Link to={`/guestbook/user/${user.userId}`} className="menu-item">방명록</Link>
        </nav>

      </div>
    </div>
  );
};

export default HomePage;