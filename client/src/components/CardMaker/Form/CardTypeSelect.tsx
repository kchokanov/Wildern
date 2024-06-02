import { Select } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'
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
    { (Object.keys(cardType) as Array<keyof typeof cardType>).map((key: keyof typeof cardType) => {
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
    }) }

    return (
      <Select
        placeholder='Select card type'
        id='typeSelect'
        value={this.props.cardMan.getCardData().cardType}
        onChange={() => this.updateSelected()}
      >
        {selectOptions}
      </Select>
    )
  }
}

export default CardTypeSelect
