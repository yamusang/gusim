import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import GuestPage from '../pages/GuestPage'
import PicPage from '../pages/PicPage'
import BoardPage from '../pages/BoardPage'
import PostDetail from '../components/PostDetail'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/Home' element={<HomePage/>} />
      <Route path='/Board' element={<BoardPage/>}/>
      <Route path='/Board/:id' element={<PostDetail />} />
      <Route path='/Guest' element={<GuestPage/>}/>
      <Route path='/Pic' element={<PicPage/>}/>
    </Routes>
  )
}
