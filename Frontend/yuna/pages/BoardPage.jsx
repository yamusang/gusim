import { useState } from 'react'
import PostList from '../components/PostList'
import '../styles/board.css'

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
    <div className='container'>
      <div className='left-panel'>
        <PostList posts={posts} deletePost={deletePost} />
      </div>
      <div className="main-panel" style={{ margin: '100px auto', maxWidth: '800px' }}>
      <h2 style={{ fontFamily: 'dalmoori' }}>📋 게시판</h2>
     
    </div>
    </div>
  )
}
