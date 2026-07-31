import { motion } from 'framer-motion'
import PlaceholderPortrait from '../components/PlaceholderPortrait'

const STYLES = [
  { name: 'Knotless Box Braids', time: '4–6 hrs', price: 'from GH₵450' },
  { name: 'Sculptural Feed-in Bun', time: '2–3 hrs', price: 'from GH₵350' },
  { name: 'Fulani Cornrows', time: '2 hrs', price: 'from GH₵250' },
  { name: 'Loc Retwist', time: '1.5 hrs', price: 'from GH₵180' },
]

export default function Styles() {
  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">CATALOGUE</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Styles.</h2>

      <div className="mt-6 flex flex-col gap-4">
        {STYLES.map((s, i) => (
          <motion.button
            key={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-paper p-3 text-left shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
          >
            <PlaceholderPortrait className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg text-ink dark:text-bone">{s.name}</p>
              <p className="text-sm text-ink-soft dark:text-bone-soft">{s.time}</p>
            </div>
            <span className="shrink-0 text-sm font-medium text-brass-dark dark:text-brass-light">{s.price}</span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
