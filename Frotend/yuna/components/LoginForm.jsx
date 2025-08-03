import { useState, useEffect } from 'react'
import api from '../Api/api'
import Button from './common/Button'

export default function LoginForm() {
  const [loginemail, setloginemail] = useState("")
  const [loginpassword, setloginpassword] = useState("")
  const [loginmessage, setloginmessage] = useState("")
  const [KAKAO_AUTH_URL, setKAKAO_AUTH_URL] = useState("")

  useEffect(() => {
    const REST_API_KEY = "f06cf639edb35cf75245bd8280da84de"
    const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback"
    const STATE = crypto.randomUUID()
    sessionStorage.setItem("kakao_login_state", STATE)

    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${STATE}`
    setKAKAO_AUTH_URL(url)
  }, [])

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/login', {
        useremail: loginemail,
        password: loginpassword
      })
      localStorage.setItem('token', res.data.token)
      setloginmessage('로그인 성공!')
    } catch (error) {
      setloginmessage('로그인 실패!')
    }
  }

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <form className='form' onSubmit={handlelogin}>
      <input
        type="text"
        placeholder='email'
        value={loginemail}
        onChange={(e) => setloginemail(e.target.value)}
      />
      <input
        type="password"
        placeholder='password'
        value={loginpassword}
        onChange={(e) => setloginpassword(e.target.value)}
      />
      <button type='submit'>sign in</button>

      <Button onClick={handlekakaoLogin}>카카오 로그인</Button>

      <p>{loginmessage}</p>
    </form>
  )
}
