import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { Button, ButtonGroup, HStack, Input, VStack } from '@chakra-ui/react'
import TributeSelect from './TributeSelect'
import { tribute } from '../../../types/tribute'
import { fetchTributeTypes } from '../../../ApiCallWrapper'

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
    tributesTypeList: []
  }

  constructor (props: {
    cardMan: CardManupulator
    type: 'costs' | 'values'
    pageRef: React.RefObject<HTMLDivElement>
    maxFields: number
    fieldCount: number
  }) {
    super(props)
    // TODO - find cleaner way to populate list on start
    this.updateList()
    // binding magic so JS doesn't forget the set function exists when it's passed to child component
    this.updateList = this.updateList.bind(this)
  }

  async getTributeList (): Promise<tribute[]> {
    let list: tribute[] = []
    await fetchTributeTypes().then(fetchedList => {
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
      console.error('Attempted to set type amount to NaN')
      // TODO - error toast
    }
  }

  render (): React.JSX.Element {
    const fields: React.JSX.Element[] = []

    for (let i = 0; i < this.props.fieldCount; i++) {
      fields.push(
        <HStack w={300} key={this.props.type + String(i)}>
          <ButtonGroup>
            <Button
              display={i === this.props.maxFields - 1 ? 'none' : 'block'}
              onClick={() => this.updateFieldCount(true)}
            > +
            </Button>
            <Button
              display={i === 0 ? 'none' : 'block'}
              onClick={() => this.updateFieldCount(false)}
            > -
            </Button>
          </ButtonGroup>
          <TributeSelect updateList={this.updateList} tributeTypeList={this.state.tributesTypeList} index={i} {...this.props} />
          <Input
            w={55}
            value={this.props.cardMan.getCardData()[this.props.type][i].amount}
            onChange={(e) => this.setAmount(e.target.value, i)}
          />
        </HStack>
      )
    }

    return (
      <VStack>
        {fields}
      </VStack>
    )
  }
}

export default TributeField
