import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import LogoMark from './icons/LogoMark'
import SunMoonIcon from './icons/SunMoonIcon'
import MenuIcon from './icons/MenuIcon'

const MENU_LINKS = ['Our Story', 'Stylists', 'Locations', 'Reviews', 'Contact']

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-ivory/90 backdrop-blur-lg pt-safe dark:bg-noir/90">
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-noir text-bone dark:bg-brass dark:text-noir">
            <LogoMark className="h-5 w-5" />
          </span>
          <h1 className="font-display text-[1.55rem] italic leading-none text-ink dark:text-bone">
            lfs Effect
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 dark:text-bone dark:hover:bg-bone/10"
          >
            <SunMoonIcon isDark={theme === 'dark'} className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 dark:text-bone dark:hover:bg-bone/10"
          >
            <MenuIcon open={menuOpen} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-md border-b border-ink/[0.07] dark:border-bone/[0.08]" />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-ink/[0.07] bg-ivory dark:border-bone/[0.08] dark:bg-noir"
          >
            <nav className="mx-auto max-w-md px-5 py-2">
              {MENU_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="block border-b border-ink/[0.05] py-3 font-display text-lg text-ink last:border-none dark:border-bone/[0.06] dark:text-bone"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
