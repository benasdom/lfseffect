import { motion } from 'framer-motion'

export default function ProfileIcon({ active = false, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={false}
      animate={active ? 'active' : 'idle'}
    >
      <motion.circle
        cx="12" cy="8.3" r="3.3"
        stroke="currentColor" strokeWidth="1.6"
        variants={{
          idle: { scale: 1 },
          active: { scale: [0.6, 1.15, 1], transition: { duration: 0.4, ease: 'easeOut' } },
        }}
        style={{ originX: '12px', originY: '8.3px' }}
      />
      <motion.path
        d="M4.8 20c0.9-3.9 3.9-6 7.2-6s6.3 2.1 7.2 6"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.45, delay: 0.12, ease: 'easeOut' } },
        }}
      />
    </motion.svg>
  )
}
