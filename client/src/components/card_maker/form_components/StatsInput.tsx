import { Text, Input, VStack, Box, Divider, Card, HStack } from '@chakra-ui/react'
import React from 'react'
import { GiBorderedShield, GiBroadsword } from 'react-icons/gi'
import CardManupulator from '../../../cardManipulator'

interface Prop {
  cardMan: CardManupulator
  isDisplayed: boolean
}

class StatsInput extends React.Component<Prop> {
  // TODO - change UI element to something more suited
  updateStat (fieldName: 'atk' | 'hp', newStat: string): void {
    if (!Number.isNaN(parseInt(newStat))) {
      this.props.cardMan.updateStat(fieldName, Number(newStat))
    } else {
      console.error('Attempted to set stat to NaN')
      // TODO - error toast
    }
  }

  render (): React.JSX.Element {
    return (
      <Card p='1em' display={this.props.isDisplayed ? 'block' : 'none'}>
        <Box w='8em' pb='.5em'>
          <Text color='#AC6D6A' as='b'>Wildern Stats:</Text>
          <Divider />
        </Box>
        <VStack align='start'>
          <HStack w='11em'>
            <Box w='1em'>
              <GiBroadsword size='1.5em' />
            </Box>
            <Input
              pl='.5em'
              type='number'
              variant='flushed'
              w='4em'
              defaultValue={this.props.cardMan.getCardData().atk}
              onChange={e => this.updateStat('atk', e.target.value)}
            />
            <Text color='#AC6D6A'>(0 - 9999)</Text>
          </HStack>
          <HStack w='11em'>
            <Box w='1em'>
              <GiBorderedShield size='1.5em' />
            </Box>
            <Input
              pl='.5em'
              type='number'
              variant='flushed'
              w='4em'
              defaultValue={this.props.cardMan.getCardData().hp}
              onChange={e => this.updateStat('hp', e.target.value)}
            />
            <Text color='#AC6D6A'>(1 - 9999)</Text>
          </HStack>
        </VStack>
      </Card>
    )
  }
}

export default StatsInput
