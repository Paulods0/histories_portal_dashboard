import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import { CookiesProvider } from "react-cookie"

import { QueryClientProvider } from "@tanstack/react-query"
import { client } from "./config/react-query.ts"

import { AuthProvider } from "./context/auth-context.tsx"
import { ThemeContextProvider } from "./context/theme-context.tsx"

import "react-toastify/dist/ReactToastify.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <CookiesProvider>
        <AuthProvider>
          <React.StrictMode>
            <ThemeContextProvider>
              <App />
              <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                position="bottom-right"
              />
            </ThemeContextProvider>
          </React.StrictMode>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
