import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'

const ACTIONS = [
  { label: 'View styles', to: '/styles' },
  { label: 'Browse gallery', to: '/gallery' },
  { label: 'Shop products', to: '/shop' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-md px-5 pt-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ACTIONS.map((a, i) => (
            <motion.button
              key={a.to}
              onClick={() => navigate(a.to)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.06 }}
              whileTap={{ scale: 0.96 }}
              className="shrink-0 rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-medium text-ink shadow-sm dark:border-bone/10 dark:bg-noir-surface dark:text-bone"
            >
              {a.label}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 border-t border-ink/[0.06] pt-6 dark:border-bone/[0.08]">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">
            THIS WEEK
          </p>
          <p className="mt-2 font-display text-2xl leading-snug text-ink dark:text-bone">
            Three chairs open Friday — knotless & loc retwists.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-bone-soft">
            Tap Book below to see live availability and hold your spot with a deposit.
          </p>
        </div>
      </section>
    </>
  )
}
