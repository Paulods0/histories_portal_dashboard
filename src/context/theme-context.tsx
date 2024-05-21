import { createContext, useContext, useState } from "react"
type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

type Props = {
  children: React.ReactNode
}
export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const currTheme: Theme = localStorage.getItem("theme") as Theme
    return currTheme ? currTheme : "dark"
  })

  const toggleTheme = () => {
    setTheme(() => {
      const currTheme = theme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", currTheme)
      return currTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("O context deve ser chamado dentro de themeContext")
  }
  return context
}
