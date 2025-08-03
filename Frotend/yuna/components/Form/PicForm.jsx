import React from 'react'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom';
export default function PicForm() {
    const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
const handleClick = () => {
  if (!isLoggedIn) {
    alert("로그인 후 이용해주세요!");
    return;
  }
  navigate("/board");
};
  return (
    <Button onClick={handleClick}>사진첩</Button>
  )
}
