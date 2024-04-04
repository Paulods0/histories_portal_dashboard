import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CookiesProvider } from "react-cookie"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import { AuthProvider } from "./context/AuthContext.tsx"
// import { ThemeContextProvider } from "./context/ThemeContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CookiesProvider>
      <AuthProvider>
        <React.StrictMode>
          <App />
          <ToastContainer />
        </React.StrictMode>
      </AuthProvider>
    </CookiesProvider>
  </BrowserRouter>
)
