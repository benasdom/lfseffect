import { motion } from 'framer-motion'
import heroImage from '../assets/img/portfolio/makeup.jpg'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function Hero() {
  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark"
      >
        RECENT
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mt-1.5 text-center font-display text-[2.6rem] leading-[1.05] text-ink dark:text-bone"
      >
        let&rsquo;s <em className="italic text-ink dark:text-bone">tour.</em>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[9rem] rounded-b-3xl shadow-soft">
          <img
            src={heroImage}
            alt="Featured sculptural braided style, side profile"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-lg italic text-white">Featured Sculptural Style</p>
            <p className="mt-0.5 text-sm text-white/70">
              Hand-detailed knotless braids, styled in-studio.
            </p>
          </div>
        </div>

        <motion.a
          href="https://wa.me/233247748509?text=Hello%20LF%27s%20Effects!%20I%27d%20like%20to%20book%20an%20appointment."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7, type: 'spring', stiffness: 260, damping: 18 }}
          className="absolute -bottom-2 right-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft ring-4 ring-ivory dark:ring-noir"
        >
          <WhatsAppIcon className="h-9 w-9" />
        </motion.a>
      </motion.div>
    </section>
  )
}