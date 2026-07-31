import { motion } from 'framer-motion'
import PlaceholderPortrait from '../components/PlaceholderPortrait'

export default function Gallery() {
  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">LOOKBOOK</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Gallery.</h2>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
          >
            <PlaceholderPortrait className={`w-full rounded-2xl ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
