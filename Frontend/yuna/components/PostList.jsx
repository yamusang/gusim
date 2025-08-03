import { Link } from "react-router-dom";
import "../styles/post.css";

export default function PostList({ posts }) {
  return (
    <div className="post-box">
      <h2 className="post-title">게시글 목록</h2>
      <div className="post-header-action">
        <Link to="/new" className="btn btn-primary">글쓰기</Link>
      </div>

      {posts.length === 0 ? (
        <p>게시글이 없습니다. 첫 글을 작성해보세요!</p>
      ) : (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id} className="post-list-item">
              <Link to={`/posts/${post.id}`} className="post-link">
                <h3>{post.title}</h3>
                <p className="post-meta">작성자: {post.author} | 작성일: {post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
