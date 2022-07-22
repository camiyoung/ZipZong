export default function LoginRedirect(){
  const token = new URL(window.location.href).searchParams.get("token")
  if (token) {
    localStorage.setItem("token", token)
    console.log(token)
  }
  window.location.replace('/login')
}