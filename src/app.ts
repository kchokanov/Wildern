import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'

import { apiQuery, apiWrite, apiFetchAll, apiFetchAllNames } from './dbHandler'
import cardEntry from './models/cardEntry'
import valueEntry from './models/valueEntry'

const MONGODB_URL: string = process.env.DB_URL ?? ''
// TODO NaN check
const APP_PORT: number = Number(process.env.APP_PORT) ?? 3000
const API_PORT: number = Number(process.env.API_PORT) ?? 3001

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
    apiWrite(cardEntry, req, res)
  })
  api.post('/api/savevalue', (req, res): void => {
    apiWrite(valueEntry, req, res)
  })
  api.get('/api/fetchcard', (req, res): void => {
    apiQuery(cardEntry, req, res)
  })
  api.get('/api/fetchvalue', (req, res): void => {
    apiQuery(valueEntry, req, res)
  })
  api.get('/api/allvalue', (_req, res): void => {
    apiFetchAll(valueEntry, res)
  })
  api.get('/api/fetchcardnames', (req, res): void => {
    apiFetchAllNames(cardEntry, req, res)
  })
})
  .catch((err) => console.error(err))
