// src/pages/BoardPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId, addComment } from '../api/apiClient';
import Comment from '../components/Comment';
import { useAuth } from '../contexts/AuthContext';

const BoardPage = () => {
  const { postId } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // Promise.all로 게시글과 (Mock)댓글을 동시에 불러옵니다.
      const [postData, commentsData] = await Promise.all([
        fetchPostById(postId),
        fetchCommentsByPostId(postId) // 이 부분은 Mock API 입니다.
      ]);
      setPost(postData);
      setComments(commentsData);
      setError(null);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [postId]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddComment = async (content, parentId = null) => {
    if (!user) {
        alert("로그인이 필요합니다.");
        return;
    }
    try {
        // 이 부분은 Mock API 입니다.
        await addComment({ postId, userId: user.userId, content, parentId });
        // 데이터 다시 로드하여 화면 갱신
        const commentsData = await fetchCommentsByPostId(postId);
        setComments(commentsData);
        if (parentId === null) {
            setNewCommentContent('');
        }
    } catch (err) {
        console.error("댓글 작성 실패 (Mock):", err);
    }
  };

  if (loading) return <div className="container"><p>로딩 중...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;
  if (!post) return <div className="container"><p>게시글을 찾을 수 없습니다.</p></div>;

  // 최상위 댓글만 필터링
  const rootComments = comments.filter(comment => comment.parentId === null);

  return (
    <div className="container">
      <header className="post-header">
        <h2>{post.title}</h2>
        <p>작성자: {post.authorNickname} | 조회수: {post.viewCount}</p>
      </header>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />

      <section className="comments-section">
        <h3>댓글</h3>
        {rootComments.map(comment => (
          <Comment 
            key={comment.commentId} 
            comment={comment} 
            allComments={comments}
            onAddReply={handleAddComment}
          />
        ))}
        {/* 새 댓글 작성 폼 */}
        <form onSubmit={(e) => { e.preventDefault(); handleAddComment(newCommentContent); }} className="comment-form" style={{marginLeft: 0, marginTop: '2rem'}}>
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="따뜻한 댓글을 남겨주세요."
            rows="3"
          />
          <button type="submit">댓글 등록</button>
        </form>
      </section>
    </div>
  );
};

export default BoardPage;