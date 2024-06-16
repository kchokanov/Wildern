import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { Box, Divider, Text, Textarea } from '@chakra-ui/react'

interface Prop {
  cardMan: CardManupulator
}

class EffectInput extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Box>
        <Box w='5em' pb='.5em' pl='.5em'>
          <Text color='#AC6D6A' as='b'>Effect:</Text>
          <Divider />
        </Box>
        <Textarea
          h='8em'
          placeholder='[1](cost) condition: effect&#13;&#13;[2](cost) condition: effect'
          _placeholder={{ opacity: 0.7, color: '#14342B' }}
          value={this.props.cardMan.getCardData().effect}
          onChange={e => this.props.cardMan.updateStringField('effect', e.target.value)}
        />
      </Box>
    )
  }
}

export default EffectInput
