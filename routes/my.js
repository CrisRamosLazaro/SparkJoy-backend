import express from "express"
import listingsStore from "../store/listings.js"
import auth from "../middleware/auth.js"
import listingMapper from "../mappers/listings.js"

const router = express.Router()

router.get("/listings", auth, (req, res) => {
  const listings = listingsStore.filterListings(
    listing => listing.userId === req.user.userId
  )
  const resources = listings.map(listingMapper)
  res.send(resources)
})

export default router