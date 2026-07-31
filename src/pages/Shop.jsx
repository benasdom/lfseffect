import { motion } from 'framer-motion'
import PlaceholderPortrait from '../components/PlaceholderPortrait'

const PRODUCTS = [
  { name: 'Braid Balm', price: 'GH₵85' },
  { name: 'Edge Control', price: 'GH₵60' },
  { name: 'Scalp Oil', price: 'GH₵95' },
  { name: 'Silk Bonnet', price: 'GH₵70' },
]

export default function Shop() {
  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">STUDIO SHOP</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Shop.</h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
          >
            <PlaceholderPortrait className="aspect-square w-full rounded-xl" />
            <p className="mt-2 font-display text-base text-ink dark:text-bone">{p.name}</p>
            <p className="text-sm text-brass-dark dark:text-brass-light">{p.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
