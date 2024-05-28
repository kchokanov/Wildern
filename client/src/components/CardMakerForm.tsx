import React from 'react'
import { Box } from '@chakra-ui/react'
import CMFormCardLoadSeg from './CMFormCardLoadSeg'
import CMFormCardTypeSeg from './CMFormCardTypeSeg'
import CMFormCardSaveSeg from './CMFormSaveSeg'
import CMFormNameSeg from './CMFormNameSeg'

// TODO handler passed as prop to update parent state

interface Prop {
  cardData: card
  setCardData: Function
}

class CardMakerForm extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Box bg='#C99DA3' textColor='#EEEBD0' minW='30rem'>
        <CMFormCardLoadSeg {...this.props} />
        <CMFormCardTypeSeg />
        <CMFormNameSeg {...this.props} />
        <CMFormCardSaveSeg {...this.props} />
      </Box>
    )
  }
}

export default CardMakerForm
