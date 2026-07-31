import { motion } from 'framer-motion'

export default function WhatsAppIcon({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08, rotate: 6 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 16 }}
    >
      <motion.path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.5-1.2A8.4 8.4 0 1 0 12 3.5Z"
        fill="#25D366"
      />
      <motion.path
        d="M8.7 8.4c.2-.45.4-.46.6-.47h.5c.17 0 .4-.06.62.48.23.55.78 1.9.85 2.05.07.14.11.31.02.5-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.27-.12.54.16.27.72 1.2 1.56 1.94 1.07.96 1.97 1.26 2.24 1.4.27.14.43.12.58-.07.16-.19.66-.77.84-1.03.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.14.44.2.5.32.07.11.07.66-.16 1.3-.23.64-1.33 1.24-1.85 1.32-.47.08-1.06.11-1.71-.11a15.1 15.1 0 0 1-1.44-.53c-2.55-1.1-4.2-3.66-4.33-3.83-.13-.17-1.05-1.4-1.05-2.67 0-1.27.66-1.9.9-2.16Z"
        fill="white"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}
