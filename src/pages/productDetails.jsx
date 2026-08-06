import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PlaceholderPortrait from '../components/PlaceholderPortrait'
import { useShopCatalog } from '../hooks/useShopCatalogue'
import ServiceSeo from './ServiceSeo'
import { serviceSchemas } from '../data/serviceschema'

const WHATSAPP_NUMBER = '233247748509'

function buildOrderMessage(product) {
        <ServiceSeo schema={serviceSchemas.hair} />
  const lines = [
    `Hi! I'd like to order this item:`,
    ``,
    `Brand: ${product.brandName || 'N/A'}`,
    `Price: ${product.price || 'N/A'}`,
  ]
  if (product.details) {
    lines.push(`Details: ${product.details}`)
  }
  lines.push(``, `Link: ${window.location.href}`)
  return lines.join('\n')
}
export default function ProductDetail() {
  const { id } = useParams()
  const { catalog, loading } = useShopCatalog()
  const [activeIndex, setActiveIndex] = useState(0)

  const product = catalog?.products.find((p) => p.id === id)

  if (loading) {
    return (
      <section className="mx-auto max-w-md px-5 pt-6">
        <PlaceholderPortrait className="aspect-square w-full rounded-2xl" />
      </section>
    )
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-md px-5 pt-6">
        <p className="text-ink dark:text-bone">Product not found.</p>
        <Link to="/shop" className="mt-2 inline-block text-sm text-brass-dark dark:text-brass-light">
          ← Back to Shop
        </Link>
      </section>
    )
  }

  const images = product.images ?? []

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage(product),
  )}`

  return (
    <section className="mx-auto max-w-md px-5 pt-6 pb-10">
      <Link to="/shop" className="text-sm text-muted dark:text-muted-dark">← Back to Shop</Link>

      <div
        className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl scrollbar-hide"
        onScroll={(e) => {
          const el = e.currentTarget
          const index = Math.round(el.scrollLeft / el.clientWidth)
          setActiveIndex(index)
        }}
      >
        {images.map((src, i) => (
          <img
            key={src ?? i}
            src={src}
            alt={
              `${product.brandName || 'Product'}
               ${"front view.back View.left View.right View".toUpperCase().split(".")[(i)]}
               `}
            className="aspect-square w-full flex-shrink-0 snap-center rounded-2xl object-cover"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === activeIndex ? 'bg-ink dark:bg-bone' : 'bg-ink/20 dark:bg-bone/20'
              }`}
            />
          ))}
        </div>
      )}

      <h1 className="mt-5 font-display text-2xl italic text-ink dark:text-bone">
        {product.brandName || 'Untitled'}
      </h1>
      {product.price && (
        <p className="mt-1 text-lg text-brass-dark dark:text-brass-light">{product.price}<i><small>{" GHS"}</small></i></p>
      )}
      {product.details && (
        <p className="mt-4 text-sm leading-relaxed text-muted dark:text-muted-dark">{product.details}</p>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.85.505 3.583 1.386 5.077L2 22l5.062-1.35a10.006 10.006 0 0 0 4.942 1.31c5.518 0 10.004-4.486 10.004-10.004S17.522 2 12.004 2zm0 18.184a8.15 8.15 0 0 1-4.157-1.14l-.298-.176-3.007.802.803-2.936-.194-.302a8.147 8.147 0 0 1-1.244-4.428c0-4.514 3.673-8.187 8.187-8.187s8.187 3.673 8.187 8.187-3.673 8.187-8.187 8.187z"/>
        </svg>
        Order via WhatsApp
      </a>
    </section>
  )
}