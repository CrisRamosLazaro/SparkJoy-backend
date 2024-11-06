import express from "express"
import store from "../store/listings.js"
import auth from "../middleware/auth.js"
import listingMapper from "../mappers/listings.js"

const router = express.Router()

router.get("/:id", auth, (req, res) => {
  const listing = store.getListing(parseInt(req.params.id))
  if (!listing) return res.status(404).send()
  const resource = listingMapper(listing)
  res.send(resource)
})

export default router
