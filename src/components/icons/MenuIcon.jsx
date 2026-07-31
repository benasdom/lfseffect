import { motion } from 'framer-motion'

export default function MenuIcon({ open = false, className = '' }) {
  const line = {
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
  }
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" className={className} initial={false}>
      <motion.line
        {...line}
        x1="4" x2="20" y1="7" y2="7"
        animate={open ? { rotate: 45, y: 5, x2: 20 } : { rotate: 0, y: 0 }}
        style={{ originX: '12px', originY: '7px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
      <motion.line
        {...line}
        x1="4" x2="20" y1="12" y2="12"
        animate={{ opacity: open ? 0 : 1, x: open ? -6 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        {...line}
        x1="4" x2="20" y1="17" y2="17"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ originX: '12px', originY: '17px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
    </motion.svg>
  )
}
