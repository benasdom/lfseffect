import { motion } from 'framer-motion'

/**
 * Stand-in for real salon photography. Swap the <img> usage in Hero.jsx for
 * a real <img src="..."> once photos are ready — this keeps the exact arch
 * shape, sizing and gradient treatment so the swap is a one-line change.
 */
export default function PlaceholderPortrait({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-[#2b2419] via-[#1d1811] to-noir ${className}`}>
      {/* soft brass wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brass/25 via-transparent to-transparent" />

      {/* line-art profile w/ upswept braided bun */}
      <motion.svg
        viewBox="0 0 320 420"
        className="absolute inset-0 h-full w-full opacity-90"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M150 400 C150 330 150 300 145 275 C120 270 108 250 112 225 C90 218 82 198 92 178
             C86 155 100 128 128 118 C132 96 152 80 178 80 C210 80 232 106 230 136
             C252 142 264 168 254 190 C266 208 260 232 240 244 C244 268 236 292 214 302
             C216 330 214 365 214 400"
          stroke="var(--color-brass-light)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M178 80 C176 68 184 58 196 58 C204 58 210 63 212 70"
          stroke="var(--color-brass-light)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        {/* braid texture strokes in the bun */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.path
            key={i}
            d={`M${150 + i * 8} 96 q10 14 0 30`}
            stroke="var(--color-brass)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.08 }}
          />
        ))}
      </motion.svg>

      {/* bottom gradient for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    </div>
  )
}
