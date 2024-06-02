export enum cardType {
  wildern = 'wildern',
  power = 'power'
}

export enum cardTrait {
  HandEffect = 'handeff',
  Cycle = 'cycle',
  Mythic = 'mythic',
  Myth = 'myth',
  ContinuousPower = 'contpower',
}

export interface card {
  name: string | ''
  effect: string | ''
  quote: string | ''
  cardType: cardType
  author: string | ''
  artAuthor: string | ''
  atk: number | 0
  def: number | 0
  costs: Array<{ type: string, amount: number }>
  values: Array<{ type: string, amount: number }>
  traits: {
    [cardTrait.ContinuousPower]: boolean
    [cardTrait.Cycle]: boolean
    [cardTrait.HandEffect]: boolean
    [cardTrait.Myth]: boolean
    [cardTrait.Mythic]: boolean
  }
  _id: string
}
