import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { apiQuery, apiWrite, apiFetchAll, apiFetchAllNames } from './dbHandler'
import cardEntry from './models/cardEntry'
import valueEntry from './models/valueEntry'

const MONGODB_URL: string = process.env.DB_URL ?? ''
const PORT: number = Number(process.env.PORT ?? 3000)

// App Main
const app = express()
app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// TODO - fix URL routing
app.use(express.static(path.join(__dirname, '/../client/dist')))

// Req Listeners
mongoose.connect(MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Page port open on: ${PORT.toString()}`)
  })

  app.post('/api/savecard', (req, res) => {
    apiWrite(cardEntry, req, res)
  })
  app.post('/api/savevalue', (req, res): void => {
    apiWrite(valueEntry, req, res)
  })

  app.get('/api/fetchcard', (req, res): void => {
    apiQuery(cardEntry, req, res)
  })
  app.get('/api/fetchvalue', (req, res): void => {
    apiQuery(valueEntry, req, res)
  })
  app.get('/api/allvalue', (_req, res): void => {
    apiFetchAll(valueEntry, res)
  })
  app.get('/api/fetchcardnames', (req, res): void => {
    apiFetchAllNames(cardEntry, req, res)
  })
})
  .catch((err) => console.error(err))
