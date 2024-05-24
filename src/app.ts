import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'
import CardEntry from './models/cardEntry'
import findCardByID from './dbHandler'

const MONGODB_URL: string = process.env.DB_URL ?? ''
const PORT: number = Number(process.env.PORT ?? 3000)

const app = express()
const newCard = new CardEntry({
  name: 'New Card! Pog Champ'
})

console.log(newCard.id)

app.use(express.static(path.join(__dirname, '/../client/dist')))

// Start DB connection then server
mongoose.connect(MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Web port open on: ${PORT.toString()}`)
    // Promise.resolve(newCard.save()).catch(err => console.error(err))
    Promise.resolve(findCardByID(CardEntry, '6650619e62ba12950d888020'))
      .then(data => console.log(data))
      .catch(err => console.error(err))
  })
}).catch(err => console.error(err))
