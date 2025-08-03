// src/pages/KakaoCallback.jsx
import React, { useEffect } from 'react'
import axios from 'axios'

export default function KakaoCallback() {
  useEffect(() => {
    const sendCode = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      try {
        const res = await axios.post('http://localhost:8080/api/kakao-login', {
          code,
        })

        const token = res.data
        localStorage.setItem('token', token)
        window.location.href = '/home' // 로그인 성공 후 홈으로 이동
      } catch (e) {
        console.error('카카오 로그인 실패', e)
      }
    }

    sendCode()
  }, [])

  return <div>카카오 로그인 처리 중...</div>
}
//1