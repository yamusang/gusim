// src/components/Comment.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Comment = ({ comment, onAddReply, allComments }) => {
  const { user } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // 현재 댓글의 대댓글(자식)들을 찾습니다.
  const replies = allComments.filter(c => c.parent_id === comment.comment_id);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onAddReply(replyContent, comment.comment_id);
    setReplyContent('');
    setIsReplying(false);
  };

  return (
    <div className="comment">
      <p className="comment-author">{comment.author.nickname}</p>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        {user && <button className="secondary" onClick={() => setIsReplying(!isReplying)}>답글</button>}
      </div>

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="comment-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="따뜻한 답글을 남겨주세요."
            rows="2"
          />
          <button type="submit">등록</button>
        </form>
      )}

      {/* 대댓글이 있으면 재귀적으로 Comment 컴포넌트를 렌더링합니다. */}
      {replies.length > 0 && (
        <div className="replies">
          {replies.map(reply => (
            <Comment
              key={reply.comment_id}
              comment={reply}
              onAddReply={onAddReply}
              allComments={allComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;