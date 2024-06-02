import { Input, InputGroup } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
}

class CardNameInput extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <InputGroup>
        <Input
          minW={80}
          w='28vw'
          bg='white'
          placeholder='Dark Destroyer of... Darkness'
          value={this.props.cardMan.getCardData().name}
          onChange={e => this.props.cardMan.updateStringField('name', e.target.value)}
        />
      </InputGroup>
    )
  }
}

export default CardNameInput
