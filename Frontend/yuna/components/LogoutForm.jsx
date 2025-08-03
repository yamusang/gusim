import React from 'react'
import Button from './common/Button';
export default function LogoutForm() {
  const handleLogout = () => {
  localStorage.removeItem("token"); // 토큰 제거
  alert("로그아웃 되었습니다.");
  window.location.href = "/"; 
};

  return (
    <Button className='btn'>로그아웃</Button>
  )
}
