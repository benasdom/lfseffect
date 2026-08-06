// src/pages/NotFound.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark"
      >
        LOST YOUR WAY
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-1.5 font-display text-[3.2rem] leading-[1.05] text-ink dark:text-bone"
      >
        404<em className="italic text-ink dark:text-bone">.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="mt-3 text-sm text-muted dark:text-muted-dark"
      >
        This page doesn&rsquo;t exist &mdash; but your next style still does.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3 text-sm font-semibold text-bone shadow-soft ring-4 ring-ivory transition-transform active:scale-95 dark:bg-bone dark:text-ink dark:ring-noir"
        >
          Return Home
        </Link>
      </motion.div>
    </section>
  )
}