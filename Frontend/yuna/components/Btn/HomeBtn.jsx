import React from 'react'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom';
export default function HomeBtn() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
const handleClick = () => {
  if (!isLoggedIn) {
    alert("로그인 후 이용해주세요!");
    return;
  }
  navigate("/Home");
};

  return (
    <Button onClick={handleClick}>홈</Button>
  )
}
