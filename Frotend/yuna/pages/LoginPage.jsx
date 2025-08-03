import { useNavigate } from "react-router"
import "../styles/login.css"
import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import Button from "../components/common/Button"
import { useState } from "react"


export default function LoginPage() {
  const navigate = useNavigate()
  const [isopen, setisopen] = useState(false)
  const [isopen2, setisopen2] = useState(false)

  const toggleForm = () => setisopen(!isopen)
  const toggleForm2 = () => setisopen2(!isopen2)

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
      <div className="right-panel">
        <Button>홈</Button>
        <Button>게시판</Button>
        <Button>사진첩</Button>
        <Button>방명록</Button>
      </div>
    </div>
  )
}
