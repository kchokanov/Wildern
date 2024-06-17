import { Box, Divider, Select, Text } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../cardManipulator'
import { cardType } from '../../../types/card'

interface Prop {
  cardMan: CardManupulator
}

class CardTypeSelect extends React.Component<Prop> {
  setType (type: cardType): void {
    this.props.cardMan.updateCardType(type)
  }

  // updates selected value when data is loaded from elsewhere
  updateSelected (): void {
    (document.getElementById('typeSelect') as HTMLInputElement).value = this.props.cardMan.getCardData().cardType
  }

  render (): React.JSX.Element {
    const selectOptions: React.JSX.Element[] = []

    // little bit of JS magic to loop through an enum
    const typeList: Array<keyof typeof cardType> = Object.keys(cardType) as Array<keyof typeof cardType>

    typeList.map((key: keyof typeof cardType) => {
      return selectOptions.push(
        <option
          value={key}
          key={'CTSelectOption_' + key}
          onMouseDown={() => this.setType(cardType[key])}
        >
          {/* capitalise */}
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </option>
      )
    })

    return (
      <Box>
        <Box w='6em'>
          <Text color='#AC6D6A' as='b'>Card Type:</Text>
          <Divider />
        </Box>
        <Select
          w='8em'
          variant='flushed'
          id='typeSelect'
          value={this.props.cardMan.getCardData().cardType}
          onChange={() => this.updateSelected()}
          _hover={{ cursor: 'pointer' }}
        >
          {selectOptions}
        </Select>
      </Box>
    )
  }
}

export default CardTypeSelect
