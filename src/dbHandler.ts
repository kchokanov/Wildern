import mongoose from 'mongoose'
import express from 'express'

// update or write new doc to DB based on model
export function apiWrite (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.body._id == null) {
    res.status(400).send('No id in request')
    return
  }
  model
    .findOneAndUpdate(req.body.name != null ? { name: req.body.name, _id: req.body._id } : { _id: req.body._id }, req.body, {
      new: true,
      upsert: true
    })
    .then((data) => {
      console.log(`Saved data for: _id: ${String(data._id)}`)
      res.status(200).send(`Server saved data: _id: ${String(req.body._id)}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(`Server failed to save data: _id: ${String(req.body._id)}`)
    })
}

// fetches from DB by model and name if present in req, or id if not
export function apiQuery (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.query._id == null && req.query.name == null) {
    res.status(400).send('No id or name in request')
    return
  }
  model.findOne(req.query.name != null && String(req.query.name).replace(/\s/g, '') !== '' ? { name: req.query.name } : { _id: req.query._id })
    .then(data => {
      console.log(`Fetched data: ${model.collection.collectionName}, name: ${String(req.query.name)}, _id: ${String(req.query._id)}`)
      res.status(200).send(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(`Server failed fetch for: name: ${String(req.query.name)}, _id: ${String(req.query._id)}`)
    })
}

export function apiFetchAll (model: typeof mongoose.Model, res: express.Response): void {
  model
    .find()
    .then((data) => {
      console.log(`Fetched all data: ${model.collection.collectionName}`)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server failed fetch for all')
    })
}

export function apiFetchAllNames (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.query.searchQueryStr == null) {
    res.status(400).send('No name in request')
    return
  }
  model
    .find(req.query.searchQueryStr !== '' ? { name: { $regex: req.query.searchQueryStr, $options: 'i' } } : {}).select('name')
    .then((data) => {
      console.log(`Fetched all matching data: ${model.collection.collectionName}, searchQuery: '${String(req.query.searchQueryStr)}'`)
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send(`Server failed fetch for all mathing: searchQuery: ${String(req.query.searchQueryStr)}`)
    })
}
