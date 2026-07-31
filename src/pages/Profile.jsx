import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import SunMoonIcon from '../components/icons/SunMoonIcon'
import ProfileIcon from '../components/icons/ProfileIcon'

const ROWS = ['My appointments', 'Saved styles', 'Payment methods', 'Notifications', 'Help & support']

export default function Profile() {
  const { theme, toggleTheme } = useTheme()

  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">ACCOUNT</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Profile.</h2>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-paper p-4 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-noir text-bone dark:bg-brass dark:text-noir">
          <ProfileIcon active className="h-7 w-7" />
        </span>
        <div>
          <p className="font-display text-lg text-ink dark:text-bone">Ama Boateng</p>
          <p className="text-sm text-ink-soft dark:text-bone-soft">Member since 2024</p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="mt-4 flex w-full items-center justify-between rounded-2xl border border-ink/[0.06] bg-paper p-4 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
      >
        <span className="text-ink dark:text-bone">Appearance</span>
        <span className="flex items-center gap-2 text-sm text-ink-soft dark:text-bone-soft">
          {theme === 'dark' ? 'Dark' : 'Light'}
          <SunMoonIcon isDark={theme === 'dark'} className="h-5 w-5" />
        </span>
      </button>

      <div className="mt-4 divide-y divide-ink/[0.06] rounded-2xl border border-ink/[0.06] bg-paper shadow-sm dark:divide-bone/[0.08] dark:border-bone/[0.08] dark:bg-noir-surface">
        {ROWS.map((row, i) => (
          <motion.a
            key={row}
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="block px-4 py-3.5 text-ink dark:text-bone"
          >
            {row}
          </motion.a>
        ))}
      </div>
    </section>
  )
}
