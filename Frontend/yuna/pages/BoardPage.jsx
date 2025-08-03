import PostList from '../components/PostList'
import { useState } from 'react'

export default function BoardPage() {
  const [posts, setPosts] = useState([])

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    }
    setPosts([newPost, ...posts])
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  return (
    <div className="main-panel">
      <h2>게시판</h2>
      <PostList posts={posts} deletePost={deletePost} />
    </div>
  )
}
