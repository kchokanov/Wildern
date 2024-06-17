import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { Box, Portal, Select } from '@chakra-ui/react'
import NewTributePopUp from './NewTributePopUp'
import { tribute } from '../../../types/tribute'

interface Prop {
  cardMan: CardManupulator
  pageRef: React.RefObject<HTMLDivElement>
  index: number
  type: 'costs' | 'values'
  tributeTypeList: tribute[]
  updateList: Function
}
interface State {
  displayPopUp: boolean
}

// TODO - need parent component for api requests so we don't have double the amount
class TributeSelect extends React.Component<Prop, State> {
  constructor (props: {
    cardMan: CardManupulator
    pageRef: React.RefObject<HTMLDivElement>
    index: number
    type: 'costs' | 'values'
    tributeTypeList: tribute[]
    updateList: Function
  }) {
    super(props)

    // binding magic so JS doesn't forget the set function exists when it's passed to child component
    this.setPopUp = this.setPopUp.bind(this)
  }

  state: State = {
    displayPopUp: false
  }

  setPopUp (isOn: boolean): void {
    this.setState({ displayPopUp: isOn })
  }

  setTribute (type: string): void {
    this.props.cardMan.updateCostValueField(this.props.type, this.props.index, type, null)
  }

  // updates selected value when data is loaded from elsewhere
  updateSelected (): void {
  }

  render (): React.JSX.Element {
    const selectOption: React.JSX.Element[] = []

    this.props.tributeTypeList.map((item: tribute) => {
      return selectOption.push(
        <option
          key={'select_' + item._id}
          value={item.name}
          onMouseDown={() => this.setTribute(item.name)}
        >{item.name}
        </option>
      )
    })

    return (
      <Box>
        <Select
          variant='flushed'
          placeholder='Select Type'
          id={'tributeSelect_' + this.props.type}
          value={this.props.cardMan.getCardData()[this.props.type][this.props.index].type}
          onChange={() => this.updateSelected()}
          _hover={{ cursor: 'pointer' }}
        >
          {selectOption}
          <option onClick={() => { this.setPopUp(true) }}>Add New</option>
        </Select>
        <Portal containerRef={this.props.pageRef}>
          <NewTributePopUp
            updateList={this.props.updateList}
            displayPopUp={this.state.displayPopUp}
            setDisplay={this.setPopUp}
          />
        </Portal>
      </Box>
    )
  }
}

export default TributeSelect
