import { useEffect, useMemo, useState } from 'react'
import PlaceholderPortrait from '../components/PlaceholderPortrait'
import { BASE_URL, getLfseffectImages } from '../lfseffect-api'

const SKELETON_COUNT = 4

// Lives outside the component, so it survives unmount/remount (nav away and back)
let cachedProducts = null
let inFlightRequest = null

function resolveImageUrl(path) {
  if (!path) return null
  return /^https?:\/\//i.test(path) ? path : BASE_URL + path
}

export default function Shop() {
  const [products, setProducts] = useState(cachedProducts ?? [])
  const [loading, setLoading] = useState(cachedProducts === null)

  useEffect(() => {
    // Already have data from a previous visit — skip refetch entirely
    if (cachedProducts !== null) {
      setProducts(cachedProducts)
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      try {
        // Avoid duplicate fetches if effect re-runs (e.g. StrictMode) while one is in flight
        if (!inFlightRequest) {
          inFlightRequest = getLfseffectImages()
        }
        const { files } = await inFlightRequest
        if (cancelled) return

        const mapped = (files ?? []).map((file, i) => ({
          id: file.id ?? i,
          name: file.name ?? '',
          price: file.price ?? '',
          imgUrl: file.url,
          thumbnailUrl: file.thumbnailUrl,
        }))

        cachedProducts = mapped
        setProducts(mapped)
      } catch (err) {
        console.error('Failed to load shop images', err)
      } finally {
        inFlightRequest = null
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

  return (
    <section className="mx-auto max-w-md px-5 pt-6">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-muted dark:text-muted-dark">STUDIO SHOP</p>
      <h2 className="mt-1.5 font-display text-3xl italic text-ink dark:text-bone">Shop.</h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {items.map((p) => {
          const src = resolveImageUrl(p.imgUrl)
          const hasImage = Boolean(src)

          return (
            <div
              key={p.id}
              className="rounded-2xl border border-ink/[0.06] bg-paper p-3 shadow-sm dark:border-bone/[0.08] dark:bg-noir-surface"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {hasImage ? (
                  <img
                    src={src}
                    alt={p.name || 'Studio product'}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <PlaceholderPortrait className="absolute inset-0 h-full w-full" />
                )}
              </div>

              {p.name && <p className="mt-2 font-display text-base text-ink dark:text-bone">{p.name}</p>}
              {p.price && <p className="text-sm text-brass-dark dark:text-brass-light">{p.price}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}