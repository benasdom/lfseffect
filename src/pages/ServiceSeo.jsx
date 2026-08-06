// src/components/ServiceSeo.jsx
import { Helmet } from 'react-helmet-async'
import { BUSINESS_ID_URL } from '../data/serviceSchema'

export default function ServiceSeo({ schema }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: schema.serviceType,
    name: schema.name,
    url: schema.url,
    description: schema.description,
    provider: { '@id': BUSINESS_ID_URL },
    areaServed: { '@type': 'City', name: 'Accra' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: schema.name,
      itemListElement: schema.items.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }

  return (
    <Helmet>
      <title>{`${schema.name} | LFS Effects Salon`}</title>
      <meta name="description" content={schema.description} />
      <link rel="canonical" href={schema.url} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}