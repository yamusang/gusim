// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css'; // LoginPage에만 적용될 CSS를 임포트합니다.

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // AuthContext를 통해 login 함수를 호출합니다.
      // 현재는 apiClient.js의 Mock API(apiLogin)를 사용합니다.
      await login(username, password);
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Cyworld</h1>
        <p className="login-subtitle">로그인하고 미니홈피를 만나보세요</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
         <div className="login-info">
            <p>테스트용 계정:</p>
            <p>ID: <strong>cyworld_admin</strong> / PW: <strong>1234</strong></p>
            <p>ID: <strong>bomi</strong> / PW: <strong>1234</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;