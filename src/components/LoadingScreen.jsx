import { motion } from 'framer-motion'
import LogoMark from './icons/LogoMark'

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ivory dark:bg-noir"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* brass ring spinner */}
        <motion.svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full" fill="none">
          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="1" className="text-ink/10 dark:text-bone/10" />
          <motion.circle
            cx="40" cy="40" r="34"
            stroke="var(--color-brass)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="60 154"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '40px', originY: '40px' }}
          />
        </motion.svg>

        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-noir text-bone dark:bg-brass dark:text-noir"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoMark className="h-6 w-6" />
        </motion.span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="font-display text-xl italic text-ink dark:text-bone"
      >
        lfs Effect
      </motion.p>
    </motion.div>
  )
}