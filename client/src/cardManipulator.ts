import ObjectID from 'bson-objectid'
import { getCardById, postCard } from './apiWrapper'
import { card, cardType, cardTrait } from './types/card'

// Used to create initial card entry and to reset it
export function newCard (): card {
  return {
    name: '',
    effect: '',
    quote: '',
    cardType: cardType.wildern,
    author: '',
    artAuthor: '',
    atk: 0,
    hp: 0,
    costs: [{ type: '', amount: 0 }],
    values: [{ type: '', amount: 0 }],
    traits: {
      contpower: false,
      cycle: false,
      handeff: false,
      myth: false,
      mythic: false
    },
    _id: new ObjectID().toHexString()
  }
}

// CardMan is a class for interacting with the main Card Maker component state.
// It allows for controlled interaction of components with said state, when passed as a prop.
class CardManupulator {
  private readonly stateGetter: Function
  private readonly stateSetter: Function

  constructor (stateGetter: Function, stateSetter: Function) {
    this.stateGetter = stateGetter
    this.stateSetter = stateSetter
  }

  public getCardData (): card {
    return this.stateGetter().card
  }

  public getArt (): Blob {
    return this.stateGetter().cardArt
  }

  public setArt (blob: Blob): void {
    this.stateSetter({ cardArt: blob })
  }

  private getAndSetArtById (cardId: string): void {
    // TODO - DB art storage setup
  }

  // Swap state data out for a new set pulled from the API via id
  public async changeToNewCardById (id: string): Promise<boolean> {
    let success = false
    await getCardById(id).then((data: any) => {
      if (data != null && data === '') {
        console.error('failed to change card data.')
      } else {
        this.stateSetter({ card: data })
        this.getAndSetArtById(data.id)
        success = true
      }
    }).catch(err => {
      console.error(err)
    })
    return success
  }

  // Post card data and reset local data if successful
  public async saveCard (): Promise<boolean> {
    let success = false
    //TODO - post art seperatly
    await postCard(this.getCardData())
      .then((res) => {
        if (res) {
          success = true
          this.stateSetter({ card: newCard(), cardArt: null })
        }
      })
    return success
  }

  public updateStringField (fieldName: 'name' | '_id' | 'artAuthor' | 'effect' | 'quote', newValue: string): void {
    const card = this.stateGetter().card
    card[fieldName] = newValue
    this.stateSetter({ card })
  }

  public updateStat (fieldName: 'atk' | 'hp', newValue: number): void {
    const card = this.stateGetter().card
    card[fieldName] = newValue
    this.stateSetter({ card })
  }

  public updateCostValueField (fieldName: 'costs' | 'values', index: number, type: string | null, amount: number | null): void {
    if (type == null && amount == null) {
      console.error('Attempted Tribute set with no data.')
      return
    }

    const card = this.stateGetter().card
    if (type != null) {
      card[fieldName][index].type = type
    }
    if (amount != null) {
      card[fieldName][index].amount = amount
    }
    this.stateSetter({ card })
  }

  public addCostValue (fieldName: 'costs' | 'values', newValue: { type: string, amount: 0 }): void {
    const card = this.stateGetter().card
    card[fieldName].push(newValue)
    this.stateSetter({ card })
  }

  public removeCostValue (fieldName: 'costs' | 'values', index: number): void {
    const card = this.stateGetter().card
    card[fieldName].splice(index - 1, 1)
    this.stateSetter({ card })
  }

  public updateCardType (type: cardType): void {
    const card = this.stateGetter().card
    card.cardType = type
    this.stateSetter({ card })
  }

  public updateTrait (trait: cardTrait, newBool: boolean): void {
    const card = this.stateGetter().card
    card.traits[trait] = newBool
    this.stateSetter({ card })
  }

  // TODO store art in saved json, and read here
  public setCardFromFile (file: Blob): void {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.stateSetter({ card: JSON.parse(String(reader.result)) })
    })

    reader.addEventListener('error', err => {
      console.error(err)
    })
    // TODO - onload check if successful
    reader.readAsText(file)
  }
}

export default CardManupulator
