import mongoose from 'mongoose'
import express from 'express'

// update or write new doc to DB based on model
export function apiWrite (
  model: typeof mongoose.Model,
  req: express.Request,
  res: express.Response
): void {
  if (req.body._id == null) {
    res.status(400).send('No id in request')
  }
  model
    .findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
      upsert: true
    })
    .then((data) => {
      console.log(`Saved data for: ${String(data._id)}`)
      res.status(200).send('Saved data succesfully')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Failed to save data')
    })
}

// fetches from DB by model and name if present in req, or id if not
export function apiQuery (
  model: typeof mongoose.Model,
  req: express.Request,
  res: express.Response
): void {
  if (req.query._id == null && req.query.name == null) {
    res.status(400).send('No id or name in request')
  }
  model
    .findOne(
      req.query.name != null ? { name: req.query.name } : { _id: req.query._id }
    )
    .then((data) => {
      console.log(`Fetched data for ${String(data._id)}`)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Failed to fetch data')
    })
}

export function apiFetchAll (
  model: typeof mongoose.Model,
  res: express.Response
): void {
  model
    .find()
    .then((data) => {
      console.log(
        `Fetched all data for model: ${model.collection.collectionName}`
      )
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Failed to fetch all')
    })
}
