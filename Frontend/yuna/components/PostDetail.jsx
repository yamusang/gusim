import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/post.css";

export default function PostDetail({ posts, deletePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <p>해당 게시글을 찾을 수 없습니다.</p>;

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(post.id);
      navigate("/");
    }
  };

  return (
    <div className="post-box">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta">작성자: {post.author} | 작성일: {post.date}</p>
      <p className="post-content">{post.content}</p>
      <div style={{ marginTop: "20px" }}>
        <Link to={`/edit/${post.id}`} className="btn btn-edit">수정</Link>
        <button className="btn btn-delete" onClick={handleDelete}>삭제</button>
        <Link to="/" className="btn btn-back">목록</Link>
      </div>
    </div>
  );
}
