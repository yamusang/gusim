import { useNavigate } from "react-router-dom";
import Button from "../common/Button"

export default function BoardBtn() {
    const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
const handleClick = () => {
  if (!isLoggedIn) {
    alert("로그인 후 이용해주세요!");
    return;
  }
  navigate("/Board");
};
  return (
    <Button onClick={handleClick}>게시판</Button>
  )
}
