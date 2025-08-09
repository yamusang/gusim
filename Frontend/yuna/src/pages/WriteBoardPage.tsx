// src/pages/WriteBoardPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createPost } from '../api/apiClient';

const WriteBoardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!isValid) {
      setError('제목과 내용을 입력해 주세요.');
      return;
    }

    try {
      setLoading(true);

      // 백엔드가 토큰에서 유저 식별 안 해주면 userId 필요
      await createPost({
        title: title.trim(),
        content: content.trim(),
        userId: (user as any).user_id, // ★ mockAuth: user.user_id 사용
      });

      // 성공 후 목록으로
      navigate('/board');
    } catch (err: any) {
      console.error('게시글 등록 실패:', err);
      setError(err?.response?.data?.message ?? '게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>게시글 작성</h2>

      {error && (
        <p style={{ color: 'red', marginTop: 8, marginBottom: 12 }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} className="write-form" style={{ display: 'grid', gap: 12 }}>
        <div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            style={{ width: '100%', padding: 10, boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
            style={{ width: '100%', padding: 10, resize: 'vertical', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          style={{
            padding: '10px 14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: !isValid || loading ? 0.7 : 1,
          }}
        >
          {loading ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};

export default WriteBoardPage;
//