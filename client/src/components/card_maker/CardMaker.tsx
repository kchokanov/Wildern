import React from 'react'
import { Box, Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './CardMakerForm'
import CardMakerPreview from './CardMakerPreview'
import { card } from '../../types/card'
import CardManupulator, { newCard } from '../../CardManupulator'

interface State {
  card: card
  cardMan: CardManupulator
  cardArt: Blob | null
}

class CardMaker extends React.Component<{}, State> {
  ref: React.RefObject<HTMLDivElement>

  constructor (props: {}) {
    super(props)
    this.ref = React.createRef()
  }

  state: State = {
    card: newCard(),
    cardMan: new CardManupulator(
      () => { return this.state },
      (data: any) => { this.setState(data) }
    ),
    cardArt: null
  }

  render (): React.JSX.Element {
    return (
      <Box w='100%' h='100%' ref={this.ref}>
        <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem'>
          <WrapItem alignContent='center'>
            <Box minW='30rem'>
              <CardMakerPreview cardMan={this.state.cardMan} />
            </Box>
          </WrapItem>
          <WrapItem alignContent='center'>
            <Box minW='30rem' w='60vw'>
              <CardMakerForm
                cardMan={this.state.cardMan}
                pageRef={this.ref}
              />
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
    )
  }
}

export default CardMaker
