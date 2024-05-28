import React, { } from 'react'
import ObjectID from 'bson-objectid'
import { Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './components/CardMakerForm'
import CardMakerPreview from './components/CardMakerPreview'

interface State {
  cardData: card
}

class CardMaker extends React.Component<{}, State> {
  // binding magic so js doesn't forget the set function exists when passing the ref
  constructor (props: {}) {
    super(props)
    this.setCardData = this.setCardData.bind(this)
  }

  state: State = {
    cardData: {
      name: '',
      effect: '',
      quote: '',
      cardType: 'wildern',
      author: '',
      artAuthor: '',
      atk: 0,
      def: 0,
      costType1: undefined,
      costType2: undefined,
      costType3: undefined,
      costAmount1: 0,
      costAmount2: 0,
      costAmount3: 0,
      valueType1: undefined,
      valueType2: undefined,
      valueType3: undefined,
      valueAmount1: undefined,
      valueAmount2: undefined,
      valueAmount3: undefined,
      isHandEff: false,
      isCycle: false,
      isMythic: false,
      isMyth: false,
      isContiniousPower: false,
      img: undefined,
      _id: ObjectID().toHexString()
    }
  }

  setCardData (data: any): void {
    this.setState({ cardData: data })
  }

  render (): React.JSX.Element {
    return (
      <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem'>
        <WrapItem alignContent='center'>
          <CardMakerPreview cardData={this.state.cardData} />
        </WrapItem>
        <WrapItem alignContent='center'>
          <CardMakerForm cardData={this.state.cardData} setCardData={this.setCardData} />
        </WrapItem>
      </Wrap>
    )
  }
}

export default CardMaker
