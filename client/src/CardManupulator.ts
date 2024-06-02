import ObjectID from 'bson-objectid'
import { fetchCardbyId, postCard } from './ApicallWrapper'
import { card, cardTrait, cardType } from './types/card'

// CardMan is used to seperate out logic for interacting with
// the CardMaker parent state from it's form children
// using a passed getter and setter for the state contents
class CardManupulator {
  private readonly stateGetter: Function
  private readonly stateSetter: Function

  constructor (stateGetter: Function, stateSetter: Function) {
    this.stateGetter = stateGetter
    this.stateSetter = stateSetter
  }

  public getCardData (): card {
    return this.stateGetter()
  }

  // swap state data out for a new set pulled from the API via id
  public async changeToNewCardById (id: string): Promise<boolean> {
    let success = false
    await fetchCardbyId(id).then((data: any) => {
      if (data != null && data === '') {
        console.error('failed to change card data.')
      } else {
        this.stateSetter(data)
        success = true
      }
    }).catch(err => {
      console.error(err)
    })
    return success
  }

  public async saveCard (): Promise<boolean> {
    let success = false
    await postCard(this.getCardData())
      .then(() => {
        success = true
        this.updateStringField('_id', new ObjectID().toHexString())
      })
    return success
  }

  // TODO - might be a way to pass any value in args without the list being locked to readonly. If found, can compress all updates to a single method
  public updateStringField (fieldName: 'name' | '_id', newValue: string): void {
    const card = this.stateGetter()
    card[fieldName] = newValue
    this.stateSetter(card)
  }

  public updateCostValueField (fieldName: 'costs' | 'values', newValue: [{ type: string, amount: 0 }]): void {
    const card = this.stateGetter()
    card[fieldName] = newValue
    this.stateSetter(card)
  }

  public updateCardType (type: cardType): void {
    const card = this.stateGetter()
    card.cardType = type
    this.stateSetter(card)
  }

  public updateTrait (trait: cardTrait, newBool: boolean): void {
    const card = this.stateGetter()
    card.traits[trait] = newBool
    this.stateSetter(card)
  }

  public setFromFile (file: Blob): void {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.stateSetter(JSON.parse(String(reader.result)))
    })

    reader.addEventListener('error', err => {
      console.error(err)
    })
    // TODO - no idea how to check if this succeeds
    reader.readAsText(file)
  }
}

export default CardManupulator
