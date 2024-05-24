import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors' 
import bodyParser from 'body-parser'
import 'dotenv/config'
import cardEntry from './models/cardEntry'

const MONGODB_URL: string = process.env.DB_URL ?? ''
const PORT: number = Number(process.env.PORT ?? 3000)

const app = express()
app.use(cors())

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO - fix URL routing
app.use(express.static(path.join(__dirname, '/../client/dist')))

// Start DB connection then server
mongoose.connect(MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Web port open on: ${PORT.toString()}`)
  })

  app.post("/api/savecard", async (req, res) => {
    try {
      if(!req.body){res.status(400).send('No data in request')}
      
      res.status(200).send('OK')

      // create model from body and save to DB
      const card = new cardEntry(req.body)
      cardEntry.findOneAndUpdate({ _id: req.body._id }, req.body, {
        new: true,
        upsert: true,
      })
      .catch(err => console.error(err))
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
}).catch(err => console.error(err))
