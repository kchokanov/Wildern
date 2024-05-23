import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'

const MONGODB_URL: string = process.env.DB_URL ?? ''
const PORT: number = Number(process.env.PORT ?? 3000)

const app = express()

app.use(express.static(path.join(__dirname, '/../client/dist')))

// Start DB connection then server
mongoose.connect(MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Web port open on: ${PORT.toString()}`)
  })
}).catch(err => console.error(err))
