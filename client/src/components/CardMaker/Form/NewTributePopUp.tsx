import React from 'react'
import { Button, HStack, Input, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react'
import { postTributeType } from '../../../ApiCallWrapper'

interface Prop {
  displayPopUp: boolean
  setDisplay: Function
  updateList: Function
}

interface State {
  newTribute: string
}

class NewTributePopUp extends React.Component<Prop, State> {
  state: State = {
    newTribute: ''
  }

  submitTribute (): void {
    postTributeType(this.state.newTribute).then(res => {
      if (res) {
        // TODO - success toast
        console.log('Uploaded Tribute')
        this.props.updateList()
      } else {
        // TODO - error toast
      }
    }).catch(err => console.error(err))

    this.props.setDisplay(false)
  }

  render (): React.JSX.Element {
    return (
      <Popover isOpen={this.props.displayPopUp} placement='end-end' isLazy>
        <PopoverContent>
          <PopoverCloseButton onClick={() => this.props.setDisplay(false)} />
          <PopoverHeader>Add New Tribute Type:</PopoverHeader>
          <PopoverBody>
            <HStack>
              <Input onChange={(e) => this.setState({ newTribute: e.target.value })} />
              <Button onClick={() => this.submitTribute()}>Submit</Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
}

export default NewTributePopUp
