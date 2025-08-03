import { useState } from 'react'
import api from '../api/api'

export default function SignUpForm() {
  const [username, setusername] = useState("")
  const [useremail, setuseremail] = useState("")
  const [password, setpassword] = useState("")
  const [passwordcheck, setpasswordcheck] = useState("")
  const [message, setmessage] = useState("")

  const isMatch = password === passwordcheck
  const isValidEmail = useremail.includes('@') && useremail.includes('.')
  const isFormValid = username && useremail && isValidEmail && password && isMatch

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/signup', { username, useremail, password })
      localStorage.setItem('token', res.data.token)
      setmessage('회원가입 성공!')
    } catch (error) {
      setmessage('회원가입 실패!')
    }
  }

  return (
    <form className='signform' onSubmit={handlesubmit}>
      <input type="text" placeholder='name' value={username} onChange={(e) => setusername(e.target.value)} />
      <input type="text" placeholder='email' value={useremail} onChange={(e) => setuseremail(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
      <input type="password" placeholder='passwordcheck' value={passwordcheck} onChange={(e) => setpasswordcheck(e.target.value)} />
      <button type='submit' disabled={!isFormValid}>sign up</button>
      <p>{message}</p>
    </form>
  )
}
//5