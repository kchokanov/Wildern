import { Input, InputGroup } from '@chakra-ui/react'
import ObjectID from 'bson-objectid'
import React from 'react'

interface Prop {
  cardData: card
  setCardData: Function
}

class CMFormNameSeg extends React.Component<Prop> {
  updateName (name: string): void {
    this.props.cardData.name = name
    this.props.cardData._id = ObjectID().toHexString()
    this.props.setCardData(this.props.cardData)
  }

  render (): React.JSX.Element {
    return (
      <InputGroup>
        <Input
          minW={80}
          w='28vw'
          bg='white'
          placeholder='Dark Destroyer of... Darkness'
          value={this.props.cardData.name}
          onChange={e => this.updateName(e.target.value)}
        />
      </InputGroup>
    )
  }
}

export default CMFormNameSeg
