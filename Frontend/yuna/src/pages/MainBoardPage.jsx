import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/apiClient';

const MainBoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        console.log("📦 불러온 게시글:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.warn("⚠️ 예상치 못한 데이터 구조:", data);
          setPosts([]);
        }

        setError(null);
      } catch (err) {
        console.error("❌ 게시글 로드 실패:", err);
        setError('게시글을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) return <div className="container"><p>로딩 중...</p></div>;
  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="container">
      <h2>게시판</h2>

      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Link to="/board/write" className="write-button">✏️ 글쓰기</Link>
      </div>

      <div className="post-list">
        {posts.length === 0 ? (
          <p>등록된 게시글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <Link
              key={post.postId}
              to={`/board/${post.postId}`}
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
};

export default MainBoardPage;
