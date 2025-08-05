import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/" style={{textDecoration: 'none'}}><h1>Cyworld</h1></Link>
      <nav>
        <Link to="/board">게시판</Link>
        {user && <Link to={`/album/user/${user.user_id}`}>사진첩</Link>}
        {user && <Link to={`/guestbook/user/2`}>방명록(샘플)</Link>}
        
        <div className="user-info" style={{display: 'inline-block', marginLeft: '20px'}}>
          {user ? (
            <>
              <span>{user.nickname}님</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;