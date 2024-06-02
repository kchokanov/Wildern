import { Checkbox, VStack, CheckboxGroup } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { cardTrait, cardType } from '../../../types/card'

interface Prop {
  cardMan: CardManupulator
}
class TraitCheckboxGroup extends React.Component<Prop> {
  // case checks for turning off conflicting options
  checkIsDisabled (trait: cardTrait): boolean {
    switch (trait) {
      case cardTrait.ContinuousPower:
        return this.props.cardMan.getCardData().traits[cardTrait.HandEffect]
      case cardTrait.HandEffect:
        return this.props.cardMan.getCardData().traits[cardTrait.ContinuousPower] ||
                this.props.cardMan.getCardData().traits[cardTrait.Mythic]
      case cardTrait.Myth:
        return this.props.cardMan.getCardData().traits[cardTrait.HandEffect]
      case cardTrait.Mythic:
        return this.props.cardMan.getCardData().traits[cardTrait.Myth] ||
        this.props.cardMan.getCardData().traits[cardTrait.HandEffect]
    }
    return false
  }

  // case checks for not displaying options to available to the card type selected
  checkIsVisible (trait: cardTrait): boolean {
    switch (trait) {
      case cardTrait.ContinuousPower:
        return this.props.cardMan.getCardData().cardType !== cardType.wildern
      case cardTrait.Mythic:
        return this.props.cardMan.getCardData().cardType !== cardType.power
    }
    return true
  }

  checkIsChecked (trait: cardTrait): boolean {
    return this.props.cardMan.getCardData().traits[trait]
  }

  render (): React.JSX.Element {
    const checkboxes: React.JSX.Element[] = []

    // JS magic to loop through an enum
    { (Object.keys(cardTrait) as Array<keyof typeof cardTrait>).map((key: keyof typeof cardTrait) => {
      return checkboxes.push(
        <Checkbox
          display={this.checkIsVisible(cardTrait[key]) ? 'block' : 'none'}
          key={'CTCheckbox_' + key}
          isChecked={this.checkIsChecked(cardTrait[key])}
          disabled={this.checkIsDisabled(cardTrait[key])}
          onChange={e => {
            this.props.cardMan.updateTrait(cardTrait[key], e.target.checked)
          }}
        >
          {/* Capitalise and seperate words */}
          {(key.charAt(0).toUpperCase() + key.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
        </Checkbox>
      )
    }) }

    return (
      <CheckboxGroup>
        <VStack align='left' minW={40}>
          {checkboxes}
        </VStack>
      </CheckboxGroup>
    )
  }
}

export default TraitCheckboxGroup
