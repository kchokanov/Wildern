import React from 'react'
import ObjectID from 'bson-objectid'
import { Box, Center, HStack, VStack, Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './components/CardMakerForm'
import CardMakerPreview from './components/CardMakerPreview'

interface State {
  cardData: card
}

class CardMaker extends React.Component<{}, State> {
  mainRef: React.RefObject<HTMLDivElement>

  constructor (props: {}) {
    super(props)
    this.mainRef = React.createRef()

    // binding magic so js doesn't forget the set function exists when passing the ref
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
      <Box w='100%' h='100%' ref={this.mainRef}>
        <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem'>
          <WrapItem alignContent='center'>
            <CardMakerPreview cardData={this.state.cardData} />
          </WrapItem>
          <WrapItem alignContent='center'>
            <CardMakerForm cardData={this.state.cardData} setCardData={this.setCardData} mainPageRef={this.mainRef} />
          </WrapItem>
        </Wrap>
      </Box>
    )
  }
}

export default CardMaker
