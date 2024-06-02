import { Input, InputGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
  isDisplayed: boolean
}

class StatsInput extends React.Component<Prop> {

    // TODO - change UI element to something more suited
    updateStat (fieldName: 'atk' | 'hp', newStat: string ): void {
    if (!Number.isNaN(parseInt(newStat))) {
      this.props.cardMan.updateStat(fieldName, Number(newStat))
    } else {
      console.error('Attempted to set stat to NaN')
      // TODO - error toast
    }
  }
    
    render (): React.JSX.Element {
        return (
            <VStack display={this.props.isDisplayed ? 'block' : 'none'}>
              <Input
              w={40}
              bg='white'
              placeholder='ATK'
              value={this.props.cardMan.getCardData().atk}
              onChange={e => this.updateStat('atk', e.target.value)}
                    />
              <Input
              w={40}
              bg='white'
              placeholder='HP'
              value={this.props.cardMan.getCardData().hp}
              onChange={e => this.updateStat('hp', e.target.value)}
              />
            </VStack>
        )
    }
}

export default StatsInput
