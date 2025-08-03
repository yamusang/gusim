import React, { useEffect, useState } from 'react'

function PostFom({addPost, updatePost,posts}) {
    const {id} = usePatams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const[title, setTitle] =useState('');
    const[content, setConetent] = useSatate('');
    const[author, setAuthor]=useState('');

    useEffect(() =>{
        if (isEditing && posts) {
            const posToEdit = posts.find(p => p.id === parseInt(id));
        if(postToEdit){
            setTitle(postToEdit.title);
            setConetent(postToEdit.content);
            setAuthor(postToEdit.author);
        }
        }
    },[id,isEditing,posts]);

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()){
        alert('모든 필드를 입력해주세요.');
        return;
    }
    if (isEditing) {
        updatePost({id: parseInt(id), title, content,author});

    }else {
        addPost({title,content,author});
    }
    navigate('/')
  
}
return (
  <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px' }}>{isEditing ? '게시글 수정' : '새 글 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>작성자</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
            required
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em' }}>
          {isEditing ? '수정 완료' : '작성 완료'}
        </button>
        <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em' }}>
          취소
        </button>
      </form>
    </div>
  );
}
export default PostFom;