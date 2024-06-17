import { Box, Divider, Input, Text } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../cardManipulator'

interface Prop {
  cardMan: CardManupulator
}

class CardNameInput extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Box w='100%'>
        <Box w='5em'>
          <Text color='#AC6D6A' as='b'>Name:</Text>
          <Divider />
        </Box>
        <Input
          w='100%'
          minW='25em'
          variant='flushed'
          placeholder='Big Barry'
          _placeholder={{ opacity: 0.7, color: '#14342B' }}
          value={this.props.cardMan.getCardData().name}
          onChange={e => this.props.cardMan.updateStringField('name', e.target.value)}
        />
      </Box>
    )
  }
}

export default CardNameInput
