import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] stroke-foreground" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] stroke-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}