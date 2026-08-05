const SHOP_JSON_URL = 'https://gladysasumadu7-gif.github.io/lfseffect/lfs.json'
const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}imgs/`

export function resolveShopImageUrl(filename) {
  if (!filename) return null
  return IMAGE_BASE_URL + filename.toLowerCase()
}

export async function getShopCatalog() {
  const res = await fetch(SHOP_JSON_URL)
  if (!res.ok) throw new Error(`Failed to load shop catalog: ${res.status}`)
  const { data } = await res.json()

  const categories = Object.keys(data ?? {})
  const products = categories.flatMap((category) =>
    (data[category] ?? []).map((item, index) => ({
      id: `${category}-${index}`,
      category,
      brandName: item.brandName || '',
      price: item.price || '',
      details: item.details || '',
      images: (item.imgPath ?? []).map(resolveShopImageUrl),
    })),
  )

  return { products, categories }
}