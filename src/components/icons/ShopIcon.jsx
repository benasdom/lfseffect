import { motion } from 'framer-motion'

export default function ShopIcon({ active = false, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={false}
      animate={active ? 'active' : 'idle'}
    >
      <motion.path
        d="M6.2 8.4h11.6l0.9 10.1a2 2 0 0 1-2 2.17H7.3a2 2 0 0 1-2-2.17l0.9-10.1Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.45, ease: 'easeOut' } },
        }}
      />
      <motion.path
        d="M8.7 8.4V6.8a3.3 3.3 0 0 1 6.6 0v1.6"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        variants={{
          idle: { pathLength: 1, y: 0 },
          active: {
            pathLength: [0, 1],
            y: [0, -1.5, 0],
            transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' },
          },
        }}
      />
    </motion.svg>
  )
}
