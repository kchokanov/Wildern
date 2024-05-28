import { Box, Divider, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
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
      <Box p={3}>
        <InputGroup>
          <InputLeftElement w='3.2em' pb='.2em' fontSize='1.2em' textColor='black'>
            Name:
          </InputLeftElement>
          <Input pl='3.8em' placeholder='Dark Destroyer of... Darkness' value={this.props.cardData.name} onChange={e => this.updateName(e.target.value)} />
        </InputGroup>
        <Divider pt={3} />
      </Box>
    )
  }
}

export default CMFormNameSeg
