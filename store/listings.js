import listings from '../db/mock-db-listings.js'

const addListing = (listing) => {
  listing.id = listings.length + 1
  listings.push(listing)
}

const getListings = () => listings

const getListing = (id) => listings.find((listing) => listing.id === id)

const filterListings = (predicate) => listings.filter(predicate)

export default {
  addListing,
  getListings,
  getListing,
  filterListings,
}
