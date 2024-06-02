import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { Box, Portal, Select } from '@chakra-ui/react'
import NewTributePopUp from './NewTributePopUp'
import { tribute } from '../../../types/tribute'
import { fetchTributeTypes } from '../../../ApicallWrapper'

interface Prop {
  cardMan: CardManupulator
  pageRef: React.RefObject<HTMLDivElement>
}
interface State {
  displayPopUp: boolean
  tributeTypeList: tribute[]
}

class TributeSelect extends React.Component<Prop, State> {
  constructor (props: { cardMan: CardManupulator, pageRef: React.RefObject<HTMLDivElement> }) {
    super(props)

    // binding magic so JS doesn't forget the set function exists when it's passed to child component
    this.setPopUp = this.setPopUp.bind(this)
  }

  state: State = {
    displayPopUp: false,
    tributeTypeList: []
  }

  setPopUp (isOn: boolean): void {
    this.setState({ displayPopUp: isOn })
  }

  updateTributeList (): void {
    fetchTributeTypes().then(list => {
      if (list != null) {
        this.setState({ tributeTypeList: list })
      } else {
        // TODO - error toast
      }
    }).catch(err => console.error(err))
  }

  render (): React.JSX.Element {
    const selectOption: React.JSX.Element[] = []

    this.state.tributeTypeList.map((item: { name: string, _id: string }) => {
      return selectOption.push(
        <option key={'select_' + item._id}>{item.name}</option>
      )
    })

    return (
      <Box>
        <Select onClick={() => { this.updateTributeList() }}>
          {selectOption}
          <option onClick={() => { this.setPopUp(true) }}>Add New</option>
        </Select>
        <Portal containerRef={this.props.pageRef}>
          <NewTributePopUp displayPopUp={this.state.displayPopUp} setDisplay={this.setPopUp} />
        </Portal>
      </Box>
    )
  }
}

export default TributeSelect
