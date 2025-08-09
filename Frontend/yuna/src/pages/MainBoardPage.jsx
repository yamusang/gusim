// src/pages/MainBoardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/apiClient';

export default function MainBoardPage() {
  const [posts, setPosts] = useState([]);      // [{ postId, title, authorNickname }]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchPosts();
      // 백엔드 응답 방어적 파싱
      // 가능한 패턴: Array / {posts:[]} / {content:[], totalElements,...}(Spring Page)
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
        ? data.posts
        : Array.isArray(data?.content)
        ? data.content
        : [];

      // 필드 이름 표준화: postId / title / authorNickname
      const normalized = list.map((p) => ({
        postId: p.postId ?? p.id ?? p.post_id,
        title: p.title ?? '',
        authorNickname: p.authorNickname ?? p.nickname ?? p.author ?? p.writer ?? '',
      }));

      setPosts(normalized);
    } catch (e) {
      console.error('❌ 게시글 로드 실패:', e);
      setError('게시글을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="container"><p>로딩 중...</p></div>;
  if (error)
    return (
      <div className="container">
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={load} style={{ marginTop: 8 }}>다시 시도</button>
      </div>
    );

  return (
    <div className="container">
      <h2>게시판</h2>

      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <Link to="/board/write" className="write-button">✏️ 글쓰기</Link>
      </div>

      <div className="post-list">
        {posts.length === 0 ? (
          <p>등록된 게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.postId}
              to={`/board/${post.postId}`}   // 라우터가 /Board면 대소문자 맞춰!
              className="post-list-item"
            >
              <span>{post.title}</span>
              <span>{post.authorNickname}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
