import React from 'react'
import { Box, Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './CardMakerForm'
import CardMakerPreview from './CardMakerPreview'
import { card, cardType } from '../../types/card'
import CardManupulator from '../../CardManupulator'
import ObjectID from 'bson-objectid'

interface State {
  card: card
  cardMan: CardManupulator
}

class CardMaker extends React.Component<{}, State> {
  ref: React.RefObject<HTMLDivElement>

  constructor (props: {}) {
    super(props)
    this.ref = React.createRef()
  }

  state: State = {
    card: {
      name: '',
      effect: '',
      quote: '',
      cardType: cardType.wildern,
      author: '',
      artAuthor: '',
      atk: 0,
      def: 0,
      costs: [],
      values: [],
      traits: {
        contpower: false,
        cycle: false,
        handeff: false,
        myth: false,
        mythic: false
      },
      _id: new ObjectID().toHexString()
    },
    cardMan: new CardManupulator(
      () => { return this.state.card },
      (data: card) => { this.setState({ card: data }) }
    )
  }

  render (): React.JSX.Element {
    return (
      <Box w='100%' h='100%' ref={this.ref}>
        <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem'>
          <WrapItem alignContent='center'>
            <CardMakerPreview />
          </WrapItem>
          <WrapItem alignContent='center'>
            <CardMakerForm
              cardMan={this.state.cardMan}
              pageRef={this.ref}
            />
          </WrapItem>
        </Wrap>
      </Box>
    )
  }
}

export default CardMaker
