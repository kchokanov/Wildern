import CardModel from './models/cardEntry'

async function findCardByID (model: typeof CardModel, id: string): Promise<undefined> {
  return await model.findOne({ _id: id }) ?? undefined
}

export default findCardByID
