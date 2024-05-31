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
      cost: [{type: '', amount: 0}],
      value: [{type: '', amount: 0}],
      isHandEff: false,
      isCycle: false,
      isMythic: false,
      isMyth: false,
      isContiniousPower: false,
      img: '',
      _id: ObjectID().toHexString()
    }
  }

  setCardData (data: any): void {
    this.setState({ cardData: data })
  }

  render (): React.JSX.Element {
    return (
      <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem' ref='CardMaker'>
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
