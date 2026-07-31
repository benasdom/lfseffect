import { motion } from 'framer-motion'

export default function GalleryIcon({ active = false, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={false}
      animate={active ? 'active' : 'idle'}
    >
      <motion.rect
        x="3.5" y="4.5" width="17" height="15" rx="2.4"
        stroke="currentColor" strokeWidth="1.6"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.5, ease: 'easeOut' } },
        }}
      />
      <motion.circle
        cx="8.5" cy="9.3" r="1.5" stroke="currentColor" strokeWidth="1.5"
        variants={{
          idle: { scale: 1, opacity: 0.9 },
          active: { scale: [0.4, 1.15, 1], opacity: 1, transition: { duration: 0.45, delay: 0.15 } },
        }}
        style={{ originX: '8.5px', originY: '9.3px' }}
      />
      <motion.path
        d="M4.2 16.8l4.6-4.6a1.4 1.4 0 0 1 2 0l2.9 2.9"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.4, delay: 0.1, ease: 'easeOut' } },
        }}
      />
      <motion.path
        d="M11 19.4l5.2-5.2a1.4 1.4 0 0 1 2 0l1.6 1.6"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.4, delay: 0.22, ease: 'easeOut' } },
        }}
      />
    </motion.svg>
  )
}
