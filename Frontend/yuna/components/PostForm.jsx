import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function PostForm({ addPost, updatePost, posts }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      const postToEdit = posts.find((p) => p.id === Number(id));
      if (postToEdit) {
        setTitle(postToEdit.title);
        setAuthor(postToEdit.author);
        setContent(postToEdit.content);
      }
    }
  }, [id, isEdit, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: isEdit ? Number(id) : undefined, title, author, content };
    isEdit ? updatePost(newPost) : addPost(newPost);
    navigate("/");
  };

  return (
    <div>
      <h2>{isEdit ? "글 수정" : "새 글 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="author">작성자</label>
          <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea id="content" rows="10" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">{isEdit ? "수정하기" : "작성하기"}</button>
      </form>
    </div>
  );
}
