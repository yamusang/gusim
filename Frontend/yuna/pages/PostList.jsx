import React from 'react'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>게시글 목록</h2>
      <Link to="/new" style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginBottom: '20px' }}>
        새 글 작성
      </Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.length === 0 ? (
          <p>게시글이 없습니다. 새 글을 작성해 보세요!</p>
        ) : (
          //게시글 제목 클릭시 상세페이지로 이동 
          posts.map(post => (
            <li key={post.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
              <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{post.title}</h3>
                <p style={{ fontSize: '0.9em', color: '#666' }}>작성자: {post.author} | 날짜: {post.date}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}


export default PostList