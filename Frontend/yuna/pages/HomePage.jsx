import React from 'react'
import "../styles/board.css"
import LogoutForm from '../components/LogoutForm'
import HomeBtn from '../components/Btn/HomeBtn'
import BoardBtn from '../components/Btn/BoardBtn'
import PicBtn from '../components/Btn/PicBtn'
import GuestBtn from '../components/Btn/GuestBtn'
export default function HomePage() {
  return (
    <div className="container">
          <div className="left-panel">
            <LogoutForm/>
          </div>
          <div className="main-panel">
            <h2>TEAM HEART OF GURO</h2>
            <p>Ol제 그만 울ㅈr....</p>
            <p>Ol제 그만 ㅁㅣㅊㅣㅈr...</p>
            <p>Ol제 그만 ㅈl우ㅈr...</p>
            <p>Ol제 그만 잊ㅈr...</p>
            <p>Ol제 그만 끝ㄴHㅈr...</p>
            <p>ㅁl련도.. ㅇr픔도...</p>
            <p>ㅎrㅈl만... ㄴr는 ㄱr끔 눈물을 흘린ㄷr....</p>
          </div>
          <div className="right-panel">
            <HomeBtn/>
            <BoardBtn/>
            <PicBtn/>
            <GuestBtn/>
          </div>
        </div>
  )
}
