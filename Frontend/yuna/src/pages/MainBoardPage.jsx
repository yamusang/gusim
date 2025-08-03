// src/pages/MainBoardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/apiClient'; // API 클라이언트 임포트

const MainBoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('게시글을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) return <div className="container"><p>로딩 중...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;

  return (
    <div className="container">
      <h2>게시판</h2>
      <div className="post-list">
        {posts.map(post => (
          <Link key={post.postId} to={`/board/${post.postId}`} className="post-list-item">
            <span>{post.title}</span>
            <span>{post.authorNickname}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainBoardPage;