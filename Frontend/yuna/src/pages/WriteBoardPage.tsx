import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createPost } from '../api/apiClient';

const WriteBoardPage: React.FC = () => {
const auth = useAuth();
const user = auth ? auth.user : null;


  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await createPost({
        title,
        content,
        userId: user!.userId
      });

      navigate('/board'); // 게시판으로 이동
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      setError('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container">
      <h2>게시글 작성</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="write-form">
        <div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default WriteBoardPage;
