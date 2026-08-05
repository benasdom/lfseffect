import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PlaceholderPortrait from '../components/PlaceholderPortrait'
import { useShopCatalog } from '../hooks/useShopCatalogue'

const SKELETON_COUNT = 4
const INITIAL_BATCH = 12
const BATCH_SIZE = 12

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

function formatCategoryLabel(category) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function Shop() {
  const { catalog, loading } = useShopCatalog()
  const [activeCategory, setActiveCategory] = useState(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
  const sentinelRef = useRef(null)

  const categories = catalog?.categories ?? []
  const allProducts = catalog?.products ?? []

  // Default to the first category once the catalog loads
  useEffect(() => {
    if (categories.length > 0 && activeCategory === null) {
      setActiveCategory(categories[0])
    }
  }, [categories, activeCategory])

  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.category === activeCategory),
    [allProducts, activeCategory],
  )

  // Reset the visible window whenever the category changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH)
  }, [activeCategory])

  const items = useMemo(() => {
    if (loading || categoryProducts.length === 0) {
      return Array.from({ length: SKELETON_COUNT }, (_, i) => ({ id: `skeleton-${i}` }))
    }
    return categoryProducts
  }, [loading, categoryProducts])

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

      {categories.length > 0 && (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-ink text-paper dark:bg-bone dark:text-noir-surface'
                  : 'bg-ink/[0.06] text-ink dark:bg-bone/[0.08] dark:text-bone'
              }`}
            >
              {formatCategoryLabel(category)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        {visibleItems.map((p, i) => {
          const src = p.images?.[0]
          const hasImage = Boolean(src)
          const isSkeleton = typeof p.id === 'string' && p.id.startsWith('skeleton-')

          const card = (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.02 }}
              className="rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {hasImage ? (
                  <ProductImage src={src} alt={p.brandName || 'Studio product'} />
                ) : (
                  <PlaceholderPortrait className="absolute inset-0 h-full w-full" />
                )}
              </div>

              {p.brandName && <p className="mt-2 font-display text-base text-ink dark:text-bone">{p.brandName}</p>}
              {p.price && <p className="text-sm text-brass-dark dark:text-brass-light">{p.price}</p>}
            </motion.div>
          )

          return isSkeleton ? (
            <div key={p.id}>{card}</div>
          ) : (
            <Link key={p.id} to={`/shop/${p.id}`}>{card}</Link>
          )
        })}
      </div>

      {visibleCount < items.length && <div ref={sentinelRef} className="h-1 w-full" />}
    </section>
  )
}