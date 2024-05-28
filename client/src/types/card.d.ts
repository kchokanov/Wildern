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

    costType1: string | undefined
    costType2: string | undefined
    costType3: string | undefined
    costAmount1: number | 0
    costAmount2: number | 0
    costAmount3: number | 0
    valueType1: string | undefined
    valueType2: string | undefined
    valueType3: string | undefined
    valueAmount1: number | undefined
    valueAmount2: number | undefined
    valueAmount3: number | undefined

    isHandEff: boolean
    isCycle: boolean
    isMythic: boolean
    isMyth: boolean
    isContiniousPower: boolean

    img: string | undefined
    _id: string
  }
}

export {}
