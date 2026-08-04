import { useEffect, useState } from 'react'
import { getShopCatalog } from '../lfseffect-shop-api'

// Static, non-expiring URLs — safe to cache for the whole session
let cachedCatalog = null
let inFlightRequest = null

export function useShopCatalog() {
  const [catalog, setCatalog] = useState(cachedCatalog)
  const [loading, setLoading] = useState(cachedCatalog === null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cachedCatalog !== null) return

    let cancelled = false

    async function load() {
      try {
        if (!inFlightRequest) {
          inFlightRequest = getShopCatalog()
        }
        const result = await inFlightRequest
        if (cancelled) return
        cachedCatalog = result
        setCatalog(result)
      } catch (err) {
        console.error('Failed to load shop catalog', err)
        if (!cancelled) setError(err)
      } finally {
        inFlightRequest = null
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { catalog, loading, error }
}