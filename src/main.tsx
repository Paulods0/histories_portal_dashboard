import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CookiesProvider } from "react-cookie"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import { AuthProvider } from "./context/auth-context.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { client } from "./config/react-query.ts"
// import { ThemeContextProvider } from "./context/ThemeContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <CookiesProvider>
        <AuthProvider>
          <React.StrictMode>
            <App />
            <ToastContainer
              autoClose={2000}
              hideProgressBar={true}
              position="bottom-right"
            />
          </React.StrictMode>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
