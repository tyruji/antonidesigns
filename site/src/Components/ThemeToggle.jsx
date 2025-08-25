import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-secondary border-2 border-primary rounded-full cursor-pointer
                 hover:bg-primary transition-colors duration-500"
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-primary hover:text-secondary transition-transform duration-500 rotate-0" />
      ) : (
        <MoonIcon className="h-6 w-6 text-primary hover:text-secondary transition-transform duration-500 rotate-0" />
      )}
    </button>
  )
}