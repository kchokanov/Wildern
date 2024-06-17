import mongoose from 'mongoose'
import express from 'express'

// Update or insert new entry based on model and request Id/name param
export function addOrUpdateEntry (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.body._id == null) {
    res.status(400).send('No id in request')
    return
  }

  // if name is present use both name and id params otherwise use only id
  model.findOneAndUpdate(
    req.body.name != null ? { name: req.body.name, _id: req.body._id } : { _id: req.body._id }, req.body,
    {
      new: true,
      upsert: true
    }
  ).then((data) => {
    console.log(`Saved data for: _id: ${String(data._id)}`)
    res.status(200).send(`Server saved data: _id: ${String(req.body._id)}`)
  }).catch((err) => {
    console.error(err)
    res.status(500).send(`Server failed to save data: _id: ${String(req.body._id)}`)
  })
}

// Get first valid entry for model via name or id
export function searchAndFetchOne (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.query._id == null && req.query.name == null) {
    res.status(400).send('No id or name in request')
    return
  }

  // if name is not an empty string or null search by name, otherwise search by id
  model.findOne(
    req.query.name != null && String(req.query.name).replace(/\s/g, '') !== '' ? { name: req.query.name } : { _id: req.query._id }
  ).then(data => {
    console.log(`Fetched data: ${model.collection.collectionName}, name: ${String(req.query.name)}, _id: ${String(req.query._id)}`)
    res.status(200).send(data)
  }).catch(err => {
    console.error(err)
    res.status(500).send(`Server failed fetch for: name: ${String(req.query.name)}, _id: ${String(req.query._id)}`)
  })
}

// Get all data for model
export function fetchAll (model: typeof mongoose.Model, res: express.Response): void {
  model.find().then((data) => {
    console.log(`Fetched all data: ${model.collection.collectionName}`)
    res.status(200).send(data)
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Server failed fetch for all')
  })
}

// Get all name and corresponding id data for model where name matches part of search string
export function searchAndFetchMatchingNames (model: typeof mongoose.Model, req: express.Request, res: express.Response): void {
  if (req.query.searchQueryStr == null) {
    res.status(400).send('No name in request')
    return
  }

  // if search query is empty string fetch full list of names with IDs, otherwise only fetch matching names with IDS
  model.find(req.query.searchQueryStr !== '' ? { name: { $regex: req.query.searchQueryStr, $options: 'i' } } : {})
    .select('name').then((data) => {
      console.log(`Fetched all matching data: ${model.collection.collectionName}, searchQuery: '${String(req.query.searchQueryStr)}'`)
      res.status(200).send(data)
    }).catch((err) => {
      console.error(err)
      res.status(500).send(`Server failed fetch for all mathing: searchQuery: ${String(req.query.searchQueryStr)}`)
    })
}
