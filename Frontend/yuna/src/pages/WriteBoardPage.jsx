// src/pages/WriteBoardPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createPost } from '../api/apiClient'; // or '@api/apiClient'


// user 객체에서 PK 뽑기(네 프로젝트 구조에 맞게 우선순위로 체크)
const pickUserId = (user) =>
  user?.userId ?? user?.id ?? user?.user_id ?? null;

export default function WriteBoardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    const uid = pickUserId(user);
    if (!user || uid == null) {
      setError('로그인 정보가 없거나 userId를 찾을 수 없어요.');
      console.warn('user object:', user);
      return;
    }
    if (!isValid) {
      setError('제목과 내용을 입력해 주세요.');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        content: content.trim(),
        userId: uid, // ★ 백엔드 DTO 필드명과 동일해야 함
      };

      await createPost(payload);
      navigate('/board'); // 작성 후 목록으로 이동
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        '게시글 작성에 실패했습니다.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>게시글 작성</h2>

      {error && <p style={{ color: 'red', margin: '8px 0 12px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
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
}
