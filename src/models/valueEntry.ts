import mongoose from 'mongoose'

const collectionName = process.env.VALUE_COLLECTION ?? ''

const cardEntrySchema = new mongoose.Schema({
  name: String
})

export default mongoose.model(collectionName, cardEntrySchema)
