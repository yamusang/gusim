import { useNavigate, useParams, Link } from "react-router-dom";


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
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.author} | 작성일: {post.date}</p>
      <p>{post.content}</p>
      <div style={{ marginTop: "20px" }}>
        <Link to={`/edit/${post.id}`}>수정</Link>
        <button onClick={handleDelete}>삭제</button>
        <Link to="/" >목록</Link>
      </div>
    </div>
  );
}
