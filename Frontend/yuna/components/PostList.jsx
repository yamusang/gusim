import { Link } from "react-router-dom";


export default function PostList({ posts }) {
  return (
    <div>
      <h2>게시글 목록</h2>
      <div>
        <Link to="/new">글쓰기</Link>
      </div>

      {posts.length === 0 ? (
        <p>게시글이 없습니다. 첫 글을 작성해보세요!</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                <p>작성자: {post.author} | 작성일: {post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
