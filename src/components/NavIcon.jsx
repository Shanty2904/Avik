import { useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function NavIcon({ light, hover, dark, darkHover, alt }) {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  function getSrc() {
    if (isDark && isHovered && darkHover) return darkHover
    if (isDark && dark) return dark
    if (isHovered && hover) return hover
    return light
  }

  return (
    <img
      src={getSrc()}
      alt={alt}
      className="h-[55px] w-auto block transition-transform duration-200 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
