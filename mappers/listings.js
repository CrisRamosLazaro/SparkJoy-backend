import 'dotenv/config.js'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : process.env.DEV_BASE_URL

const mapper = listing => {
  const mapImage = image => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`
  })

  return {
    ...listing,
    images: listing.images.map(mapImage)
  }
}

export default mapper
