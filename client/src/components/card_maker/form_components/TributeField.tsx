import React from 'react'
import CardManupulator from '../../../cardManipulator'
import { HStack, Input, Text, Box, Divider, Card } from '@chakra-ui/react'
import TributeSelect from './TributeSelect'
import { tribute } from '../../../types/tribute'
import { getAllTributes } from '../../../apiWrapper'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface Prop {
  cardMan: CardManupulator
  type: 'costs' | 'values'
  pageRef: React.RefObject<HTMLDivElement>
  maxFields: number
  fieldCount: number
}

interface State {
  tributesTypeList: tribute[]
}

class TributeField extends React.Component<Prop> {
  state: State = {
    tributesTypeList: new Array<tribute>()
  }

  constructor (props: {
    cardMan: CardManupulator
    type: 'costs' | 'values'
    pageRef: React.RefObject<HTMLDivElement>
    maxFields: number
    fieldCount: number
  }) {
    super(props)

    // binding magic so JS doesn't forget the set function exists when it's passed to child component
    this.updateList = this.updateList.bind(this)
  }

  componentDidMount(): void {
    this.updateList()
  }

  async getTributeList (): Promise<tribute[]> {
    let list: tribute[] = new Array<tribute>()
    await getAllTributes().then(fetchedList => {
      if (fetchedList != null) {
        list = fetchedList
      } else {
        // TODO - error toast
      }
    }).catch(err => console.error(err))
    return list
  }

  updateList (): void {
    this.getTributeList().then(list => {
      this.setState({ tributesTypeList: list })
    }).catch(err => console.error(err))
  }

  // increases fieldcount up to the maxfields value provided or decresses to 1
  updateFieldCount (add: boolean): void {
    if (add && this.props.fieldCount < this.props.maxFields) {
      this.props.cardMan.addCostValue(this.props.type, { type: '', amount: 0 })
    } else if (!add && this.props.fieldCount > 1) {
      this.props.cardMan.removeCostValue(this.props.type, this.props.cardMan.getCardData()[this.props.type].length)
    }
  }

  // TODO - change UI element to something more suited
  setAmount (newAmout: string, index: number): void {
    if (!Number.isNaN(parseInt(newAmout))) {
      this.props.cardMan.updateCostValueField(this.props.type, index, null, Number(newAmout))
    } else {
      this.props.cardMan.updateCostValueField(this.props.type, index, null, Number(0))
    }
  }

  render (): React.JSX.Element {
    const fields: React.JSX.Element[] = []

    for (let i = 0; i < this.props.fieldCount; i++) {
      fields.push(
        <HStack display='flex' justifyContent='flex-end' key={this.props.type + String(i)} pt='.25em'>
          <Box
            as='button'
            display={i === this.props.maxFields - 1 ? 'none' : 'block'}
            onClick={() => this.updateFieldCount(true)}
            color='#14342B'
            _hover={{ color: '#CB807D' }}
          >
            <FaPlus size={20} color='inherit' />
          </Box>
          <Box
            as='button'
            display={i === 0 ? 'none' : 'block'}
            onClick={() => this.updateFieldCount(false)}
            color='#14342B'
            _hover={{ color: '#CB807D' }}
          >
            <FaMinus size={20} color='inherit' />
          </Box>
          <TributeSelect updateList={this.updateList} tributeTypeList={this.state.tributesTypeList} index={i} {...this.props} />
          <Input
            type='number'
            pattern='[0-9]'
            textAlign='center'
            variant='flushed'
            w='2.5em'
            defaultValue={this.props.cardMan.getCardData()[this.props.type][i].amount}
            onChange={(e) => this.setAmount(e.target.value, i)}
          />

        </HStack>
      )
    }

    return (
      <Card w='16.5em' p='1em'>
        <HStack>
          <Box pl='3.9em' w='8em'>
            <Text color='#AC6D6A' as='b'>{this.props.type === 'costs' ? 'Cost:' : 'Value:'}</Text>
            <Divider />
          </Box>
          <Box pl='3.7em'>
            <Text color='#AC6D6A'>0 - 9</Text>
            <Divider />
          </Box>
        </HStack>
        {fields}
      </Card>
    )
  }
}

export default TributeField
