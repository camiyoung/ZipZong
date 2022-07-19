import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "flowbite"
import reportWebVitals from "./reportWebVitals"

<<<<<<< HEAD
const root = ReactDOM.createRoot(document.getElementById("root"));
=======
const root = ReactDOM.createRoot(document.getElementById('root'))
>>>>>>> 74d9776 (Create: react-router추가, components페이지 추가)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
