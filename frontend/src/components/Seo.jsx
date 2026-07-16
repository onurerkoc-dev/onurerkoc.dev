import { useEffect } from 'react'

const SITE_URL = 'https://onurerkoc.dev'
const DEFAULT_IMAGE_PATH = '/og-cover.png'
const DEFAULT_IMAGE_ALT =
  'Onur Erkoç Software Engineering Portfolio'

function updateMetaTag(attribute, value, content) {
  let metaTag = document.head.querySelector(
    `meta[${attribute}="${value}"]`
  )

  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute(attribute, value)
    document.head.appendChild(metaTag)
  }

  metaTag.setAttribute('content', content)
}

function updateCanonicalLink(canonicalUrl) {
  let canonicalLink = document.head.querySelector(
    'link[rel="canonical"]'
  )

  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }

  canonicalLink.setAttribute('href', canonicalUrl)
}

function updateStructuredData(structuredDataJson) {
  const existingScript = document.head.querySelector(
    '#seo-structured-data'
  )

  if (!structuredDataJson) {
    existingScript?.remove()
    return
  }

  const script =
    existingScript ?? document.createElement('script')

  script.id = 'seo-structured-data'
  script.type = 'application/ld+json'
  script.textContent = structuredDataJson

  if (!existingScript) {
    document.head.appendChild(script)
  }
}

function Seo({
  title,
  description,
  path = '/',
  robots = 'index, follow',
  type = 'website',
  image = DEFAULT_IMAGE_PATH,
  imageAlt = DEFAULT_IMAGE_ALT,
  structuredData = null,
}) {
  const canonicalUrl = new URL(path, SITE_URL).toString()
  const imageUrl = new URL(image, SITE_URL).toString()

  const structuredDataJson = structuredData
    ? JSON.stringify(structuredData)
    : ''

  useEffect(() => {
    document.title = title

    updateMetaTag('name', 'description', description)
    updateMetaTag('name', 'robots', robots)

    updateMetaTag('property', 'og:type', type)
    updateMetaTag('property', 'og:locale', 'en_US')
    updateMetaTag(
      'property',
      'og:site_name',
      'onurerkoc.dev'
    )
    updateMetaTag('property', 'og:title', title)
    updateMetaTag(
      'property',
      'og:description',
      description
    )
    updateMetaTag('property', 'og:url', canonicalUrl)
    updateMetaTag('property', 'og:image', imageUrl)
    updateMetaTag(
      'property',
      'og:image:secure_url',
      imageUrl
    )
    updateMetaTag('property', 'og:image:type', 'image/png')
    updateMetaTag('property', 'og:image:width', '1200')
    updateMetaTag('property', 'og:image:height', '630')
    updateMetaTag('property', 'og:image:alt', imageAlt)

    updateMetaTag(
      'name',
      'twitter:card',
      'summary_large_image'
    )
    updateMetaTag('name', 'twitter:title', title)
    updateMetaTag(
      'name',
      'twitter:description',
      description
    )
    updateMetaTag('name', 'twitter:image', imageUrl)
    updateMetaTag(
      'name',
      'twitter:image:alt',
      imageAlt
    )

    updateCanonicalLink(canonicalUrl)
    updateStructuredData(structuredDataJson)
  }, [
    title,
    description,
    canonicalUrl,
    robots,
    type,
    imageUrl,
    imageAlt,
    structuredDataJson,
  ])

  return null
}

export default Seo
