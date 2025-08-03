import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';

function PostDetali() {
    const {id} = useParams()
    const navigate = useNavigate();
    const post = postMessage.find(p=> p.id === parseInt(id));

   if(!post) {
     return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>게시글을 찾을 수 없습니다.</div>;
   }
  const handleDelete = () => {
 if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deletePost(post.id);
      navigate('/'); // 삭제 후 목록 페이지로 이동
    }
  };
  return(
 <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{post.title}</h2>
      <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
        작성자: {post.author} | 날짜: {post.date}
      </p>
      <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', marginBottom: '30px' }}>
        {post.content}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={`/edit/${post.id}`} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          수정
        </Link>
        <button onClick={handleDelete} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          삭제
        </button>
        <button onClick={() => navigate('/')} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          목록으로
        </button>
      </div>
    </div>
  );
}
     


export default PostDetali