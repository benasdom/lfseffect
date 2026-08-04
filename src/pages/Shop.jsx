import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PlaceholderPortrait from '../components/PlaceholderPortrait'
import { BASE_URL, getLfseffectImages } from '../lfseffect-api'

const SKELETON_COUNT = 4
const INITIAL_BATCH = 12   // how many render immediately (like FlatList's initialNumToRender)
const BATCH_SIZE = 12      // how many more render per scroll trigger (like onEndReached)

function resolveImageUrl(path) {
  if (!path) return null
  return /^https?:\/\//i.test(path) ? path : BASE_URL + path
}

function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <PlaceholderPortrait className="absolute inset-0 h-full w-full" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
  const sentinelRef = useRef(null)

  // Fresh fetch every time this screen mounts — no stale signed URLs, ever.
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const { files } = await getLfseffectImages()
        if (cancelled) return

        const mapped = (files ?? []).map((file, i) => ({
          id: file.id ?? i,
          name: file.name ?? '',
          price: file.price ?? '',
          imgUrl: file.url,
        }))

        setProducts(mapped)
        setVisibleCount(INITIAL_BATCH)
      } catch (err) {
        console.error('Failed to load shop images', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const items = useMemo(() => {
    if (loading || products.length === 0) {
      return Array.from({ length: SKELETON_COUNT }, (_, i) => ({ id: `skeleton-${i}` }))
    }
    return products
  }, [loading, products])

  // Grow the visible window as the user scrolls near the bottom — like FlatList's onEndReached
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, items.length))
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [items.length])

  const visibleItems = items.slice(0, visibleCount)

  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">STUDIO SHOP</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Shop.</h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {visibleItems.map((p, i) => {
          const src = resolveImageUrl(p.imgUrl)
          const hasImage = Boolean(src)

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % BATCH_SIZE) * 0.04 }}
              className="rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {hasImage ? (
                  <ProductImage src={src} alt={p.name || 'Studio product'} />
                ) : (
                  <PlaceholderPortrait className="absolute inset-0 h-full w-full" />
                )}
              </div>

              {p.name && <p className="mt-2 font-display text-base text-ink dark:text-bone">{p.name}</p>}
              {p.price && <p className="text-sm text-brass-dark dark:text-brass-light">{p.price}</p>}
            </motion.div>
          )
        })}
      </div>

      {visibleCount < items.length && <div ref={sentinelRef} className="h-1 w-full" />}
    </section>
  )
}