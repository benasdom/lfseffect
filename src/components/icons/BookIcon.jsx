import { motion } from 'framer-motion'

export default function BookIcon({ active = false, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={false}
      animate={active ? 'active' : 'idle'}
    >
      <motion.rect
        x="3.5" y="5" width="14" height="14.5" rx="2.2"
        stroke="currentColor" strokeWidth="1.6"
        variants={{
          idle: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.45, ease: 'easeOut' } },
        }}
      />
      <motion.path
        d="M7.3 3.4v3.2M13.4 3.4v3.2M3.5 9.4h11.2"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        variants={{
          idle: { pathLength: 1, opacity: 1 },
          active: { pathLength: [0, 1], opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
        }}
      />
      {/* clock badge, ticks into place */}
      <motion.g
        variants={{
          idle: { scale: 1, rotate: 0 },
          active: { scale: [0.5, 1.1, 1], rotate: [0, 8, 0], transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } },
        }}
        style={{ originX: '17px', originY: '16.2px' }}
      >
        <circle cx="17" cy="16.2" r="4.3" className="fill-ivory dark:fill-noir" stroke="currentColor" strokeWidth="1.6" />
        <motion.path
          d="M17 14.1v2.3l1.6 1"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
          variants={{
            idle: { rotate: 0 },
            active: { rotate: 360, transition: { duration: 0.7, delay: 0.3, ease: 'easeInOut' } },
          }}
          style={{ originX: '17px', originY: '16.2px' }}
        />
      </motion.g>
    </motion.svg>
  )
}
