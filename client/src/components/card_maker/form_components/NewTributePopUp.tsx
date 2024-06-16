import React from 'react'
import { Box, Button, Card, Center, Divider, HStack, Input, Text } from '@chakra-ui/react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
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
    // TODO - use Modal tag
    return (
      <Box w='100%' h='100%' top={0} left={0} pos='absolute' display={this.props.displayPopUp ? 'block' : 'none'}>
        <Center h='100%'>
          <Card
            bg='#FFFFFF'
            textColor='#14342B'
            boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
          >
            <HStack justify='space-between' align='start'>
              <Box w='12em' p='1em'>
                <Text color='#AC6D6A' as='b'>New Tribute Name:</Text>
                <Divider />
              </Box>
              <Box
                p='.25em'
                as='button'
                onClick={() => this.props.setDisplay(false)}
                color='#14342B'
                _hover={{ color: '#CB807D' }}
              >
                <IoMdCloseCircleOutline size='2em' color='inherit' />
              </Box>
            </HStack>
            <HStack pl='1em' pr='1em' pb='1em'>
              <Input
                w='15em'
                placeholder='Name'
                _placeholder={{ opacity: 0.7, color: '#14342B' }}
                onChange={(e) => this.setState({ newTribute: e.target.value })}
              />
              <Button
                bg='#FFFFFF'
                color='#AC6D6A'
                _hover={{ bg: '#925B59', color: '#EEEBD0' }}
                boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
                onClick={() => this.submitTribute()}
              >
                Submit
              </Button>
            </HStack>
          </Card>
        </Center>
      </Box>
    )
  }
}

export default NewTributePopUp
