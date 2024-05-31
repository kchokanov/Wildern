declare global {
  interface card {
    name: string | ''
    effect: string | ''
    quote: string | ''
    cardType: 'wildern' | 'power'
    author: string | ''
    artAuthor: string | ''
    atk: number | 0
    def: number | 0

    cost: [{type: string | '', amount: number | 0}]
    value: [{type: string | '', amount: number | 0}]

    isHandEff: boolean
    isCycle: boolean
    isMythic: boolean
    isMyth: boolean
    isContiniousPower: boolean

    img: string | ''
    _id: string
  }
}

export {}
