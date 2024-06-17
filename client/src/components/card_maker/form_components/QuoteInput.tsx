import { Box, Divider, Input, Text } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../cardManipulator'

interface Prop {
  cardMan: CardManupulator
}

class QuoteInput extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Box w='100%'>
        <Box w='6em'>
          <Text color='#AC6D6A' as='b'>Quote:</Text>
          <Divider />
        </Box>
        <Input
          variant='flushed'
          placeholder='"Another pint for yer lad!"'
          w='100%'
          minW='25em'
          _placeholder={{ opacity: 0.7, color: '#14342B', fontStyle: 'italic' }}
          fontStyle='italic'
          value={this.props.cardMan.getCardData().quote}
          onChange={e => this.props.cardMan.updateStringField('quote', e.target.value)}
        />
      </Box>
    )
  }
}

export default QuoteInput
