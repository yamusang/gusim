import React from 'react'
import Header from './Header'
import '../styles/board.css'

export default function BoardPage() {
  return (
    <><div>게시판</div><Router>
      <Header /> {/* 모든 페이지에 보여줄 헤더 */}
      <div className="container" style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/new" element={<PostForm addPost={addPost} />} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} deletePost={deletePost} />} />
          <Route path="/edit/:id" element={<PostForm posts={posts} updatePost={updatePost} />} />
        </Routes>
      </div>
    </Router></>
  )
}
