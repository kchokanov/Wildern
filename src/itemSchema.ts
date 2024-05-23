import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: String,
  description: String
})

module.exports = mongoose.model('Item', itemSchema)
