import express from "express"
import 'dotenv/config.js'
import categories from "./routes/categories.js"
import listings from "./routes/listings.js"
import listing from "./routes/listing.js"
import users from "./routes/users.js"
import user from "./routes/user.js"
import auth from "./routes/auth.js"
import my from "./routes/my.js"
import messages from "./routes/messages.js"
import expoPushTokens from "./routes/expoPushTokens.js"
import helmet from "helmet"
import compression from "compression"

const app = express()

app.use(express.static("public"))
app.use(helmet())
app.use(compression())

app.use("/api/categories", express.json(), categories)
app.use("/api/listing", listing)
app.use("/api/listings", listings)
app.use("/api/user", user)
app.use("/api/users", express.json(), users)
app.use("/api/auth", express.json(), auth)
app.use("/api/my", express.json(), my)
app.use("/api/expoPushTokens", express.json(), expoPushTokens)
app.use("/api/messages", express.json(), messages)


const port = process.env.PORT || 9000
app.listen(port, function () {
  console.log(`Server started on port ${port}...`)
})
