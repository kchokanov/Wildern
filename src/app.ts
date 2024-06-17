import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'

import { searchAndFetchOne, addOrUpdateEntry, fetchAll, searchAndFetchMatchingNames } from './dbHandler'
import cardEntry from './models/cardEntry'
import valueEntry from './models/valueEntry'

const MONGODB_URL: string = process.env.DB_URL ?? ''
const APP_PORT: number = !Number.isNaN(Number(process.env.APP_PORT)) ? Number(process.env.APP_PORT) : 3000
const API_PORT: number = !Number.isNaN(Number(process.env.API_PORT)) ? Number(process.env.API_PORT) : 3000

// App Main
const app = express()
const api = express()

if (process.env.NODE_ENV === 'development') {
  console.info('Server is running in dev mode.')
  app.use(cors())
  api.use(cors())
}

app.use(express.static(path.join(__dirname, '/../client/dist')))

// Req Listeners
mongoose.connect(MONGODB_URL).then(() => {
  app.listen(APP_PORT, () => {
    console.log(`App port open on: ${APP_PORT.toString()}`)
  })
  api.listen(API_PORT, () => {
    console.log(`API port open on: ${API_PORT.toString()}`)
  })

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
  })

  api.post('/api/savecard', (req, res) => {
    addOrUpdateEntry(cardEntry, req, res)
  })
  api.post('/api/savetribute', (req, res): void => {
    addOrUpdateEntry(valueEntry, req, res)
  })
  api.get('/api/card', (req, res): void => {
    searchAndFetchOne(cardEntry, req, res)
  })
  api.get('/api/value', (req, res): void => {
    searchAndFetchOne(valueEntry, req, res)
  })
  api.get('/api/alltribute', (_req, res): void => {
    fetchAll(valueEntry, res)
  })
  api.get('/api/searchcard', (req, res): void => {
    searchAndFetchMatchingNames(cardEntry, req, res)
  })
}).catch((err) => console.error(err))
