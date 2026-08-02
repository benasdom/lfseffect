import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaceholderPortrait from '../components/PlaceholderPortrait'
import { BASE_URL, getLfseffectImages } from '../lfseffect-api'

const SKELETON_COUNT = 4

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { files } = await getLfseffectImages()
        if (cancelled) return
        setProducts(
          (files ?? []).map((file, i) => ({
            id: file.id ?? i,
            name: file.name ?? '',
            price: file.price ?? '',
            imgUrl: file.url,
          })),
        )
      } catch (err) {
        console.error('Failed to load shop images', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const items = loading || products.length === 0
    ? Array.from({ length: SKELETON_COUNT }, (_, i) => ({ id: `skeleton-${i}` }))
    : products

  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">STUDIO SHOP</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Shop.</h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {items.sort(()=> Math.random() - 0.5 ).map((p, i) => {
          const hasImage = Boolean(p.thumbnailUrl)
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <AnimatePresence mode="wait" initial={false}>
                  {hasImage ? (
                    <motion.img
                      key="image"
                      src={BASE_URL+p.thumbnailUrl}
                      alt={p.name || 'Studio product'}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                  ) : (
                    <motion.div key="placeholder" className="absolute inset-0" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                      <PlaceholderPortrait className="h-full w-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {p.name && <p className="mt-2 font-display text-base text-ink dark:text-bone">{p.name}</p>}
              {p.price && <p className="text-sm text-brass-dark dark:text-brass-light">{p.price}</p>}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}