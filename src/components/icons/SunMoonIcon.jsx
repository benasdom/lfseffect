import { motion } from 'framer-motion'

export default function SunMoonIcon({ isDark = false, className = '' }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" className={className} initial={false}>
      <motion.circle
        cx="12" cy="12" r="4.6"
        stroke="currentColor" strokeWidth="1.6"
        fill={isDark ? 'currentColor' : 'transparent'}
        animate={{
          rotate: isDark ? 40 : 0,
          scale: isDark ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <motion.line
          key={deg}
          x1="12" y1="2.4" x2="12" y2="4.4"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
          style={{ originX: '12px', originY: '12px', rotate: deg }}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.4 : 1,
          }}
          transition={{ duration: 0.3, delay: isDark ? 0 : i * 0.02 }}
        />
      ))}
      <motion.path
        d="M20 13.2A8 8 0 1 1 10.8 4a6.2 6.2 0 0 0 9.2 9.2Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
        fill={isDark ? 'currentColor' : 'transparent'}
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.5,
          rotate: isDark ? 0 : -60,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      />
    </motion.svg>
  )
}
