import { motion } from 'framer-motion'

export default function StylesIcon({ active = false, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={false}
      animate={active ? 'active' : 'idle'}
    >
      {/* comb spine */}
      <motion.path
        d="M4 8.5h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        variants={{ idle: { pathLength: 1, opacity: 1 }, active: { pathLength: 1, opacity: 1 } }}
      />
      {/* comb teeth: draw in when active, gentle stagger */}
      {[4.5, 7.2, 9.9, 12.6, 15.3, 18].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 8.5v6.5`}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={false}
          variants={{
            idle: { pathLength: 1, opacity: 0.85 },
            active: { pathLength: [0, 1], opacity: 1, transition: { duration: 0.35, delay: i * 0.035, ease: 'easeOut' } },
          }}
        />
      ))}
      {/* scissors accent, tucked bottom-right, snips open on active */}
      <motion.g
        variants={{
          idle: { rotate: 0, y: 0 },
          active: { rotate: [0, -14, 0], transition: { duration: 0.5, ease: 'easeInOut' } },
        }}
        style={{ originX: '17.5px', originY: '18px' }}
      >
        <circle cx="16" cy="19" r="1.15" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="19.2" cy="19" r="1.15" stroke="currentColor" strokeWidth="1.3" />
      </motion.g>
    </motion.svg>
  )
}
