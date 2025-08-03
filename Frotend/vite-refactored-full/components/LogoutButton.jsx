export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token")
        window.location.href = "/"
      }}
    >
      로그아웃
    </button>
  )
}
