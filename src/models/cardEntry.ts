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
  costType1: String,
  costType2: String,
  costType3: String,
  costAmount1: Number,
  costAmount2: Number,
  costAmount3: Number,
  valueType1: String,
  valueType2: String,
  valueType3: String,
  valueAmount1: Number,
  valueAmount2: Number,
  valueAmount3: Number,
  isHandEff: Boolean,
  isCycle: Boolean,
  isMythic: Boolean,
  isMyth: Boolean,
  isContiniousPower: Boolean,
  img: String
})

export default mongoose.model(collectionName, cardEntrySchema)
