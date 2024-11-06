import express from "express"
import Joi from "joi"
import multer from "multer"

import store from "../store/listings.js"
import categoriesStore from "../store/categories.js"
import validateWith from "../middleware/validation.js"
import auth from "../middleware/auth.js"
import imageResize from "../middleware/imageResize.js"
import delay from "../middleware/delay.js"
import listingMapper from "../mappers/listings.js"
import config from "config"

const router = express.Router()

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
})

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
})

const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." })

  next()
}

const validateLocation = (req, res, next) => {

  if (req.body.location) {
    try {
      req.body.location = JSON.parse(req.body.location)
    } catch (error) {
      return res.status(400).send({ error: "Invalid location format." })
    }
  }
  next()
}

router.get("/", (req, res) => {
  const listings = store.getListings()
  const resources = listings.map(listingMapper)
  res.send(resources)
})

router.post(
  "/",
  [
    // auth,
    upload.array("images", config.get("maxImageCount")),
    validateLocation,
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
    }

    listing.images = req.images.map((fileName) => ({ fileName: fileName }))
    if (req.user) listing.userId = req.user.userId

    store.addListing(listing)

    res.status(201).send(listing)
  }
)

export default router
