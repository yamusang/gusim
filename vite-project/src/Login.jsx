import React, { isValidElement, useState } from 'react'
import "./login.css"
import api from './api.js'

export default function Login() {
    const [isopen, setisopen] = useState(false)
    const [isopen2, setisopen2] = useState(false)

    const [username, setusername] = useState("")
    const [useremail, setuseremail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordcheck, setpasswordcheck] = useState("")

    const [loginemail, setloginemail] = useState("")
    const [loginpassword, setloginpassword] = useState("")

    const [message, setmessage] = useState("")
    const [loginmessage, setloginmessage] = useState("")

    const isMatch = password === passwordcheck
    const isValidEmail = useremail.includes('@') && useremail.includes('.')
    const isFormValid = username && useremail && isValidEmail && password && password === passwordcheck

    const isLogin = loginemail.includes('@') && loginpassword.length >= 1

    const toggleForm = () => {
        setisopen(!isopen)
    }
    const toggleForm2 = () => {
        setisopen2(!isopen2)
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/signup', {username, email:useremail, password
            })
            const token = res.data.token
            localStorage.setItem('token', token)
            setmessage('회원가입 성공!')
        } catch (error) {
            setmessage('회원가입 실패!')
            
        }
    }
    const handlelogin = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/signup', {loginemail, loginpassword
            })
            const token = res.data.token
            localStorage.setItem('token', token)
            setloginmessage('로그인 성공!')
        } catch (error) {
            setloginmessage('로그인 실패!')
            
        }
    }

  return (
    <div className='container'>
        <button className="signbtn" onClick={toggleForm}>회원 가입</button>
        <div className={`signwrapper${isopen?' open':''}`}>
            <form className='signform' onSubmit={handlesubmit}>
                <input type="text" placeholder='name' value={username} onChange={(e)=>setusername(e.target.value)}/>
                <input type="text" placeholder='email' value={useremail} onChange={(e)=>setuseremail(e.target.value)}/>
                <input type="text" placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <input type="text" placeholder='passwordcheck' value={passwordcheck} onChange={(e)=>setpasswordcheck(e.target.value)}/>
                <button type='submit' disabled={!isFormValid}>
                    sign up
                </button>
                <p>{message}</p>
                {!isValidEmail && useremail && <p style={{color:'red'}}>이메일 형식이 올바르지 않습니다</p>}
                {passwordcheck && !isMatch && ( <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</p>)}
            </form>
        </div>
        <button className="signbtn" onClick={toggleForm2}>로그인</button>
        <div className={`signwrapper${isopen2?' open':''}`}>
            <form className='signform' onSubmit={handlelogin}>
                <input type="text" placeholder='email' value={loginemail} onChange={(e)=>setloginemail(e.target.value)}/>
                <input type="text" placeholder='password' value={loginpassword} onChange={(e)=>setloginpassword(e.target.value)}/>
                <button type='submit' disabled={!isLogin}>
                    sign up
                </button>
                <p>{loginmessage}</p>
            </form>
        </div>
    </div>
  )
}
