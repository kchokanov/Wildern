import mongoose from 'mongoose'

const collectionName = process.env.CARD_COLLECTION ?? ''

const cardEntrySchema = new mongoose.Schema({
  name: String,
  effect: String,
  quote: String,
  cardType: String, // enums?
  author: String,
  artAuthor: String,
  atk: Number,
  def: Number,

  costType1: String, // enum?
  costType2: String, // enum?
  costType3: String, // enum?
  costAmount1: Number,
  costAmount2: Number,
  costAmount3: Number,
  valueType1: String, // enum?
  valueType2: String, // enum?
  valueType3: String, // enum?
  valueAmount1: Number,
  valueAmount2: Number,
  valueAmount3: Number,

  specialType1: String, // enum?
  specialType2: String, // enum?

  img: String
})

export default mongoose.model(collectionName, cardEntrySchema)
