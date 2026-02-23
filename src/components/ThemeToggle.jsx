import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-toggle fixed bottom-6 left-6 w-12 h-12 z-[2000] p-0 focus:outline-none"
    />
  )
}
