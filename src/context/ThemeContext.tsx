import { createContext, useContext, useEffect, useState } from "react"

type ThemeType = "light" | "dark"

type ThemeContextType = {
  theme: ThemeType
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useState<ThemeType>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("Theme context is undefined")
  }
  return context
}
