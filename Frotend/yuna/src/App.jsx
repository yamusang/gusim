import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import GuestPage from '../pages/GuestPage'
import PicPage from '../pages/PicPage'
import BoardPage from '../pages/BoardPage'


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/Board' element={<BoardPage/>}/>
      <Route path='/Guest' element={<GuestPage/>}/>
      <Route path='/Pic' element={<PicPage/>}/>
    </Routes>
  )
}