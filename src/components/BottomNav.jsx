import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import StylesIcon from './icons/StylesIcon'
import GalleryIcon from './icons/GalleryIcon'
import BookIcon from './icons/BookIcon'
import ShopIcon from './icons/ShopIcon'
import ProfileIcon from './icons/ProfileIcon'

const TABS = [
  { path: '/styles', label: 'Styles', Icon: StylesIcon },
  { path: '/gallery', label: 'Gallery', Icon: GalleryIcon },
  { path: '/', label: 'Book', Icon: BookIcon },
  { path: '/shop', label: 'Shop', Icon: ShopIcon },
  { path: '/profile', label: 'Profile', Icon: ProfileIcon },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

const activeIndex = useMemo(() => {
  const i = TABS.findIndex((t) =>
    t.path === '/' ? pathname === '/' : pathname === t.path || pathname.startsWith(`${t.path}/`),
  )
  return i === -1 ? 2 : i
}, [pathname])

  const slot = 100 / TABS.length
  const bumpLeft = slot * activeIndex + slot / 2

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 pb-safe"
    >
      <div className="relative mx-auto max-w-md px-3 pb-2">
        {/* floating isolated bubble for the active tab */}
        <motion.div
          className="absolute -top-6 z-10 flex flex-col items-center"
          style={{ left: `${bumpLeft}%` }}
          animate={{ left: `${bumpLeft}%` }}
          initial={false}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <div className="-translate-x-1/2">
            <motion.button
              type="button"
              onClick={() => navigate(TABS[activeIndex].path)}
              aria-current="page"
              aria-label={TABS[activeIndex].label}
              className="relative flex h-14 w-14 items-center justify-center rounded-full
                         bg-noir text-bone shadow-soft ring-4 ring-ivory dark:ring-noir
                         dark:bg-brass dark:text-noir"
              layout
              whileTap={{ scale: 0.92 }}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-brass/70" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={TABS[activeIndex].path}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  {(() => {
                    const { Icon } = TABS[activeIndex]
                    return <Icon active className="h-6 w-6" />
                  })()}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.span
              key={`${TABS[activeIndex].label}-label`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-1 block text-center font-sans text-[11px] font-medium tracking-wide text-ink dark:text-bone"
            >
              {TABS[activeIndex].label}
            </motion.span>
          </div>
        </motion.div>

        {/* the bar itself */}
        <div
          className="relative flex items-center justify-between rounded-[1.75rem]
                     border border-ink/[0.06] bg-paper/90 px-2 pt-3 pb-2 shadow-soft
                     backdrop-blur-lg dark:border-bone/[0.08] dark:bg-noir-surface/90"
        >
          {TABS.map(({ path, label, Icon }, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-1 flex-col items-center gap-1 py-1 outline-none"
              >
                <AnimatePresence>
                  {!isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-6 w-6 items-center justify-center text-ink-soft dark:text-bone-soft"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                  )}
                  {isActive && <span className="h-6 w-6" aria-hidden="true" />}
                </AnimatePresence>
                <span
                  className={`text-[11px] font-medium tracking-wide transition-opacity duration-200 ${
                    isActive ? 'opacity-0' : 'opacity-100 text-ink-soft dark:text-bone-soft'
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
