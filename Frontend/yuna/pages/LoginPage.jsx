import { useNavigate } from "react-router"
import "../styles/board.css"
import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import Button from "../components/common/Button"
import BoardBtn from "../components/Btn/BoardBtn"
import GuestBtn from "../components/Btn/GuestBtn"
import HomeBtn from "../components/Btn/HomeBtn"
import PicBtn from "../components/Btn/PicBtn"
import { useState } from "react"


export default function LoginPage() {
  const [isopen, setisopen] = useState(false)
  const [isopen2, setisopen2] = useState(false)

  const toggleForm = () => setisopen(!isopen)
  const toggleForm2 = () => setisopen2(!isopen2)

  const token = localStorage.getItem("token")

  return (
    <div className="container">
      <div className="left-panel">
        <Button className="btn" onClick={toggleForm}>회원가입</Button>
        <div className={`wrapper${isopen ? ' open' : ''}`}>
        <SignUpForm/>
        </div>
        <Button className="btn" onClick={toggleForm2}>로그인</Button>
        <div className={`wrapper${isopen2 ? ' open' : ''}`}>
        <LoginForm />
        </div>
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
      {token && (<div className="right-panel">
        <HomeBtn/>
        <BoardBtn/>
        <PicBtn/>
        <GuestBtn/>
      </div>)}
    </div>
  )
}
