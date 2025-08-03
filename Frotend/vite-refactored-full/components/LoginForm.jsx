import { useState } from 'react'
import api from '../api/api'

export default function LoginForm() {
  const [loginemail, setloginemail] = useState("")
  const [loginpassword, setloginpassword] = useState("")
  const [loginmessage, setloginmessage] = useState("")

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

  return (
    <form className='form' onSubmit={handlelogin}>
      <input type="text" placeholder='email' value={loginemail} onChange={(e) => setloginemail(e.target.value)} />
      <input type="password" placeholder='password' value={loginpassword} onChange={(e) => setloginpassword(e.target.value)} />
      <button type='submit'>sign in</button>
      <p>{loginmessage}</p>
    </form>
  )
}
//3