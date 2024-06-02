import mongoose from 'mongoose'

const collectionName = process.env.CARD_COLLECTION ?? ''

const cardEntrySchema = new mongoose.Schema({
  name: String,
  effect: String,
  quote: String,
  cardType: String,
  author: String,
  artAuthor: String,
  atk: Number,
  def: Number,
  costs: Array,
  values: Array,
  traits: Object,
  img: String
})

export default mongoose.model(collectionName, cardEntrySchema)
