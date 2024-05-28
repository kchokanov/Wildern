import React from 'react'
import { Box } from '@chakra-ui/react'
import CMFormCardLoadSeg from './CMFormCardLoadSeg'
import CMFormCardTypeSeg from './CMFormCardTypeSeg'

class CardMakerForm extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Box bg='#C99DA3' textColor='#EEEBD0' minW='30rem'>
        <CMFormCardLoadSeg />
        <CMFormCardTypeSeg />
      </Box>
    )
  }
}

export default CardMakerForm
